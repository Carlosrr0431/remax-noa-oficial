function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function generateUniqueId() {
  const timestamp = Date.now();
  const random = Math.random();

  const combinedString = `${timestamp}-${random}`;
  const hashedValue = hash(combinedString);

  return hashedValue.toString(36); // Convert to base36 for shorter string
}
