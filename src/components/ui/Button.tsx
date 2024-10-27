import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { useCheckWebview, usePressEffect, useRippleEffect } from '@/hooks';

const buttonVariants = cva(
	`inline-flex items-center justify-center whitespace-nowrap rounded-[16px] 
   w-full ring-offset-background transition-colors overflow-hidden relative`,
	{
		variants: {
			variant: {
				primary: 'bg-main_gradient text-white',
				secondary: 'bg-gray50 text-black',
				warn: 'bg-warn text-white',
				ghost: 'bg-gray50 tex-black',
			},
			size: {
				md: 'h-[52px] head6sb',
				sm: 'h-[48px] head6sb',
				xs: 'h-[42px] head6sb',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, disabled, ...props }, ref) => {
		const isWebView = useCheckWebview();
		const buttonRef = React.useRef<HTMLButtonElement>(null);
		const { rippleProps, startRipple, stopRipple } = useRippleEffect({});
		const { handlePressStart, handlePressEnd, getPressStyle } = usePressEffect(
			{},
		);

		const onPressStart = (
			e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
		) => {
			if (disabled) return;
			startRipple(e, buttonRef);
			handlePressStart(e);
		};

		const onPressEnd = () => {
			if (disabled) return;
			stopRipple();
			handlePressEnd();
		};

		React.useImperativeHandle(ref, () => buttonRef.current!, []);

		return (
			<button
				id="button"
				className={cn(
					buttonVariants({ variant, size, className }),
					disabled && 'bg-gray100 text-white',
				)}
				style={getPressStyle('button')}
				ref={buttonRef}
				onMouseDown={isWebView ? undefined : onPressStart}
				onMouseUp={isWebView ? undefined : onPressEnd}
				onTouchStart={isWebView ? onPressStart : undefined}
				onTouchEnd={isWebView ? onPressEnd : undefined}
				{...props}
			>
				{children}
				<span {...rippleProps} />
			</button>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
