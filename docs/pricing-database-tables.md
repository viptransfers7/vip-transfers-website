# VIP Transfers Korea Pricing Rules And Database Tables

Last updated: 2026-07-14

이 문서는 현재 운영 중인 Google Sheet pricing rules와, 나중에 Dashboard / Supabase로 옮길 때 필요한 테이블 초안을 함께 정리합니다.

현재 운영 기준:

- `Pricing_rules` 시트 수정은 웹사이트 quote/booking 위젯에 바로 반영됩니다.
- `Region_Rules` 시트는 서울/base area 이외 지역의 추가 charge unit을 `Extra_Hours`로 관리하고, 선택 차량의 hourly rate와 함께 계산됩니다.
- 2026-07-14 제공된 기존 위젯 스크린샷의 ICN to Busan 가격은 `ICN_Flat + Extra_Hours * 0.5 * Hourly Rate ($)`와 정확히 일치합니다. 따라서 현재 운영 위젯의 `Extra_Hours`는 이름과 달리 half-hour unit처럼 적용된 것으로 봅니다.
- DB 전환 전까지는 Google Sheet가 live pricing source of truth입니다.

핵심 원칙:

- 고객에게 보여주는 가격 계산 단위는 `vehicle_option`입니다.
- Dashboard 배차 분류 단위는 `vehicle_type`입니다.
- 예: `Cadillac Escalade`와 `Chevrolet Suburban`은 둘 다 `SUV` 타입이지만 가격은 각각 다르게 가질 수 있습니다.
- Dashboard `vehicle` 필드에는 `vehicle_type.name`을 보내고, 실제 가격/이미지/고객 선택은 `vehicle_option`으로 보존합니다.
- Google Maps distance 기반 가격은 사용하지 않습니다.
- 공항 flat price, 서울 PTP base hours, 지역별 `Extra_Hours * 0.5`, charter package price, quote snapshot을 기준으로 계산합니다.

## 0. Live Sheet Contract

### Pricing_rules

현재 운영 CSV: `/Users/alexchoi/Downloads/2026_2분기/Pricing rules - Pricing_rules.csv`

| Sheet column | Meaning | DB mapping |
|---|---|---|
| `Code` | Website vehicle option code | `vehicle_options.code`, `vehicle_option_pricing.vehicle_code` |
| `Vehicle Name` | Customer-facing vehicle option name | `vehicle_options.name` |
| `Hourly Rate ($)` | Vehicle hourly rate in USD | `vehicle_option_pricing.hourly_rate_usd` |
| `Seoul_PTP_h` | Seoul point-to-point base hours | `vehicle_option_pricing.seoul_ptp_hours` |
| `ICN_Flat` | Incheon Airport flat price | `vehicle_option_pricing.icn_flat_usd` |
| `GMP_Flat` | Gimpo Airport flat price | `vehicle_option_pricing.gmp_flat_usd` |
| `Charter_5h` | Fixed 5-hour charter package | `vehicle_option_pricing.charter_5h_usd` |
| `Charter_10h` | Fixed 10-hour charter package | `vehicle_option_pricing.charter_10h_usd` |
| `Charter_12h` | Fixed 12-hour charter package | `vehicle_option_pricing.charter_12h_usd` |
| `Max Pax` | Passenger capacity for filtering | `vehicle_options.max_pax` |
| `Max Lug` | Luggage capacity for filtering | `vehicle_options.max_luggage` |

### Region_Rules

현재 운영 CSV: `/Users/alexchoi/Downloads/2026_2분기/Pricing rules - Region_Rules.csv`

| Sheet column | Meaning | DB mapping |
|---|---|---|
| `City_Name` | Searchable city/region display string, usually English/Korean aliases in one cell | `region_rules.region_name`, split aliases if needed |
| `Extra_Hours` | Additional regional charge units outside base area. Current widget evidence shows one unit is charged as 0.5 hour. | `region_rules.extra_units` or `region_rules.extra_hours` with multiplier metadata |
| `Is_Base_Area` | Whether the location is treated as base area with no extra hour charge | `region_rules.is_base_area` |

Implementation note:

- Treat `Extra_Hours` as the live widget's regional charge unit. Current ICN to Busan screenshot matches `Extra_Hours * 0.5 * Hourly Rate ($)`.
- Base areas currently include ICN, GMP, Seoul, and Incheon/Songdo/Yeongjong rows with `Extra_Hours = 0`.
- For point-to-point or regional quotes, use the same unit consistently unless the service type has a deliberate override.
- For hourly/all-day charter, do not add airport flat rates just because ICN/GMP is the start or end point. Treat ICN/GMP as base regions for regional extra, but add one airport touch surcharge equal to `1 * Hourly Rate ($)` when the charter starts or ends at ICN/GMP.
- Keep a quote snapshot at booking time because future sheet edits immediately change live widget prices.

## 1. vehicle_types

Dashboard 배차, 필터, reporting용 차량 타입입니다. 직접 가격을 붙이지 않습니다.

| code | name | description | is_active | sort_order |
|---|---|---|---:|---:|
| EXECUTIVE_SEDAN | Executive Sedan | Executive sedan class for G90 or equivalent | true | 10 |
| LUXURY_SEDAN | Luxury Sedan | Luxury sedan class for S-Class or equivalent | true | 20 |
| SUV | SUV | Full-size luxury SUV class | true | 30 |
| MPV | MPV | Premium MPV or van class | true | 40 |
| SPRINTER | Sprinter | Mercedes-Benz Sprinter class | true | 50 |
| MINIBUS | Minibus | 14 to 18 seat minibus class | false | 60 |
| COACH_28 | Coach 28 | 25 to 28 seat coach class | false | 70 |
| COACH_44 | Coach 44 | 40 to 45 seat coach class | false | 80 |

Suggested columns:

| column | type | note |
|---|---|---|
| code | text primary key | Dashboard contract code |
| name | text | Display name |
| description | text | Optional |
| is_active | boolean | Hide inactive types |
| sort_order | integer | UI order |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

## 2. vehicle_options

고객이 실제로 선택하는 차량 옵션입니다. 가격표는 이 `code` 기준으로 붙습니다.

| code | vehicle_type_code | name | category | max_pax | max_luggage | image_url | is_active | sort_order |
|---|---|---|---|---:|---:|---|---:|---:|
| g90 | EXECUTIVE_SEDAN | Genesis G90 | Executive sedan | 3 | 3 | /Images/g90.webp | true | 10 |
| s_class | LUXURY_SEDAN | Mercedes S-Class | Luxury sedan | 3 | 3 | /Images/sclass.webp | true | 20 |
| escalade | SUV | Cadillac Escalade | Luxury SUV | 5 | 5 | /Images/escalade.webp | true | 30 |
| suburban | SUV | Chevrolet Suburban | Full-size SUV | 5 | 5 | /Images/suburban.webp | true | 35 |
| staria | MPV | Hyundai Staria | Premium van | 5 | 5 | /Images/staria.webp | true | 40 |
| carnival | MPV | Kia Carnival | Premium MPV | 5 | 5 | /Images/carnival.webp | true | 45 |
| sprinter_8 | SPRINTER | Sprinter (8 Pax) | Executive van | 8 | 8 | /Images/sprinter319.webp | true | 50 |
| sprinter_13 | SPRINTER | Sprinter (13 Pax) | Executive van | 13 | 10 | /Images/sprinter519.webp | true | 55 |
| sprinter_lux | SPRINTER | Sprinter Luxury (7 Pax) | Luxury van | 7 | 6 | /Images/sprinter519.webp | true | 60 |

Notes:

- 위 코드는 2026-07-14 운영 `Pricing_rules` 시트 기준입니다.
- 기존 코드/문서의 `sclass`, `sprinter`, `sprinter_9_short`, `sprinter_14`는 live sheet 코드와 다릅니다. 웹사이트 구현은 live sheet 코드로 동기화해야 합니다.
- `Vehicle Name` 셀의 trailing space 등은 import 단계에서 trim 처리합니다.

Suggested columns:

| column | type | note |
|---|---|---|
| code | text primary key | Booking and pricing code |
| vehicle_type_code | text references vehicle_types(code) | Dashboard vehicle category |
| name | text | Customer-facing vehicle name |
| category | text | UI subtitle |
| max_pax | integer | Vehicle filtering |
| max_luggage | integer | Vehicle filtering |
| image_url | text | Public image URL |
| is_active | boolean | Booking visibility |
| sort_order | integer | UI order |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

## 2.1. vehicle_option_media

차량 이미지 수정/업로드를 위한 미디어 테이블입니다. 처음에는 `vehicle_options.image_url`만 사용해도 되지만, 관리자에서 대표 이미지 교체와 갤러리 관리를 하려면 별도 테이블이 더 좋습니다.

| id | vehicle_code | media_type | url | alt_text | is_primary | is_active | sort_order |
|---|---|---|---|---|---:|---:|---:|
| img_g90_main | g90 | image | /Images/g90.webp | Genesis G90 exterior | true | true | 10 |
| img_sclass_main | s_class | image | /Images/sclass.webp | Mercedes S-Class exterior | true | true | 10 |
| img_escalade_main | escalade | image | /Images/escalade.webp | Cadillac Escalade exterior | true | true | 10 |
| img_staria_main | staria | image | /Images/staria.webp | Hyundai Staria exterior | true | true | 10 |
| img_sprinter_13_main | sprinter_13 | image | /Images/sprinter519.webp | Sprinter 13 Pax exterior | true | true | 10 |

Suggested columns:

| column | type | note |
|---|---|---|
| id | text primary key | Stable media id |
| vehicle_code | text references vehicle_options(code) | Vehicle option |
| media_type | text | image, video |
| url | text | Public or Supabase Storage URL |
| alt_text | text | Accessibility / SEO |
| is_primary | boolean | Main card image |
| is_active | boolean | Hide old media without deletion |
| sort_order | integer | Gallery order |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

## 3. pricing_versions

가격 변경 이력 보존용입니다. Website는 `published`만 읽어야 합니다.

| id | version_name | status | currency | effective_from | effective_to | notes |
|---|---|---|---|---|---|---|
| pv_2026_live_sheet | 2026 Live Google Sheet Pricing | published | USD | 2026-07-14 | null | Current Google Sheet pricing reflected by website widget |

Suggested columns:

| column | type | note |
|---|---|---|
| id | text primary key | Stable pricing version id |
| version_name | text | Admin display name |
| status | text | draft, published, archived |
| currency | text | USD for website pricing |
| effective_from | date | Optional |
| effective_to | date | Optional |
| notes | text | Optional |
| published_at | timestamptz | Required when published |
| published_by | text | Admin identifier |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

## 4. vehicle_option_pricing

Google Sheet `Pricing_rules`에 해당하는 핵심 가격표입니다.

| pricing_version_id | vehicle_code | hourly_rate_usd | seoul_ptp_hours | icn_flat_usd | gmp_flat_usd | charter_5h_usd | charter_10h_usd | charter_12h_usd | currency | is_active |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---:|
| pv_2026_live_sheet | staria | 50 | 2 | 150 | 135 | 250 | 400 | 500 | USD | true |
| pv_2026_live_sheet | carnival | 50 | 2 | 150 | 135 | 250 | 400 | 500 | USD | true |
| pv_2026_live_sheet | g90 | 70 | 2 | 200 | 180 | 350 | 560 | 700 | USD | true |
| pv_2026_live_sheet | suburban | 70 | 2 | 200 | 180 | 350 | 560 | 700 | USD | true |
| pv_2026_live_sheet | escalade | 100 | 2 | 300 | 270 | 500 | 800 | 1000 | USD | true |
| pv_2026_live_sheet | s_class | 100 | 2 | 350 | 315 | 550 | 800 | 1000 | USD | true |
| pv_2026_live_sheet | sprinter_8 | 70 | 2 | 250 | 225 | 350 | 560 | 700 | USD | true |
| pv_2026_live_sheet | sprinter_13 | 80 | 2 | 300 | 270 | 500 | 640 | 800 | USD | true |
| pv_2026_live_sheet | sprinter_lux | 100 | 2 | 400 | 360 | 550 | 800 | 1000 | USD | true |

Notes:

- `charter_5h_usd`, `charter_10h_usd`, `charter_12h_usd`는 고정 패키지 가격입니다.
- `hourly_rate_usd * hours`로 charter 가격을 만들지 않습니다.
- `hourly_rate_usd`는 region extra, stopover fee, fallback 계산에 사용합니다.
- 2026-07-14 운영 시트 기준 G90 `gmp_flat_usd = 180`입니다.
- 현재 repository code가 위 live sheet 값과 다르면 `06 Booking / Quote Flow` thread가 동기화해야 합니다.

Suggested columns:

| column | type | note |
|---|---|---|
| pricing_version_id | text references pricing_versions(id) | Versioned pricing |
| vehicle_code | text references vehicle_options(code) | Priceable option |
| hourly_rate_usd | numeric | Region extra base |
| seoul_ptp_hours | numeric | PTP base hours |
| icn_flat_usd | numeric | ICN flat rate |
| gmp_flat_usd | numeric | GMP flat rate |
| charter_5h_usd | numeric | Fixed package |
| charter_10h_usd | numeric | Fixed package |
| charter_12h_usd | numeric | Fixed package |
| currency | text | USD |
| is_active | boolean | Quote availability |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

Recommended primary key:

`(pricing_version_id, vehicle_code)`

## 5. region_rules

지역 판별 및 서비스별 extra rule입니다. 현재 운영 시트는 `Extra_Hours` 컬럼으로 관리하지만, 기존 위젯 가격은 half-hour unit 계산과 일치합니다.

| code | city_name | extra_units | is_base_area | note |
|---|---|---:|---:|---|
| ICN_AIRPORT | Incheon International Airport / ICN / 인천공항 | 0 | true | Base area in live sheet |
| GMP_AIRPORT | Gimpo International Airport / GMP / 김포공항 | 0 | true | Base area in live sheet |
| SEOUL | Seoul / 서울 | 0 | true | Base area |
| INCHEON_SONGDO_YEONGJONG | Incheon / Songdo / Yeongjong / 인천 / 송도 / 영종 | 0 | true | Current CSV has a typo: `ncheon`; normalize on import |
| ANYANG | Anyang / 안양 | 1 | false | Nearby Gyeonggi example |
| GIMPO_CITY | Gimpo / 김포 | 1 | false | City, not GMP airport |
| UIJEONGBU | Uijeongbu / 의정부 | 1.5 | false | Decimal hours are allowed |
| YONGIN | Yongin / 용인 | 2 | false | Regional extra hour example |
| GAPYEONG | Gapyeong / 가평 | 3 | false | Private tour route can still use extra-hour rule if widget allows |
| CHUNCHEON | Chuncheon / 춘천 | 4 | false | Regional extra hour example |
| BUSAN | Busan / 부산 | 18 | false | Long-distance example |
| JEJU | Jeju / 제주 | TBD | false | Not present in the inspected CSV; custom quote if unsupported |

Notes:

- 운영 CSV는 159줄이며, header를 제외하면 158개 region rows입니다.
- `Extra_Hours`는 현재 위젯 기준 half-hour unit처럼 적용됩니다. 예: Busan `18` means `18 * 0.5 = 9` surcharge hours.
- `City_Name`은 alias가 `/`로 합쳐져 있으므로 DB 이관 시 `aliases text[]`로 split/trim하는 것을 권장합니다.
- `Is_Base_Area = TRUE`인 row는 regional extra를 부과하지 않습니다.

Suggested columns:

| column | type | note |
|---|---|---|
| code | text primary key | Region code |
| city_name | text | Original sheet display string |
| region_name | text | Normalized display name |
| aliases | text[] | Split aliases from `City_Name` |
| extra_units | numeric | Raw `Extra_Hours` value from live sheet |
| extra_unit_hours | numeric | Usually `0.5` based on current widget evidence |
| is_base_area | boolean | Seoul base or equivalent |
| is_service_area | boolean | Auto-quote possible area |
| requires_custom_quote | boolean | Force quote request |
| quote_message | text | Customer/admin reason |
| sort_order | integer | Matching priority |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

## 6. service_rules

서비스별 정책입니다.

| service_type | label | allow_round_trip | round_trip_discount_percent | min_advance_hours | allow_stopovers | requires_flight_for_airport | is_active |
|---|---|---:|---:|---:|---:|---:|---:|
| airport_transfer | Airport Transfer | true | 10 | 3 | false | true | true |
| point_to_point | Point to Point | false | 0 | 3 | true | false | true |
| hourly_charter | Hourly Charter | false | 0 | 3 | true | false | true |
| private_tour | Private Tour | false | 0 | 3 | true | false | true |
| custom_quote | Custom Quote | false | 0 | 3 | true | false | true |

Suggested columns:

| column | type | note |
|---|---|---|
| service_type | text primary key | Website service code |
| label | text | UI label |
| allow_round_trip | boolean | Airport only for now |
| round_trip_discount_percent | numeric | Airport round trip discount |
| min_advance_hours | integer | Booking cutoff |
| allow_stopovers | boolean | Service policy |
| requires_flight_for_airport | boolean | Airport transfer validation |
| is_active | boolean | UI visibility |

## 7. pricing_addons

경유지, 대기, 야간 할증 등 서비스별 add-on입니다. 현재 추천은 PTP extra stop만 자동 계산합니다.

| pricing_version_id | addon_code | addon_name | applies_to | calculation_type | value | currency | is_active |
|---|---|---|---|---|---:|---|---:|
| pv_2026_live_sheet | EXTRA_STOP_HALF_HOUR | Extra stop | point_to_point | hourly_rate_multiplier | 0.5 | USD | true |
| pv_2026_live_sheet | AIRPORT_STOPOVER_CUSTOM | Airport stopover | airport_transfer | custom_quote | null | USD | true |
| pv_2026_live_sheet | COMPLEX_ROUTE_CUSTOM | Complex route | point_to_point,hourly_charter | custom_quote | null | USD | true |

Notes:

- `EXTRA_STOP_HALF_HOUR` means `vehicle hourly_rate_usd * 0.5`.
- Airport transfer stopovers should initially go to custom quote.
- Hourly charter stopovers are included within booked hours unless the route is outside service areas.

## 8. tour_products

투어 상품 카탈로그입니다.

| slug | name | duration_hours | pickup_area | description | requires_custom_quote | is_active |
|---|---|---:|---|---|---:|---:|
| seoul-city-tour-5h | Seoul Private City Tour 5h | 5 | Seoul | A private Seoul city tour for palaces, shopping, dining, viewpoints, and flexible hotel-based schedules. | false | true |
| nami-island-10h | Nami Island Private Day Trip 10h | 10 | Seoul | A full-day private day trip from Seoul to Nami Island and nearby destinations. | false | true |
| ski-resort-transfer-12h | Ski Resort Private Transfer 12h | 12 | Seoul | Winter ski resort transfer or day itinerary with a private vehicle and chauffeur. | true | true |
| custom-private-tour | Custom Private Tour | 10 | Korea | A custom chauffeured itinerary reviewed by the VIP Transfers Korea team. | true | true |

Suggested columns:

| column | type | note |
|---|---|---|
| slug | text primary key | Website route/product code |
| name | text | Customer-facing name |
| duration_hours | numeric | Package duration |
| pickup_area | text | Seoul, Korea, etc |
| description | text | UI description |
| included | text[] | Included items |
| excluded | text[] | Excluded items |
| image_url | text | Optional |
| requires_custom_quote | boolean | Force quote request |
| is_active | boolean | UI visibility |
| sort_order | integer | UI order |

## 9. tour_vehicle_prices

투어 상품별 차량 옵션 가격입니다.

| tour_slug | vehicle_code | price_usd | currency | is_active |
|---|---|---:|---|---:|
| seoul-city-tour-5h | staria | 250 | USD | true |
| seoul-city-tour-5h | carnival | 250 | USD | true |
| seoul-city-tour-5h | g90 | 350 | USD | true |
| seoul-city-tour-5h | suburban | 350 | USD | true |
| seoul-city-tour-5h | escalade | 500 | USD | true |
| seoul-city-tour-5h | s_class | 550 | USD | true |
| seoul-city-tour-5h | sprinter_8 | 350 | USD | true |
| seoul-city-tour-5h | sprinter_13 | 500 | USD | true |
| seoul-city-tour-5h | sprinter_lux | 550 | USD | true |
| nami-island-10h | g90 | 560 | USD | true |
| nami-island-10h | staria | 400 | USD | true |
| nami-island-10h | carnival | 400 | USD | true |
| nami-island-10h | suburban | 560 | USD | true |
| nami-island-10h | sprinter_8 | 560 | USD | true |
| nami-island-10h | sprinter_13 | 640 | USD | true |
| nami-island-10h | escalade | 800 | USD | true |
| nami-island-10h | s_class | 800 | USD | true |
| nami-island-10h | sprinter_lux | 800 | USD | true |

Recommended primary key:

`(tour_slug, vehicle_code)`

## 10. quote_snapshots

예약 생성 시점의 quote 결과입니다. 기존 예약 가격이 나중에 가격표 변경으로 바뀌면 안 됩니다.

Option A: `reservations.quote_snapshot jsonb`

Option B: separate `quote_snapshots` table

| column | type | note |
|---|---|---|
| id | uuid primary key | Snapshot id |
| reservation_no | text | Link to reservations |
| pricing_version_id | text | Version used |
| service_type | text | Service |
| vehicle_code | text | Selected priceable vehicle option |
| vehicle_name | text | Customer-facing vehicle name |
| vehicle_type_code | text | Dashboard type |
| vehicle_type_name | text | Dashboard display type |
| input_snapshot | jsonb | Normalized quote input |
| route_snapshot | jsonb | Regions, airports, legs |
| breakdown | jsonb | Quote line items |
| currency | text | USD |
| base_price | numeric | Base price |
| final_price | numeric | Final price |
| requires_custom_quote | boolean | Quote request flag |
| quote_type | text | instant, custom, unavailable |
| created_at | timestamptz | Quote time |

Example snapshot:

```json
{
  "pricing_version_id": "pv_2026_live_sheet",
  "service_type": "airport_transfer",
  "vehicle_code": "g90",
  "vehicle_name": "Genesis G90",
  "vehicle_type_code": "EXECUTIVE_SEDAN",
  "vehicle_type_name": "Executive Sedan",
  "currency": "USD",
  "base_price": 200,
  "final_price": 200,
  "route_snapshot": {
    "legs": [
      {
        "label": "One way",
        "airport_code": "ICN",
        "direction": "arrival",
        "pickup_region": "Incheon Airport",
        "dropoff_region": "Seoul Base Area",
        "price": 200
      }
    ]
  },
  "breakdown": [
    { "label": "ICN flat rate", "amount": 200 }
  ]
}
```

## 11. Example Calculations From Live Sheet

These examples use the 2026-07-14 `Pricing_rules` and `Region_Rules` CSV values. Regional PTP examples assume the widget applies `(Seoul_PTP_h + Extra_Hours) * Hourly Rate ($)`.

| scenario | vehicle | formula | result |
|---|---|---|---:|
| ICN to Seoul hotel | Genesis G90 | `ICN_Flat` | 200 |
| GMP to Seoul hotel | Genesis G90 | `GMP_Flat` | 180 |
| Seoul PTP within base area | Hyundai Staria | `(2 + 0) * 50` | 100 |
| Seoul to Uijeongbu PTP | Genesis G90 | `(2 + 1.5) * 70` | 245 |
| Seoul to Yongin PTP | Genesis G90 | `(2 + 2) * 70` | 280 |
| Seoul 5h charter | Hyundai Staria | `Charter_5h` | 250 |
| Seoul 10h charter | Sprinter (13 Pax) | `Charter_10h` | 640 |
| Airport transfer with stopover | Genesis G90 | Operational review | Custom Quote |
| Airport to airport transfer | Genesis G90 | Operational review | Custom Quote |

## 12. Minimum Tables To Build First

Phase 1 minimum:

1. `vehicle_types`
2. `vehicle_options`
3. `vehicle_option_media`
4. `pricing_versions`
5. `vehicle_option_pricing`
6. `region_rules`
7. `service_rules`
8. `pricing_addons`
9. `quote_snapshot` field on reservation payload

Phase 2:

1. `tour_products`
2. `tour_vehicle_prices`
3. `catalog_audit_logs`

Important implementation notes:

- Current website widget reads the live Google Sheet pricing source. If/when DB-backed pricing replaces the sheet, website quote API should read only published pricing versions.
- Dashboard can edit draft pricing versions.
- Publish action creates or activates one published pricing version.
- Booking creation stores a quote snapshot.
- PayPal order amount must be based on server-side quote recalculation, not client payload.
