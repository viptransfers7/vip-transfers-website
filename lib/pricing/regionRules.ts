import type { RegionRule } from "./types";

export const regionRules: RegionRule[] = [
  {
    regionName: "Seoul Base Area",
    aliases: [
      "seoul",
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
      "서울",
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
    ],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: true,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 10
  },
  {
    regionName: "Incheon Airport",
    aliases: ["incheon airport", "incheon international airport", "icn", "terminal 1", "terminal 2", "仁川", "인천공항", "인천 국제공항", "인천국제공항"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 20
  },
  {
    regionName: "Gimpo Airport",
    aliases: ["gimpo airport", "gimpo international airport", "gmp", "김포공항", "김포 국제공항", "김포국제공항"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 30
  },
  {
    regionName: "Songdo / Incheon City",
    aliases: ["songdo", "songdo convensia", "convensia", "central park incheon", "paradise city", "incheon", "송도", "송도컨벤시아", "컨벤시아", "센트럴파크", "파라다이스시티", "인천"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    airportExtraUnits: { ICN: 0, GMP: 0 },
    pointToPointExtraUnits: 2,
    hourlyDispatchExtraUnits: 2,
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 35
  },
  {
    regionName: "Pangyo / Bundang",
    aliases: ["pangyo", "bundang", "seongnam", "판교", "분당", "성남"],
    extraUnits: 1,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 40
  },
  {
    regionName: "Suwon / Yongin",
    aliases: ["suwon", "yongin", "gwanggyo", "수원", "용인", "광교"],
    extraUnits: 2,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: false,
    sortOrder: 50
  },
  {
    regionName: "Nami Island / Gapyeong",
    aliases: ["nami", "gapyeong", "petite france", "남이섬", "가평"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: true,
    quoteMessage: "This route is usually handled as a private tour or custom day trip.",
    sortOrder: 60
  },
  {
    regionName: "Chuncheon / Legoland",
    aliases: ["chuncheon", "legoland", "춘천", "레고랜드"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: true,
    requiresCustomQuote: true,
    quoteMessage: "Long-distance dispatch requires concierge review.",
    sortOrder: 70
  },
  {
    regionName: "Regional Korea",
    aliases: ["busan", "daegu", "daejeon", "jeju", "gangneung", "부산", "대구", "대전", "제주", "강릉"],
    extraUnits: 0,
    extraUnitType: "half_hour",
    isBaseArea: false,
    isServiceArea: false,
    requiresCustomQuote: true,
    quoteMessage: "Regional or long-distance Korea service requires a custom quote.",
    sortOrder: 90
  }
];

export function findRegion(input = "") {
  const normalized = input.toLowerCase();
  return regionRules.find((region) => region.aliases.some((alias) => normalized.includes(alias.toLowerCase())));
}

export function detectAirport(input = "") {
  const normalized = input.toLowerCase();
  if (/icn|incheon airport|incheon international airport|인천공항|인천 국제공항|인천국제공항/.test(normalized)) return "ICN";
  if (/gmp|gimpo airport|gimpo international airport|김포공항|김포 국제공항|김포국제공항/.test(normalized)) return "GMP";
  return "";
}
