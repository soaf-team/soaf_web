import { cloneElement, isValidElement } from 'react';
import { overlayCore } from './overlayCore';
import { OverlayProps, ReactOverlayElement } from './types';

function generateRandomKey(): string {
	return `overlay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function open<T>(element: ReactOverlayElement): Promise<T> {
	if (!isValidElement(element)) {
		throw new Error('Invalid React element provided to overlay.open');
	}

	const {
		overlayKey = generateRandomKey(),
		duration,
		...props
	} = element.props;

	const OverlayComponent: React.FC<OverlayProps> = (overlayProps) => {
		return cloneElement(element, { ...overlayProps, ...props });
	};

	return overlayCore.push(overlayKey, OverlayComponent, {
		...props,
		duration,
	}) as Promise<T>;
}

export const overlay = {
	open,
	close: overlayCore.pop.bind(overlayCore),
	remove: overlayCore.remove.bind(overlayCore),
	clear: overlayCore.clear.bind(overlayCore),
};
