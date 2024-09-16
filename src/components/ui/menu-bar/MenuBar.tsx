import React, {
	Children,
	ForwardedRef,
	ReactElement,
	cloneElement,
	forwardRef,
	useContext,
	useEffect,
	useState,
} from 'react';

import { MenuBarContext } from './MenuBarContext';
import { useButton } from './useButton';
import { cn } from '@/utils';

export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
	selectedMenu: string | null;
	children: React.ReactNode;
	onChangeMenu: (menu: string) => void;
}

export interface MenuProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
	children: React.ReactNode;
}

export const MenuBar = (props: MenuBarProps) => {
	const { children, className, selectedMenu, onChangeMenu } = props;

	const childrenArr = Children.toArray(children) as ReactElement[];

	const [_selectedMenu, _setSelectedMenu] = useState(selectedMenu);

	const handleClickButton = (value: string) => {
		_setSelectedMenu(value);
	};

	useEffect(() => {
		if (_selectedMenu) onChangeMenu(_selectedMenu);
	}, [_selectedMenu]);

	useEffect(() => {
		if (selectedMenu !== _selectedMenu) {
			_setSelectedMenu(selectedMenu);
		}
	}, [selectedMenu]);

	return (
		<MenuBarContext.Provider
			value={{
				selectedMenu: _selectedMenu,
				handleClickButton,
				size: 'md',
				childrenWidth: '100%',
			}}
		>
			<div
				className={cn(
					'flex relative border-b border-solid border-gray300/20',
					className,
				)}
			>
				{childrenArr.map((child, index) => {
					return cloneElement(child, {
						key: index,
					});
				})}
				<div
					className="absolute rounded-full z-10 transition-left duration-300 h-0.5 bg-primary"
					style={{
						width: `calc(100% / ${childrenArr.length})`,
						left: `calc(100% / ${childrenArr.length} * ${childrenArr.findIndex(
							(child) => child.props.value === _selectedMenu,
						)})`,
						bottom: -1,
					}}
				/>
			</div>
		</MenuBarContext.Provider>
	);
};

MenuBar.Menu = forwardRef(
	(props: MenuProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const { buttonProps } = useButton(props);
		const { value, className, children, disabled } = props;
		const { selectedMenu, handleClickButton, size } =
			useContext(MenuBarContext);

		const isSelected = value === selectedMenu;

		const handleClickMenu = () => {
			if (disabled) return;
			handleClickButton(value);
		};

		return (
			<button
				ref={ref}
				{...buttonProps}
				className={cn(
					'flex justify-center items-center flex-1',
					'py-4 text-base font-medium cursor-pointer',
					disabled
						? 'text-gray-300 cursor-not-allowed'
						: isSelected
							? 'text-black'
							: 'text-gray200',
					className,
				)}
				onClick={handleClickMenu}
			>
				{children}
			</button>
		);
	},
);

MenuBar.displayName = 'MenuBar';
MenuBar.Menu.displayName = 'MenuBar.Menu';
