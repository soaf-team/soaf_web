import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useStack } from '@stackflow/react';
import { Header } from './Header';
import { cn } from '@/utils';
import { useActiveActivity } from '@/hooks';

type PageLayoutProps = {
	children: React.ReactNode;
	header?: {
		title?: React.ReactNode;
		leftSlot?: {
			component?: React.ReactNode;
			className?: string;
		};
		rightSlot?: {
			component?: React.ReactNode;
			className?: string;
		};
		headerClass?: string;
	};
	className?: string;
	containerClassName?: string;
};

export const PageLayout = ({
	children,
	header,
	className,
	containerClassName,
}: PageLayoutProps) => {
	const isMyHome = window.location.pathname.includes('myHome');
	const stack = useStack();
	const { isBottomTabActivity } = useActiveActivity(stack);
	const paddingBottom = isBottomTabActivity && !isMyHome ? 'pb-[93px]' : 'pb-0';
	const topSafeArea = localStorage.getItem('topSafeArea');
	const paddingTop = topSafeArea ? `${topSafeArea}px` : undefined;

	return (
		<AppScreen>
			<div
				className={cn([
					'flex flex-col h-screen box-border',
					paddingBottom,
					containerClassName,
				])}
				vaul-drawer-wrapper="" // eslint-disable-line
				style={{
					paddingTop,
				}}
			>
				{header ? (
					<Header
						leftSlot={header.leftSlot}
						rightSlot={header.rightSlot}
						className={header.headerClass}
					>
						{header.title}
					</Header>
				) : null}
				<main
					className={cn([
						'flex flex-col px-[18px] flex-1 overflow-auto',
						className,
					])}
				>
					{children}
				</main>
			</div>
		</AppScreen>
	);
};
