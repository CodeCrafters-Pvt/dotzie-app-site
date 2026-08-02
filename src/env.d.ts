/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/** Slide-deck controls published by `Deck.astro` on the homepage. */
interface DotzieDeck {
  readonly index: number;
  readonly count: number;
  readonly ids: string[];
  go(i: number, opts?: { wrap?: boolean }): void;
  next(): void;
  prev(): void;
}

interface Window {
  dotzieDeck?: DotzieDeck;
}
