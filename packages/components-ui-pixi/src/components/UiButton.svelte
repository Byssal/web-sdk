<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

	import UiSprite from './UiSprite.svelte';
	import type { ButtonIcon } from '../types';
	import type { Snippet } from 'svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: ButtonIcon;
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light';
	};

	const {
		icon,
		active,
		variant = 'dark',
		children: childrenFromParent,
		...buttonProps
	}: Props = $props();
</script>

<Button {...buttonProps}>
	{#snippet children({ center, hovered, pressed })}
		<UiSprite
			{...center}
			anchor={0.5}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			backgroundColor={variant === 'dark' ? 0x2b1d10 : 0xf5e082}
			borderColor={0xc79b3b}
			borderWidth={4}
			{...buttonProps.disabled
				? {
						backgroundColor: 0x5a5148,
					}
				: {}}
			{...active
				? {
						borderWidth: 10,
						borderColor: 0xf5e082,
					}
				: {}}
		/>

		<Text
			{...center}
			anchor={0.5}
			text={i18nDerived[icon]()}
			style={{
				align: 'center',
				wordWrap: true,
				wordWrapWidth: 200,
				fontFamily: 'proxima-nova',
				fontWeight: '600',
				fontSize: UI_BASE_FONT_SIZE * 0.9,
				fill: variant === 'dark' ? 0xf5e082 : 0x2b1d10,
			}}
		/>

		{@render childrenFromParent?.()}
	{/snippet}
</Button>
