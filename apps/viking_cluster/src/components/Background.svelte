<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');
</script>

<!-- solid backdrop -->
<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x0a0e18} zIndex={-3} />

<!-- Viking night scene (covers the whole canvas) -->
<Sprite key="vikingBg" {...context.stateLayoutDerived.canvasSizes()} zIndex={-2} />

<!-- during free spins, tint the scene a warmer/redder raid mood -->
<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<Rectangle
		{...context.stateLayoutDerived.canvasSizes()}
		backgroundColor={0x5a1414}
		backgroundAlpha={0.35}
	/>
</FadeContainer>
