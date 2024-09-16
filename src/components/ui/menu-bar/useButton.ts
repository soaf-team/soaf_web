import React, { ComponentProps, HTMLAttributes, useMemo } from 'react';

export type ButtonElementType = 'button' | 'a' | 'div' | 'span' | 'input';

export type BaseButtonProps<T extends ButtonElementType = 'button'> = {
	elementType?: T;
	role?: string;
	type?: 'button' | 'submit' | 'reset';
	isDisabled?: boolean;
	isLoading?: boolean;
	tabIndex?: number;
} & ComponentProps<T>;

export type UseButtonReturn<T> = {
	buttonProps: HTMLAttributes<T> & {
		role?: string;
		type?: 'button' | 'submit' | 'reset';
		tabIndex?: number;
		disabled?: boolean;
		'data-loading': boolean;
	};
};

export type OverloadedButtonFunction = {
	(props: BaseButtonProps<'button'>): UseButtonReturn<HTMLButtonElement>;
	(props: BaseButtonProps<'a'>): UseButtonReturn<HTMLAnchorElement>;
	(props: BaseButtonProps<'div'>): UseButtonReturn<HTMLDivElement>;
	(props: BaseButtonProps<'input'>): UseButtonReturn<HTMLInputElement>;
	(props: BaseButtonProps<'span'>): UseButtonReturn<HTMLSpanElement>;
};

export type UseToggleButtonReturn<T> = UseButtonReturn<T> & {
	isSelected: boolean;
};

export type OverloadedToggleButtonFunction = {
	(
		props: BaseButtonProps<'button'>,
		isSelected?: boolean,
	): UseToggleButtonReturn<HTMLButtonElement>;
	(
		props: BaseButtonProps<'a'>,
		isSelected?: boolean,
	): UseToggleButtonReturn<HTMLAnchorElement>;
	(
		props: BaseButtonProps<'div'>,
		isSelected?: boolean,
	): UseToggleButtonReturn<HTMLDivElement>;
	(
		props: BaseButtonProps<'input'>,
		isSelected?: boolean,
	): UseToggleButtonReturn<HTMLInputElement>;
	(
		props: BaseButtonProps<'span'>,
		isSelected?: boolean,
	): UseToggleButtonReturn<HTMLSpanElement>;
};

export const useButton: OverloadedButtonFunction = (props: any): any => {
	const {
		elementType = 'button',
		isDisabled,
		isLoading,
		tabIndex,
		onKeyDown,
		type = 'button',
		href,
		target,
		rel,
		...restProps
	} = props;

	const disabled = isDisabled || isLoading;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		onKeyDown?.(event);

		if (disabled || event.defaultPrevented) return;

		if (
			['Enter', ' ', 'Spacebar'].includes(event.key) &&
			elementType !== 'button'
		) {
			event.preventDefault();
			(event.currentTarget as HTMLElement).click();
		}
	};

	const buttonProps = useMemo(() => {
		const baseProps = {
			...restProps,
			'data-loading': isLoading,
			tabIndex: disabled ? undefined : (tabIndex ?? 0),
			onKeyDown: handleKeyDown,
		};

		const elementProps = {
			button: {
				type: type ?? 'button',
				disabled,
			},
			a: {
				role: 'button',
				href: disabled ? undefined : href,
				target: disabled ? undefined : target,
				rel: disabled ? undefined : rel,
				'aria-disabled': isDisabled,
			},
			input: {
				role: 'button',
				type,
				disabled,
			},
			default: {
				role: 'button',
				type: type ?? 'button',
				'aria-disabled': isDisabled,
			},
		};

		return {
			...baseProps,
			...(elementProps[elementType as keyof typeof elementProps] ||
				elementProps.default),
		};
	}, [
		elementType,
		disabled,
		isDisabled,
		isLoading,
		tabIndex,
		type,
		href,
		target,
		rel,
		restProps,
	]);

	return { buttonProps };
};
