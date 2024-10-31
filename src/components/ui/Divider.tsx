import { cn } from '@/utils';

interface Props {
	className?: string;
	vertical?: boolean;
}

export const Divider = ({ className = '', vertical = false }: Props) => {
	return (
		<div
			className={cn(
				'border-t border-solid border-border',
				vertical ? 'w-0 h-full' : 'w-full h-0',
				className,
			)}
		/>
	);
};
