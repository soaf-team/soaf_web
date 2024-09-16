import { createContext } from 'react';

export type MenuBarContextType = {
	selectedMenu: string | null;
	handleClickButton: (value: string) => void;
	size: 'md';
	childrenWidth: string;
};

export const MenuBarContext = createContext<MenuBarContextType>({
	selectedMenu: null,
	handleClickButton: () => {},
	size: 'md',
	childrenWidth: '100%',
});
