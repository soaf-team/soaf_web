export type SetStateFunction = (prev: number) => number;
export type FlagState = [number, (updateFunction: SetStateFunction) => void];
export type Listener = () => void;

export type OverlayProps = {
	[key: string]: any;
	overlayKey: string;
	resolve?: (value: unknown) => void;
	reject?: (reason: unknown) => void;
	duration?: number;
};

export type OverlayType<P = OverlayProps> = (props: P) => any;

export type OverlayStackItem<P = OverlayProps> = {
	overlayKey: string;
	overlay: OverlayType;
	resolve: (value: unknown) => void;
	reject: (reason: unknown) => void;
	props: Omit<P, 'resolve' | 'reject'>;
};

export type OverlayStack<P = OverlayProps> = OverlayStackItem<P>[];

export type ReactOverlayElement = React.ReactElement<
	OverlayProps & { key: string }
>;
