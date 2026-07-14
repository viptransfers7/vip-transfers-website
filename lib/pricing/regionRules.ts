import type { RegionRule } from "./types";

const regionRulesCsv = `City_Name,Extra_Hours,Is_Base_Area
Incheon International Airport / ICN / 인천공항,0,TRUE
Gimpo International Airport / GMP / 김포공항,0,TRUE
Seoul / 서울,0,TRUE
Incheon / Songdo / Yeongjong / 인천 / 송도 / 영종,0,TRUE
Andong / 안동,16,FALSE
Ansan / 안산,1,FALSE
Anseong / 안성,4,FALSE
Anyang / 안양,1,FALSE
Asan / 아산,3,FALSE
Boeun / 보은,11,FALSE
Bonghwa / 봉화,16,FALSE
Boryeong / 보령,12,FALSE
Boseong / 보성,19,FALSE
Buan / 부안,13,FALSE
Bucheon / 부천,1,FALSE
Busan / 부산,18,FALSE
Buyeo / 부여,11,FALSE
Changnyeong / 창녕,17,FALSE
Changwon / 창원,18,FALSE
Cheonan / 천안,3,FALSE
Cheongdo / 청도,18,FALSE
Cheongju / 청주,10,FALSE
Cheongsong / 청송,17,FALSE
Cheongyang / 청양,11,FALSE
Cheorwon / 철원,8,FALSE
Chilgok / 칠곡,16,FALSE
Chuncheon / 춘천,4,FALSE
Chungju / 충주,10,FALSE
Daegu / 대구,14,FALSE
Daejeon / 대전,7,FALSE
Damyang / 담양,16,FALSE
Dangjin / 당진,9,FALSE
Danyang / 단양,12,FALSE
Dongducheon / 동두천,2,FALSE
Donghae / 동해,15,FALSE
Eumseong / 음성,9,FALSE
Gangjin / 강진,19,FALSE
Gangneung / 강릉,14,FALSE
Gapyeong / 가평,3,FALSE
Geochang / 거창,16,FALSE
Geoje / 거제,22,FALSE
Geumsan / 금산,11,FALSE
Gimcheon / 김천,14,FALSE
Gimhae / 김해,19,FALSE
Gimje / 김제,12,FALSE
Gimpo / 김포,1,FALSE
Gochang / 고창,14,FALSE
Goesan / 괴산,10,FALSE
Goheung / 고흥,20,FALSE
Gokseong / 곡성,16,FALSE
Gongju / 공주,10,FALSE
Goryeong / 고령,17,FALSE
Goseong / 고성,15,FALSE
Goseong / 고성 (경남),20,FALSE
Goyang / 고양,1,FALSE
Gumi / 구미,14,FALSE
Gunpo / 군포,1,FALSE
Gunsan / 군산,12,FALSE
Guri / 구리,1,FALSE
Gurye / 구례,17,FALSE
Gwacheon / 과천,1,FALSE
Gwangju / 광주,16,FALSE
Gwangju / 광주 (경기),2,FALSE
Gwangmyeong / 광명,1,FALSE
Gwangyang / 광양,19,FALSE
Gyeongju / 경주,18,FALSE
Gyeongsan / 경산,14,FALSE
Hadong / 하동,19,FALSE
Haenam / 해남,20,FALSE
Haman / 함안,18,FALSE
Hampyeong / 함평,18,FALSE
Hamyang / 함양,16,FALSE
Hanam / 하남,1,FALSE
Hapcheon / 합천,17,FALSE
Hoengseong / 횡성,8,FALSE
Hongcheon / 홍천,6,FALSE
Hongseong / 홍성,10,FALSE
Hwacheon / 화천,7,FALSE
Hwaseong / 화성,2,FALSE
Hwasun / 화순,17,FALSE
Icheon / 이천,4,FALSE
Iksan / 익산,12,FALSE
Imsil / 임실,13,FALSE
Inje / 인제,9,FALSE
Jangheung / 장흥,19,FALSE
Jangseong / 장성,16,FALSE
Jangsu / 장수,13,FALSE
Jecheon / 제천,12,FALSE
Jeongeup / 정읍,14,FALSE
Jeongseon / 정선,16,FALSE
Jeonju / 전주,12,FALSE
Jeungpyeong / 증평,10,FALSE
Jinan / 진안,13,FALSE
Jincheon / 진천,9,FALSE
Jindo / 진도,22,FALSE
Jinju / 진주,18,FALSE
Miryang / 밀양,18,FALSE
Mokpo / 목포,20,FALSE
Muan / 무안,19,FALSE
Muju / 무주,13,FALSE
Mungyeong / 문경,13,FALSE
Naju / 나주,17,FALSE
Namhae / 남해,22,FALSE
Namwon / 남원,14,FALSE
Namyangju / 남양주,1,FALSE
Nonsan / 논산,11,FALSE
Okcheon / 옥천,11,FALSE
Osan / 오산,2,FALSE
Paju / 파주,2,FALSE
Pocheon / 포천,3,FALSE
Pohang / 포항,18,FALSE
Pyeongchang / 평창,10,FALSE
Pyeongtaek / 평택,2,FALSE
Sacheon / 사천,19,FALSE
Samcheok / 삼척,15,FALSE
Sancheong / 산청,17,FALSE
Sangju / 상주,14,FALSE
Sejong / 세종,7,FALSE
Seocheon / 서천,12,FALSE
Seongju / 성주,16,FALSE
Seongnam / 성남,1,FALSE
Seosan / 서산,10,FALSE
Siheung / 시흥,1,FALSE
Sinan / 신안,22,FALSE
Sokcho / 속초,16,FALSE
Sunchang / 순창,14,FALSE
Suncheon / 순천,20,FALSE
Suwon / 수원,1.5,FALSE
Taean / 태안,12,FALSE
Taebaek / 태백,16,FALSE
Tongyeong / 통영,20,FALSE
Uijeongbu / 의정부,1.5,FALSE
Uiryeong / 의령,18,FALSE
Uiseong / 의성,16,FALSE
Uiwang / 의왕,1,FALSE
Uljin / 울진,19,FALSE
Ulsan / 울산,18,FALSE
Wando / 완도,22,FALSE
Wanju / 완주,12,FALSE
Wonju / 원주,5,FALSE
Yanggu / 양구,7,FALSE
Yangju / 양주,2,FALSE
Yangpyeong / 양평,3,FALSE
Yangsan / 양산,19,FALSE
Yangyang / 양양,12,FALSE
Yecheon / 예천,15,FALSE
Yeoju / 여주,4,FALSE
Yeoncheon / 연천,3,FALSE
Yeongam / 영암,19,FALSE
Yeongcheon / 영천,17,FALSE
Yeongdeok / 영덕,18,FALSE
Yeongdong / 영동,12,FALSE
Yeonggwang / 영광,17,FALSE
Yeongju / 영주,15,FALSE
Yeongwol / 영월,8,FALSE
Yeongyang / 영양,18,FALSE
Yeosu / 여수,20,FALSE
Yesan / 예산,10,FALSE
Yongin / 용인,2,FALSE`;

const baseAreaAliases = [
  "gangnam",
  "myeongdong",
  "jongno",
  "gwanghwamun",
  "itaewon",
  "hannam",
  "coex",
  "yeouido",
  "yongsan",
  "jamsil",
  "mapo",
  "hongdae",
  "samseong",
  "four seasons",
  "lotte hotel",
  "lotte world",
  "lotte world tower",
  "signiel",
  "lotte hotel world",
  "josun palace",
  "신라",
  "강남",
  "명동",
  "광화문",
  "코엑스",
  "여의도",
  "용산",
  "잠실",
  "마포",
  "홍대",
  "삼성동",
  "롯데월드",
  "롯데월드타워",
  "시그니엘"
];

export const regionRules: RegionRule[] = parseRegionRules(regionRulesCsv);

export function findRegion(input = "") {
  const normalized = normalize(input);
  return regionRules.find((region) => region.aliases.some((alias) => normalized.includes(normalize(alias))));
}

export function detectAirport(input = "") {
  const normalized = normalize(input);
  if (/\bicn\b|incheon intl|incheon airport|incheon international airport|terminal 1|terminal 2|t1|t2|인천공항|인천 국제공항|인천국제공항/.test(normalized)) return "ICN";
  if (/\bgmp\b|gimpo airport|gimpo international airport|김포공항|김포 국제공항|김포국제공항/.test(normalized)) return "GMP";
  return "";
}

function parseRegionRules(csv: string): RegionRule[] {
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((line, index) => {
      const [cityName, extraHoursValue, isBaseAreaValue] = line.split(",");
      const isBaseArea = isBaseAreaValue.trim().toUpperCase() === "TRUE";
      const aliases = cityName
        .split("/")
        .map((alias) => alias.trim())
        .filter(Boolean);

      if (cityName.startsWith("Seoul /")) aliases.push(...baseAreaAliases);

      return {
        regionName: aliases[0] || cityName.trim(),
        aliases,
        extraUnits: Number(extraHoursValue) || 0,
        extraUnitType: "half_hour" as const,
        isBaseArea,
        isServiceArea: true,
        requiresCustomQuote: false,
        sortOrder: isBaseArea ? index : index + 100
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}
