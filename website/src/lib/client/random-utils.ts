/**
 * Client-only random helpers (use in event handlers / effects — not during render).
 */

export function pickRandomItem<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error("pickRandomItem: items must not be empty");
  }
  return items[Math.floor(Math.random() * items.length)]!;
}

/** Same ordering behavior as `[...items].sort(() => Math.random() - 0.5)` (legacy-friendly). */
export function shuffleArray<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}
