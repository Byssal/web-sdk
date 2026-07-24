<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();

	// The frame art is 760x1000 (portrait). Size it a bit larger than the board so
	// the 5x6 grid sits inside its opening (fixes symbols overflowing top/bottom).
	const FRAME_RATIO = 1000 / 760;
	const MARGIN = 1.32;
	const frameWidth = $derived(context.stateGameDerived.boardLayout().width * MARGIN);
</script>

<Sprite
	key="vikingFrame"
	anchor={0.5}
	zIndex={-1}
	x={context.stateGameDerived.boardLayout().x}
	y={context.stateGameDerived.boardLayout().y}
	width={frameWidth}
	height={frameWidth * FRAME_RATIO}
/>
