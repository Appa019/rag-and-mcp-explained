import type { Vec8 } from "@/lib/types";

export const dot = (a: Vec8, b: Vec8): number => {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i] ?? 0;
    const bi = b[i] ?? 0;
    sum += ai * bi;
  }
  return sum;
};

export const magnitude = (v: Vec8): number => {
  let sum = 0;
  for (let i = 0; i < v.length; i++) {
    const vi = v[i] ?? 0;
    sum += vi * vi;
  }
  return Math.sqrt(sum);
};

export const cosineSimilarity = (a: Vec8, b: Vec8): number => {
  const denom = magnitude(a) * magnitude(b);
  if (denom === 0) return 0;
  return dot(a, b) / denom;
};

export const cosineDistance = (a: Vec8, b: Vec8): number => {
  return 1 - cosineSimilarity(a, b);
};
