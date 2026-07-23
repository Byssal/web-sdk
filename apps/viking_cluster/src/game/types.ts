import { type CascadingReelSymbolState } from 'utils-slots';
import type config from './config';

export type SymbolName = keyof typeof config.symbols;
export type RawSymbol = { name: SymbolName; multiplier?: number; scatter?: boolean };
export type BetMode = keyof typeof config.betModes;
export type GameType = keyof typeof config.paddingReels;

export const SYMBOL_STATES = [
	'static',
	'spin',
	'land',
	'win',
	'postWinStatic',
	'explosion',
] as const;

export type SymbolState = CascadingReelSymbolState | (typeof SYMBOL_STATES)[number];

export type Position = {
	reel: number;
	row: number;
};

// Visual description for one symbol state. v1 uses only `sprite`; `spine` is kept
// in the union so shared components that branch on `type === 'spine'` still compile.
export type SymbolInfo = {
	type: 'sprite' | 'spine';
	assetKey: string;
	animationName?: string;
	sizeRatios: { width: number; height: number };
};
