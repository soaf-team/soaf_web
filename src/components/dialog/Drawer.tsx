/* eslint-disable react/prop-types */
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils';

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		shouldScaleBackground={shouldScaleBackground}
		{...props}
	/>
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-[9998] bg-black/80', className)}
		{...props}
	/>
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
		overlayStyle?: string;
		isTopBar?: boolean;
	}
>(({ className, children, overlayStyle, isTopBar = true, ...props }, ref) => {
	return (
		<DrawerPortal>
			<DrawerOverlay className={cn(['max-w-window mx-auto', overlayStyle])} />
			<DrawerPrimitive.Content
				ref={ref}
				className={cn(
					'fixed inset-x-0 bottom-0 z-[9999] flex h-auto flex-col rounded-t-[28px] border bg-white max-w-window mx-auto',
					className,
				)}
				{...props}
			>
				{isTopBar && (
					<div className="mx-auto mt-[8px] mb-[16px] h-[3px] w-[40px] rounded-full bg-gray200" />
				)}
				<div data-vaul-no-drag className="px-[18px] pb-[28px] grid gap-1.5">
					{children}
				</div>
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
});
DrawerContent.displayName = 'DrawerContent';

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
};
