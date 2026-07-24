/**
 * Offline "fake RGS" for local development.
 *
 * Patches window.fetch to answer the Stake RGS endpoints (/wallet/authenticate,
 * /wallet/play, /wallet/end-round, /wallet/balance) with a demo balance and real
 * simulated rounds bundled from the math-sdk (see mockRgsData.json). This lets you
 * click SPIN and play offline with a balance that goes up and down — no account,
 * no server, no internet.
 *
 * NOT for production: it is only installed in `pnpm dev` (import.meta.env.DEV) and
 * only when the page has no real `rgs_url` query param, so real sessions are never
 * intercepted. The win distribution is NOT balanced RTP (features show up often on
 * purpose so they're easy to test).
 */
// Vite resolves JSON imports natively at runtime; the ts-ignore only silences the
// type-checker (this app's tsconfig doesn't enable resolveJsonModule).
// @ts-ignore
import mockData from './mockRgsData.json';

const API = 1_000_000; // API amount units per 1.00 of currency
const CURRENCY = 'USD';
const START_BALANCE = 10_000;

type Round = { payoutMultiplier: number; events: unknown[] };
type Pool = { rounds: Round[]; weights: number[] };
const data = mockData as unknown as { base: Pool; bonus: Pool };

let balance = START_BALANCE;
let pendingWin = 0;

const okStatus = { statusCode: 'OK', statusMessage: '' };
const balanceObj = () => ({ amount: Math.round(balance * API), currency: CURRENCY });

// Cost multiplier charged per bet mode (matches the app's betModeMeta).
const MODE_COST: Record<string, number> = { BASE: 1, RAID: 60, EXPEDITION: 120, RAGNAROK: 360 };

// Split the bonus rounds into per-tier pools by their enterBonus "reason", so each
// buyable tier serves the matching bonus rounds.
const tierPool = (reason: string): Pool => {
	const rounds: Round[] = [];
	const weights: number[] = [];
	data.bonus.rounds.forEach((round, i) => {
		const isTier = (round.events as any[]).some(
			(e) => e && e.type === 'enterBonus' && e.reason === reason,
		);
		if (isTier) {
			rounds.push(round);
			weights.push(data.bonus.weights[i]);
		}
	});
	return rounds.length ? { rounds, weights } : data.bonus;
};
const TIER_POOLS: Record<string, Pool> = {
	RAID: tierPool('raid'),
	EXPEDITION: tierPool('expedition'),
	RAGNAROK: tierPool('ragnarok'),
};

const pickWeighted = (mode: string): Round => {
	const pool = TIER_POOLS[mode.toUpperCase()] || data.base;
	const { rounds, weights } = pool;
	let total = 0;
	for (const w of weights) total += w;
	let r = Math.random() * total;
	for (let i = 0; i < rounds.length; i++) {
		r -= weights[i];
		if (r <= 0) return rounds[i];
	}
	return rounds[rounds.length - 1];
};

const json = (body: unknown) =>
	new Response(JSON.stringify(body), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	});

const handle = (url: string, body: any): Response => {
	if (url.includes('/wallet/authenticate')) {
		return json({
			status: okStatus,
			balance: balanceObj(),
			config: {
				minBet: 0.1 * API,
				maxBet: 100 * API,
				stepBet: 0.1 * API,
				defaultBetLevel: 1 * API,
				betLevels: [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100].map((x) => Math.round(x * API)),
				betModes: {},
				jurisdiction: {
					socialCasino: false,
					disabledFullscreen: false,
					disabledTurbo: false,
					disabledSuperTurbo: false,
					disabledAutoplay: false,
					disabledSlamstop: false,
					disabledSpacebar: false,
					disabledBuyFeature: false,
					displayNetPosition: false,
					displayRTP: false,
					displaySessionTimer: false,
					minimumRoundDuration: 0,
				},
			},
			round: null,
		});
	}

	if (url.includes('/wallet/play')) {
		const amount = (Number(body?.amount) || API) / API; // base bet in currency
		const mode = String(body?.mode || 'BASE');
		// Charge base bet x the mode's cost multiplier (Buy Bonus costs 100x).
		const cost = amount * (MODE_COST[mode.toUpperCase()] || 1);
		balance = Math.max(0, balance - cost);
		const round = pickWeighted(mode);
		// The math-sdk stores payoutMultiplier scaled x100 (e.g. 1000 = 10.00x),
		// so divide by 100. Wins are relative to the base bet (not the buy cost).
		pendingWin = ((round.payoutMultiplier || 0) / 100) * amount;
		return json({
			status: okStatus,
			balance: balanceObj(), // balance AFTER the bet is taken; win credited at end-round
			round: {
				roundID: Date.now(),
				amount: Math.round(amount * API),
				payout: Math.round(pendingWin * API),
				payoutMultiplier: round.payoutMultiplier || 0,
				active: false,
				mode,
				event: null,
				state: round.events,
			},
		});
	}

	if (url.includes('/wallet/end-round')) {
		balance += pendingWin;
		pendingWin = 0;
		return json({ status: okStatus, balance: balanceObj() });
	}

	if (url.includes('/wallet/balance')) {
		return json({ status: okStatus, balance: balanceObj() });
	}

	// /bet/event, /bet/replay/... — nothing to do offline
	return json({ status: okStatus });
};

export const installMockRgs = () => {
	if (typeof window === 'undefined') return;
	if (new URLSearchParams(window.location.search).has('rgs_url')) return; // real session -> don't intercept
	if ((window as any).__mockRgsInstalled) return;
	(window as any).__mockRgsInstalled = true;

	const origFetch = window.fetch.bind(window);
	window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
		const url =
			typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;
		if (/\/wallet\/(authenticate|play|end-round|balance)|\/bet\//.test(url)) {
			let body: any;
			try {
				if (init?.body) body = JSON.parse(init.body as string);
			} catch {
				/* ignore */
			}
			return handle(url, body);
		}
		return origFetch(input, init);
	};

	console.info(
		`[mockRgs] Faux RGS hors-ligne activé — balance de démo $${START_BALANCE}. ` +
			`base=${data.base.rounds.length} bonus=${data.bonus.rounds.length} tours.`,
	);
};
