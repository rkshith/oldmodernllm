// Simple subword-like tokenizer for visualization
export function tokenize(text: string): string[] {
  if (!text.trim()) return [];
  
  // Split into rough subword tokens for visual effect
  const words = text.split(/(\s+)/);
  const tokens: string[] = [];
  
  for (const word of words) {
    if (!word) continue;
    if (/^\s+$/.test(word)) {
      tokens.push(word);
      continue;
    }
    // Split longer words into subword-like pieces
    if (word.length > 6) {
      const mid = Math.ceil(word.length * 0.6);
      tokens.push(word.slice(0, mid));
      tokens.push(word.slice(mid));
    } else {
      tokens.push(word);
    }
  }
  
  return tokens.filter(t => t.trim().length > 0);
}

export function getTokenId(token: string): number {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = ((hash << 5) - hash) + token.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 50000;
}

// Generate fake embedding vector values
export function getEmbeddingValues(tokenId: number, dim: number = 8): number[] {
  const values: number[] = [];
  for (let i = 0; i < dim; i++) {
    values.push(Math.sin(tokenId * (i + 1) * 0.1) * 0.5 + 0.5);
  }
  return values;
}

// Generate fake attention weights
export function getAttentionWeights(numTokens: number): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < numTokens; i++) {
    const row: number[] = [];
    let sum = 0;
    for (let j = 0; j < numTokens; j++) {
      const w = Math.random() * 0.5 + (i === j ? 0.5 : 0);
      row.push(w);
      sum += w;
    }
    weights.push(row.map(w => w / sum));
  }
  return weights;
}

// Generate output probabilities
export function getOutputProbs(): { token: string; prob: number }[] {
  const candidates = ["the", "a", "is", "and", "to", "in", "of", "for", "that", "it"];
  const probs = candidates.map(() => Math.random());
  const sum = probs.reduce((a, b) => a + b, 0);
  return candidates
    .map((token, i) => ({ token, prob: probs[i] / sum }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 5);
}
