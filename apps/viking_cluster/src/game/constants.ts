import _ from 'lodash';

import type { RawSymbol, SymbolState, SymbolInfo } from './types';

export const SYMBOL_SIZE = 66;

export const REEL_PADDING = 0.53;

// initial board: 5 reels (columns) x 8 rows (1 padding top + 6 visible + 1 padding bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[{ name: 'L1' }, { name: 'H1' }, { name: 'L1' }, { name: 'L2' }, { name: 'L2' }, { name: 'L3' }, { name: 'H3' }, { name: 'L2' }],
	[{ name: 'L2' }, { name: 'L2' }, { name: 'L3' }, { name: 'L2' }, { name: 'L2' }, { name: 'L3' }, { name: 'H2' }, { name: 'L1' }],
	[{ name: 'L3' }, { name: 'H3' }, { name: 'L1' }, { name: 'L1' }, { name: 'H4' }, { name: 'L2' }, { name: 'H2' }, { name: 'L4' }],
	[{ name: 'H4' }, { name: 'L1' }, { name: 'H2' }, { name: 'H2' }, { name: 'H4' }, { name: 'H2' }, { name: 'L3' }, { name: 'L2' }],
	[{ name: 'L1' }, { name: 'L1' }, { name: 'H3' }, { name: 'H1' }, { name: 'H1' }, { name: 'L2' }, { name: 'L3' }, { name: 'H4' }],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3', 'H4'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const SPIN_OPTIONS_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 3.5,
	symbolFallInInterval: 30,
	symbolFallInBounceSpeed: 0.15,
	symbolFallInBounceSizeMulti: 0.5,
	symbolFallOutSpeed: 3.5,
	symbolFallOutInterval: 20,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

// v1 placeholder art: every state (static/spin/land/win/postWinStatic/explosion) reuses
// the same plain sprite per symbol -- no Spine animation yet (see project plan/memory).
const h1Static: SymbolInfo = { type: 'sprite', assetKey: 'vh1', sizeRatios: { width: 1, height: 1 } };
const h2Static: SymbolInfo = { type: 'sprite', assetKey: 'vh2', sizeRatios: { width: 1, height: 1 } };
const h3Static: SymbolInfo = { type: 'sprite', assetKey: 'vh3', sizeRatios: { width: 1, height: 1 } };
const h4Static: SymbolInfo = { type: 'sprite', assetKey: 'vh4', sizeRatios: { width: 1, height: 1 } };

const l1Static: SymbolInfo = { type: 'sprite', assetKey: 'vl1', sizeRatios: { width: 1, height: 1 } };
const l2Static: SymbolInfo = { type: 'sprite', assetKey: 'vl2', sizeRatios: { width: 1, height: 1 } };
const l3Static: SymbolInfo = { type: 'sprite', assetKey: 'vl3', sizeRatios: { width: 1, height: 1 } };
const l4Static: SymbolInfo = { type: 'sprite', assetKey: 'vl4', sizeRatios: { width: 1, height: 1 } };

const sStatic: SymbolInfo = { type: 'sprite', assetKey: 'vs', sizeRatios: { width: 1.1, height: 1.1 } };
const wStatic: SymbolInfo = { type: 'sprite', assetKey: 'vw', sizeRatios: { width: 1.1, height: 1.1 } };

function allStates(base: SymbolInfo) {
	// Each state must be a DISTINCT object: the win animation waits for the symbol
	// to signal completion, which only fires when `symbolInfo` changes reference on
	// a state transition. Shared references would make winning spins hang forever.
	return {
		explosion: { ...base },
		win: { ...base },
		postWinStatic: { ...base },
		static: { ...base },
		spin: { ...base },
		land: { ...base },
	};
}

export const SYMBOL_INFO_MAP = {
	H1: allStates(h1Static),
	H2: allStates(h2Static),
	H3: allStates(h3Static),
	H4: allStates(h4Static),
	L1: allStates(l1Static),
	L2: allStates(l2Static),
	L3: allStates(l3Static),
	L4: allStates(l4Static),
	W: allStates(wStatic),
	S: allStates(sStatic),
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;
