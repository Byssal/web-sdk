<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();

	// Frame art is 720x720 (square, same aspect as the 6x6 board). A small MARGIN
	// makes it hug the symbols so the grid sits flush ("à fleur") inside the opening.
	const FRAME_RATIO = 720 / 720;
	const FRAME_MARGIN = 1.13;
	const frameWidth = $derived(context.stateGameDerived.boardLayout().width * FRAME_MARGIN);
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
