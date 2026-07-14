/**
 * Single source of truth for every number shown on the site.
 * Each figure cites the ECP source document it was taken from:
 *  - [WEB]  ecprogram.org (retrieved Jul 2026)
 *  - [IR25] 2025 Impact Report
 *  - [AR24] 2024 Annual Report
 *  - [Q126] Q1 2026 Report
 */

export const headline = {
  /** [WEB] "To date" viewers reached counter */
  totalLearners: 3_795_144,
  /** [WEB] countries & territories list */
  totalCountries: 77,
  /** [WEB] learnecprogram.org library size */
  educationPackages: 25,
  /** [IR25] founded 2015, one person presenting in Atlanta schools */
  foundedYear: 2015,
  /** [WEB] est. CO2 emissions prevented annually, kg (Scarborough et al., 2014 methodology) */
  co2PreventedKgPerYear: 582_408_933,
  /** [Q126] % of viewers intending plant-forward dietary changes, n=886, Feb 2024 - Mar 2026 */
  intentToChangePct: 90.75,
  intentToChangeN: 886,
  /** [Q126] recent study: increase in participants choosing plant-forward options */
  behaviorMultiplier: 2.5,
  /** [Q126] full-time staff */
  teamSize: 11,
} as const;

/** [AR24] University of Edinburgh real food choice study (Bryant Research, UK) */
export const edinburghStudy = {
  treatmentMeatFreePct: 72.7,
  treatmentN: 22,
  controlMeatFreePct: 29.4,
  controlN: 17,
} as const;

/** [AR24] University of Cambridge arm: both treatments outperformed control (statistically significant) */
export const cambridgeStudy = {
  environmentalTreatmentPlantBasedPct: 22.2,
  environmentalTreatmentN: 45,
  ethicsTreatmentPlantBasedPct: 16.2,
  ethicsTreatmentN: 37,
  controlPlantBasedPct: 0,
  controlN: 20,
} as const;

/** [AR24] biggest motivators for dietary change, n=371 */
export const motivators = [
  { key: "health", pct: 28 },
  { key: "environment", pct: 20 },
  { key: "animals", pct: 17 },
  { key: "foodSafety", pct: 11 },
  { key: "savingMoney", pct: 9 },
  { key: "taste", pct: 8 },
  { key: "foodSecurity", pct: 7 },
] as const;

/** [AR24] biggest barriers to dietary change, n=371 */
export const barriers = [
  { key: "taste", pct: 31 },
  { key: "family", pct: 22 },
  { key: "cost", pct: 13 },
  { key: "peers", pct: 11 },
  { key: "none", pct: 6 },
] as const;

/** [Q126] top reported changes after viewing */
export const topChanges = {
  increaseFruitVegPct: 52.48,
  reduceRedMeatPct: 46.16,
} as const;

/** [AR24] 2024 financial overview (share of expenses) */
export const budget2024 = [
  { key: "education", pct: 80.9 },
  { key: "operations", pct: 16.3 },
  { key: "fundraising", pct: 2.5 },
  { key: "livingLab", pct: 0.3 },
] as const;

/** [IR25] 2025 expenses */
export const expenses2025 = {
  total: 1_219_853,
  mission: 851_445,
  diversification: 211_846,
  operations: 156_163,
} as const;

/** [Q126] Q1 2026 activity — basis for cost-per-learner estimate */
export const q1_2026 = {
  learners: 40_000,
  sessions: 1_560,
  expensesTotal: 351_146,
  newAccountHolders: 500,
  newFaculty: 310,
} as const;

/** Derived: rough cost to reach one learner (Q1 2026 total expenses / reported learners) */
export const costPerLearnerUSD =
  Math.round((q1_2026.expensesTotal / q1_2026.learners) * 100) / 100;

/**
 * Cumulative learners trajectory.
 * Anchored points are reported figures; the rest is a reconstruction
 * for visualization purposes (flagged approx: true).
 *  - 2015: program founded [IR25]
 *  - 2024: 3,544,690 as of 12/31/24 [AR24]
 *  - 2026: 3,795,144 to date [WEB]
 */
export const growthSeries: {
  year: number;
  learners: number;
  approx: boolean;
}[] = [
  { year: 2015, learners: 1_200, approx: true },
  { year: 2016, learners: 18_000, approx: true },
  { year: 2017, learners: 65_000, approx: true },
  { year: 2018, learners: 160_000, approx: true },
  { year: 2019, learners: 420_000, approx: true },
  { year: 2020, learners: 900_000, approx: true },
  { year: 2021, learners: 1_600_000, approx: true },
  { year: 2022, learners: 2_350_000, approx: true },
  { year: 2023, learners: 3_050_000, approx: true },
  { year: 2024, learners: 3_544_690, approx: false },
  { year: 2025, learners: 3_709_000, approx: true },
  { year: 2026, learners: 3_795_144, approx: false },
];

/** Timeline milestones keyed for i18n lookup (spark.milestones.<key>) */
export const milestones = [
  { year: 2015, key: "founding" },
  { year: 2020, key: "global" },
  { year: 2024, key: "library" },
  { year: 2024.7, key: "study" },
  { year: 2025, key: "decade" },
  { year: 2026, key: "today" },
] as const;

export type Region = "americas" | "europe" | "africa" | "asia" | "oceania";

/**
 * [WEB] 77 countries & territories where ECP materials have been used,
 * mapped to ISO 3166-1 numeric ids (world-atlas TopoJSON).
 * England / Scotland / Northern Ireland map to GB; small territories
 * (Bermuda, Macao) may not render at 110m resolution but count in the total.
 */
export const ecpCountries: { id: number; name: string; region: Region }[] = [
  { id: 32, name: "Argentina", region: "americas" },
  { id: 36, name: "Australia", region: "oceania" },
  { id: 40, name: "Austria", region: "europe" },
  { id: 48, name: "Bahrain", region: "asia" },
  { id: 56, name: "Belgium", region: "europe" },
  { id: 60, name: "Bermuda", region: "americas" },
  { id: 68, name: "Bolivia", region: "americas" },
  { id: 70, name: "Bosnia and Herzegovina", region: "europe" },
  { id: 76, name: "Brazil", region: "americas" },
  { id: 96, name: "Brunei Darussalam", region: "asia" },
  { id: 124, name: "Canada", region: "americas" },
  { id: 152, name: "Chile", region: "americas" },
  { id: 156, name: "China", region: "asia" },
  { id: 170, name: "Colombia", region: "americas" },
  { id: 188, name: "Costa Rica", region: "americas" },
  { id: 214, name: "Dominican Republic", region: "americas" },
  { id: 218, name: "Ecuador", region: "americas" },
  { id: 222, name: "El Salvador", region: "americas" },
  { id: 826, name: "United Kingdom", region: "europe" },
  { id: 250, name: "France", region: "europe" },
  { id: 270, name: "Gambia", region: "africa" },
  { id: 276, name: "Germany", region: "europe" },
  { id: 300, name: "Greece", region: "europe" },
  { id: 320, name: "Guatemala", region: "americas" },
  { id: 340, name: "Honduras", region: "americas" },
  { id: 348, name: "Hungary", region: "europe" },
  { id: 356, name: "India", region: "asia" },
  { id: 360, name: "Indonesia", region: "asia" },
  { id: 372, name: "Ireland", region: "europe" },
  { id: 376, name: "Israel", region: "asia" },
  { id: 380, name: "Italy", region: "europe" },
  { id: 392, name: "Japan", region: "asia" },
  { id: 398, name: "Kazakhstan", region: "asia" },
  { id: 404, name: "Kenya", region: "africa" },
  { id: 422, name: "Lebanon", region: "asia" },
  { id: 440, name: "Lithuania", region: "europe" },
  { id: 446, name: "Macao", region: "asia" },
  { id: 458, name: "Malaysia", region: "asia" },
  { id: 480, name: "Mauritius", region: "africa" },
  { id: 484, name: "Mexico", region: "americas" },
  { id: 104, name: "Myanmar", region: "asia" },
  { id: 554, name: "New Zealand", region: "oceania" },
  { id: 558, name: "Nicaragua", region: "americas" },
  { id: 566, name: "Nigeria", region: "africa" },
  { id: 586, name: "Pakistan", region: "asia" },
  { id: 591, name: "Panama", region: "americas" },
  { id: 600, name: "Paraguay", region: "americas" },
  { id: 604, name: "Peru", region: "americas" },
  { id: 608, name: "Philippines", region: "asia" },
  { id: 616, name: "Poland", region: "europe" },
  { id: 620, name: "Portugal", region: "europe" },
  { id: 630, name: "Puerto Rico", region: "americas" },
  { id: 364, name: "Iran", region: "asia" },
  { id: 642, name: "Romania", region: "europe" },
  { id: 643, name: "Russian Federation", region: "europe" },
  { id: 682, name: "Saudi Arabia", region: "asia" },
  { id: 702, name: "Singapore", region: "asia" },
  { id: 703, name: "Slovakia", region: "europe" },
  { id: 705, name: "Slovenia", region: "europe" },
  { id: 706, name: "Somalia", region: "africa" },
  { id: 710, name: "South Africa", region: "africa" },
  { id: 410, name: "South Korea", region: "asia" },
  { id: 724, name: "Spain", region: "europe" },
  { id: 144, name: "Sri Lanka", region: "asia" },
  { id: 752, name: "Sweden", region: "europe" },
  { id: 756, name: "Switzerland", region: "europe" },
  { id: 158, name: "Taiwan", region: "asia" },
  { id: 528, name: "Netherlands", region: "europe" },
  { id: 792, name: "Türkiye", region: "asia" },
  { id: 804, name: "Ukraine", region: "europe" },
  { id: 784, name: "United Arab Emirates", region: "asia" },
  { id: 840, name: "United States", region: "americas" },
  { id: 858, name: "Uruguay", region: "americas" },
  { id: 862, name: "Venezuela", region: "americas" },
  { id: 704, name: "Vietnam", region: "asia" },
] as const;

/** Learner & educator quotes [Q126 pp.11, IR25] — verbatim from reports */
export const quoteKeys = [
  "power",
  "pollution",
  "lessMeat",
  "wholefoods",
  "redMeat",
  "teacher",
] as const;

export const links = {
  donate: "https://www.ecprogram.org/donate",
  website: "https://www.ecprogram.org/",
  library: "https://learnecprogram.org/",
  impactReport:
    "https://www.ecprogram.org/2025-impact-report",
} as const;

/** CO2 tangible equivalents, derived from co2PreventedKgPerYear */
export const co2Equivalents = {
  /** EPA: typical passenger vehicle ≈ 4,600 kg CO2/yr */
  carsOffRoad: Math.round(headline.co2PreventedKgPerYear / 4600),
  /** ~986 kg CO2 per economy round-trip transatlantic flight (NYC-London) */
  flights: Math.round(headline.co2PreventedKgPerYear / 986),
  /** a mature tree absorbs ~21 kg CO2/yr */
  trees: Math.round(headline.co2PreventedKgPerYear / 21),
} as const;
