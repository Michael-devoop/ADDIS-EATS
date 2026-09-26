
const AREA_RATES = {
  bole: { fee: 60, etaMinutes: 25 },
  "kazanchis": { fee: 50, etaMinutes: 20 },
  piassa: { fee: 55, etaMinutes: 22 },
  "cmc": { fee: 80, etaMinutes: 35 },
};

const DEFAULT_RATE = { fee: 70, etaMinutes: 30 };

export function getDeliveryEstimate(area) {
  const key = area?.toLowerCase().trim();
  return AREA_RATES[key] || DEFAULT_RATE;
}