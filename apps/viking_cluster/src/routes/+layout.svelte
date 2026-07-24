<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoaderStakeEngine, LoaderExample, LoadI18n } from 'components-shared';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { stateMeta } from 'state-shared';

	import messagesMap from '../i18n/messagesMap';

	// Bet modes offered by this game: a normal spin plus three buyable bonus tiers
	// (Raid / Expedition / Ragnarok). Overrides the SDK default (which also exposes
	// ANTE / SUPERANTE / SUPERSPIN modes we don't implement).
	const emptyAssets = { icon: '', dialogImage: '', dialogVolatility: '', volatility: '', button: '' };
	const buyMode = (
		mode: string,
		costMultiplier: number,
		title: string,
		dialog: string,
		description: string,
	) => ({
		mode,
		costMultiplier,
		type: 'buy' as const,
		parent: '',
		children: '',
		assets: emptyAssets,
		text: {
			title,
			dialog,
			description,
			button: 'BUY',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: `${title} ACTIVATED`,
			bannerText: '',
		},
		maxWin: 5000,
	});
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
		RAID: buyMode(
			'RAID',
			60,
			'RAID',
			'Achète 8 tours gratuits pour 60x ta mise.',
			'Bonus classique : la grille de multiplicateurs se construit à chaque connexion.',
		),
		EXPEDITION: buyMode(
			'EXPEDITION',
			120,
			'EXPEDITION',
			'Achète 12 tours gratuits pour 120x ta mise.',
			'Plus de tours gratuits pour laisser les multiplicateurs monter.',
		),
		RAGNAROK: buyMode(
			'RAGNAROK',
			360,
			'RAGNAROK',
			'Achète 12 tours gratuits pour 360x ta mise.',
			'La grille de multiplicateurs démarre chaque tour à x4. Immense potentiel.',
		),
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