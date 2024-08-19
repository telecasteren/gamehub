// Script to calculate the distance between letters. NOT IN USE

export function levenshtein(a = "", b = "") {
  const alen = a.length;
  const blen = b.length;

  // Handle edge cases
  if (alen === 0) return blen;
  if (blen === 0) return alen;

  // Initialize DP array
  const dp = Array.from({ length: alen + 1 }, (_, i) =>
    Array(blen + 1).fill(0)
  );

  // Fill base cases
  for (let i = 0; i <= alen; i++) dp[i][0] = i;
  for (let j = 0; j <= blen; j++) dp[0][j] = j;

  // Compute Levenshtein distance
  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[alen][blen];
}
