const DEFAULT_TONES = [
  "friendly, concise, professional",
  "formal, respectful, concise",
  "warm, professional, straightforward",
  "confident, succinct, business-casual",
  "polite, direct, professional",
];

function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function pickTone() {
  return pickRandom(DEFAULT_TONES) || "friendly, concise, professional";
}

module.exports = { pickTone, DEFAULT_TONES };

