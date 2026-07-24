<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoaderStakeEngine, LoaderExample, LoadI18n } from 'components-shared';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { stateMeta } from 'state-shared';

	import messagesMap from '../i18n/messagesMap';

	// This game only supports two bet modes: a normal spin and one Buy Bonus.
	// Override the SDK's default (which also exposes ANTE / SUPERANTE / SUPERSPIN /
	// SUPER "boost" modes we don't implement) so the UI only offers what works.
	const emptyAssets = { icon: '', dialogImage: '', dialogVolatility: '', volatility: '', button: '' };
	stateMeta.betModeMeta = {
		BASE: {
			mode: 'BASE',
			costMultiplier: 1,
			type: 'default',
			parent: '',
			children: '',
			assets: emptyAssets,
			text: { title: '', dialog: '', button: '', betAmountLabel: '', tickerIdle: '', tickerSpin: '', bannerText: '' },
			maxWin: 5000,
		},
		BONUS: {
			mode: 'BONUS',
			costMultiplier: 100,
			type: 'buy',
			parent: '',
			children: '',
			assets: emptyAssets,
			text: {
				title: 'RAID BONUS',
				dialog: 'Achète directement les tours gratuits pour 100x ta mise.',
				description: 'Des multiplicateurs aléatoires peuvent apparaître pendant les tours gratuits.',
				button: 'BUY',
				tickerIdle: 'PLACE YOUR BET',
				tickerSpin: 'BONUS ACTIVATED',
				bannerText: '',
			},
			maxWin: 5000,
		},
	};

	type Props = { children: Snippet };

	const props: Props = $props();

	let showYourLoader = $state(false);

	const loaderUrlStakeEngine = new URL('../../stake-engine-loader.gif', import.meta.url).href;
	const loaderUrl = new URL('../../loader.gif', import.meta.url).href;

	setContext();
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

<LoaderStakeEngine src={loaderUrlStakeEngine} oncomplete={() => (showYourLoader = true)} />

{#if showYourLoader}
	<LoaderExample src={loaderUrl} />
	<!-- '/loader.gif' is served from static folder of sveltekit -->
	<!-- File location: apps/scatter/static/loader.gif -->
{/if}

{@render props.children()}