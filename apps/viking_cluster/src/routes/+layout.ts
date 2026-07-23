// if you want to generate a static html file
// for your page.
// Documentation: https://kit.svelte.dev/docs/page-options#prerender
export const prerender = true;

// if you want to Generate a SPA
// you have to set ssr to false.
// This is not the case (so set as true or comment the line)
// Documentation: https://kit.svelte.dev/docs/page-options#ssr
export const ssr = false;

// How to manage the trailing slashes in the URLs
// the URL for about page witll be /about with 'ignore' (default)
// the URL for about page witll be /about/ with 'always'
// https://kit.svelte.dev/docs/page-options#trailingslash
export const trailingSlash = 'ignore';

// DEV-only: install the offline fake RGS before anything renders, so <Authenticate>'s
// /wallet/authenticate call is intercepted and you get a demo balance + playable spins.
// Guarded by import.meta.env.DEV so it is completely absent from production builds.
export const load = async () => {
	if (import.meta.env.DEV && typeof window !== 'undefined') {
		const { installMockRgs } = await import('../dev/mockRgs');
		installMockRgs();
	}
	return {};
};
