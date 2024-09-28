import { CSSProperties } from 'react';

type SpacingProps = {
	size?: number;
	direction?: 'vertical' | 'horizontal';
};

export const Spacing = ({
	size = 10,
	direction = 'vertical',
}: SpacingProps) => {
	const baseClassName = direction === 'vertical' ? 'w-0' : 'h-0';

	const style: CSSProperties = {
		[direction === 'vertical' ? 'height' : 'width']: `${size}px`,
	};

	return <div className={baseClassName} style={style} />;
};
