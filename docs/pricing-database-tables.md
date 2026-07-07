# VIP Transfers Korea Pricing Database Tables Draft

이 문서는 Dashboard / Supabase에 넣기 전 검토용 가격 테이블 초안입니다.

핵심 원칙:

- 고객에게 보여주는 가격 계산 단위는 `vehicle_option`입니다.
- Dashboard 배차 분류 단위는 `vehicle_type`입니다.
- 예: `Cadillac Escalade`와 `Chevrolet Suburban`은 둘 다 `SUV` 타입이지만 가격은 각각 다르게 가질 수 있습니다.
- Dashboard `vehicle` 필드에는 `vehicle_type.name`을 보내고, 실제 가격/이미지/고객 선택은 `vehicle_option`으로 보존합니다.
- Google Maps distance 기반 가격은 사용하지 않습니다.
- 공항 flat price, 지역 rule, 서비스별 extra rule, quote snapshot을 기준으로 계산합니다.

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
| sclass | LUXURY_SEDAN | Mercedes-Benz S-Class | Luxury sedan | 3 | 3 | /Images/sclass.webp | true | 20 |
| escalade | SUV | Cadillac Escalade | Luxury SUV | 5 | 5 | /Images/escalade.webp | true | 30 |
| suburban | SUV | Chevrolet Suburban | Full-size SUV | 5 | 6 | /Images/suburban.webp | false | 35 |
| staria | MPV | Hyundai Staria | Premium van | 6 | 7 | /Images/staria.webp | true | 40 |
| carnival | MPV | Kia Carnival Hi Limousine | Premium MPV | 6 | 6 | /Images/carnival.webp | false | 45 |
| sprinter_9_short | SPRINTER | Mercedes-Benz Sprinter 9-seat Short Body | Executive van | 9 | 8 | /Images/sprinter319.webp | false | 50 |
| sprinter_14 | SPRINTER | Mercedes-Benz Sprinter 14-seat | Executive van | 14 | 12 | /Images/sprinter519.webp | false | 55 |
| sprinter | SPRINTER | Mercedes-Benz Sprinter | Executive van | 13 | 12 | /Images/sprinter519.webp | true | 59 |

Notes:

- `sprinter`는 현재 코드 호환용 기존 옵션입니다.
- 신규 운영에서는 `sprinter_9_short`, `sprinter_14`처럼 세부 옵션으로 나누는 것을 권장합니다.
- `suburban`, `carnival`, 세부 Sprinter 가격은 확정 후 `is_active = true`로 전환합니다.

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
| img_sclass_main | sclass | image | /Images/sclass.webp | Mercedes-Benz S-Class exterior | true | true | 10 |
| img_escalade_main | escalade | image | /Images/escalade.webp | Cadillac Escalade exterior | true | true | 10 |
| img_staria_main | staria | image | /Images/staria.webp | Hyundai Staria exterior | true | true | 10 |
| img_sprinter_main | sprinter | image | /Images/sprinter519.webp | Mercedes-Benz Sprinter exterior | true | true | 10 |

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
| pv_2026_standard | 2026 Standard Pricing | published | USD | 2026-07-01 | null | Current website seed pricing |

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
| pv_2026_standard | g90 | 65 | 2 | 180 | 120 | 330 | 580 | 680 | USD | true |
| pv_2026_standard | sclass | 85 | 2 | 230 | 160 | 430 | 760 | 880 | USD | true |
| pv_2026_standard | escalade | 90 | 2.2 | 260 | 180 | 470 | 820 | 960 | USD | true |
| pv_2026_standard | staria | 70 | 2 | 210 | 145 | 360 | 630 | 740 | USD | true |
| pv_2026_standard | sprinter | 115 | 2.5 | 360 | 270 | 620 | 1050 | 1220 | USD | true |
| pv_2026_standard | suburban | TBD | TBD | TBD | TBD | TBD | TBD | TBD | USD | false |
| pv_2026_standard | carnival | TBD | TBD | TBD | TBD | TBD | TBD | TBD | USD | false |
| pv_2026_standard | sprinter_9_short | TBD | TBD | TBD | TBD | TBD | TBD | TBD | USD | false |
| pv_2026_standard | sprinter_14 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | USD | false |

Notes:

- `charter_5h_usd`, `charter_10h_usd`, `charter_12h_usd`는 고정 패키지 가격입니다.
- `hourly_rate_usd * hours`로 charter 가격을 만들지 않습니다.
- `hourly_rate_usd`는 region extra, stopover fee, fallback 계산에 사용합니다.
- 현재 웹사이트 코드상 G90 `gmp_flat_usd = 120`입니다. 실제 Sheet에서 G90 GMP가 180이면 이 row를 수정해야 합니다.

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

지역 판별 및 서비스별 extra rule입니다.

| code | region_name | aliases | airport_icn_extra_units | airport_gmp_extra_units | ptp_extra_units | hourly_dispatch_extra_units | is_base_area | is_service_area | requires_custom_quote | quote_message |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| SEOUL_BASE | Seoul Base Area | seoul, gangnam, myeongdong, jongno, gwanghwamun, itaewon, hannam, coex, yeouido, yongsan, jamsil, mapo, hongdae, samseong, four seasons, lotte hotel, lotte world, lotte world tower, signiel, josun palace, 서울, 강남, 명동, 광화문, 코엑스, 여의도, 용산, 잠실, 마포, 홍대, 삼성동, 롯데월드, 롯데월드타워, 시그니엘 | 0 | 0 | 0 | 0 | true | true | false | null |
| ICN_AIRPORT | Incheon Airport | incheon airport, incheon international airport, icn, terminal 1, terminal 2, 인천공항, 인천국제공항 | 0 | 0 | 0 | 0 | false | true | false | null |
| GMP_AIRPORT | Gimpo Airport | gimpo airport, gimpo international airport, gmp, 김포공항, 김포국제공항 | 0 | 0 | 0 | 0 | false | true | false | null |
| SONGDO_INCHEON | Songdo / Incheon City | songdo, songdo convensia, convensia, central park incheon, paradise city, incheon, 송도, 송도컨벤시아, 컨벤시아, 센트럴파크, 파라다이스시티, 인천 | 0 | 0 | 2 | 2 | false | true | false | null |
| PANGYO_BUNDANG | Pangyo / Bundang | pangyo, bundang, seongnam, 판교, 분당, 성남 | 1 | 1 | 1 | 1 | false | true | false | null |
| SUWON_YONGIN | Suwon / Yongin | suwon, yongin, gwanggyo, 수원, 용인, 광교 | 2 | 2 | 2 | 2 | false | true | false | null |
| NAMI_GAPYEONG | Nami Island / Gapyeong | nami, gapyeong, petite france, 남이섬, 가평 | null | null | null | null | false | true | true | This route is usually handled as a private tour or custom day trip. |
| CHUNCHEON_LEGOLAND | Chuncheon / Legoland | chuncheon, legoland, 춘천, 레고랜드 | null | null | null | null | false | true | true | Long-distance dispatch requires concierge review. |
| REGIONAL_KOREA | Regional Korea | busan, daegu, daejeon, jeju, gangneung, 부산, 대구, 대전, 제주, 강릉 | null | null | null | null | false | false | true | Regional or long-distance Korea service requires a custom quote. |

Notes:

- `airport_*_extra_units`는 공항 transfer에서 사용합니다.
- `SONGDO_INCHEON`은 ICN/GMP 공항 transfer에서는 서울과 동일하게 extra 0입니다.
- `SONGDO_INCHEON`은 point-to-point와 hourly charter에서는 서울 dispatch 기준 extra 2입니다.
- `extra_units`는 half-hour unit입니다. `2` means `2 * 0.5 * hourly_rate`.

Suggested columns:

| column | type | note |
|---|---|---|
| code | text primary key | Region code |
| region_name | text | Display name |
| aliases | text[] | Matching aliases |
| airport_extra_units | jsonb | Example: `{"ICN": 0, "GMP": 0}` |
| ptp_extra_units | numeric | PTP region extra unit |
| hourly_dispatch_extra_units | numeric | Hourly dispatch extra unit |
| extra_unit_type | text | `half_hour` |
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
| pv_2026_standard | EXTRA_STOP_HALF_HOUR | Extra stop | point_to_point | hourly_rate_multiplier | 0.5 | USD | true |
| pv_2026_standard | AIRPORT_STOPOVER_CUSTOM | Airport stopover | airport_transfer | custom_quote | null | USD | true |
| pv_2026_standard | COMPLEX_ROUTE_CUSTOM | Complex route | point_to_point,hourly_charter | custom_quote | null | USD | true |

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
| seoul-city-tour-5h | g90 | 330 | USD | true |
| seoul-city-tour-5h | sclass | 430 | USD | true |
| seoul-city-tour-5h | escalade | 470 | USD | true |
| seoul-city-tour-5h | staria | 360 | USD | true |
| seoul-city-tour-5h | sprinter | 620 | USD | true |
| nami-island-10h | g90 | 560 | USD | true |
| nami-island-10h | sclass | 730 | USD | true |
| nami-island-10h | escalade | 790 | USD | true |
| nami-island-10h | staria | 610 | USD | true |
| nami-island-10h | sprinter | 980 | USD | true |

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
  "pricing_version_id": "pv_2026_standard",
  "service_type": "airport_transfer",
  "vehicle_code": "staria",
  "vehicle_name": "Hyundai Staria",
  "vehicle_type_code": "MPV",
  "vehicle_type_name": "MPV",
  "currency": "USD",
  "base_price": 355,
  "final_price": 319,
  "route_snapshot": {
    "legs": [
      {
        "label": "Outbound",
        "airport_code": "ICN",
        "direction": "arrival",
        "pickup_region": "Incheon Airport",
        "dropoff_region": "Seoul Base Area",
        "price": 210
      },
      {
        "label": "Return",
        "airport_code": "GMP",
        "direction": "departure",
        "pickup_region": "Seoul Base Area",
        "dropoff_region": "Gimpo Airport",
        "price": 145
      }
    ]
  },
  "breakdown": [
    { "label": "Outbound ICN flat rate", "amount": 210 },
    { "label": "Return GMP flat rate", "amount": 145 },
    { "label": "Round trip subtotal", "amount": 355 },
    { "label": "Round trip discount 10%", "amount": -36 }
  ]
}
```

## 11. Example Calculations From This Draft

| scenario | vehicle | result |
|---|---|---:|
| ICN to Seoul hotel | Genesis G90 | 180 |
| ICN to Songdo | Genesis G90 | 180 |
| Seoul to Songdo PTP | Hyundai Staria | 210 |
| Songdo 5h hourly charter | Hyundai Staria | 430 |
| Seoul to Pangyo with Suwon stop | Genesis G90 | 228 |
| ICN to unknown resort | Genesis G90 | Custom Quote |
| Airport transfer with stopover | Genesis G90 | Custom Quote |
| Airport to airport transfer | Genesis G90 | Custom Quote |

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

- Website quote API reads only published pricing versions.
- Dashboard can edit draft pricing versions.
- Publish action creates or activates one published pricing version.
- Booking creation stores a quote snapshot.
- PayPal order amount must be based on server-side quote recalculation, not client payload.
