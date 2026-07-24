<script lang="ts" module>
	export type EmitterEventBonusIntro = { type: 'bonusIntroShow'; tier: string };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { BitmapText, Container } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';

	// Viking 3-tier bonus. Higher tiers = rarer & bigger (5 scatters = ragnarok).
	const TIERS: Record<string, { title: string; subtitle: string; color: number }> = {
		raid: { title: 'RAID', subtitle: '3 SCATTERS', color: 0x8fd0ff },
		expedition: { title: 'EXPEDITION', subtitle: '4 SCATTERS', color: 0xffd76a },
		ragnarok: { title: 'RAGNAROK', subtitle: '5 SCATTERS', color: 0xff5a4a },
	};

	const context = getContext();

	let show = $state(false);
	let tier = $state('raid');
	let oncomplete = $state(() => {});

	const tierData = $derived(TIERS[tier] ?? TIERS.raid);

	context.eventEmitter.subscribeOnMount({
		bonusIntroShow: async (emitterEvent) => {
			tier = emitterEvent.tier;
			show = true;
			// auto-continue after a short delay so autoplay never hangs; a tap skips early
			await Promise.race([
				waitForResolve((resolve) => (oncomplete = resolve)),
				new Promise((resolve) => setTimeout(resolve, 2200)),
			]);
			show = false;
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.6} />

	<Container>
		<BitmapText
			anchor={{ x: 0.5, y: 0.5 }}
			y={-60}
			text={tierData.title}
			tint={tierData.color}
			style={{ fontFamily: 'gold', fontSize: 130, fontWeight: 'bold' }}
		/>
		<BitmapText
			anchor={{ x: 0.5, y: 0.5 }}
			y={60}
			text={tierData.subtitle}
			style={{ fontFamily: 'gold', fontSize: 60 }}
		/>
	</Container>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
