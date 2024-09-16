import { MenuBar as _MenuBar } from '@/components';

export const MENU = ['소프 목록', '채팅 목록'];

type MenuBarProps = {
	selectedMenu: string;
	onChangeMenu: (menu: string) => void;
};

export const MenuBar = ({ selectedMenu, onChangeMenu }: MenuBarProps) => {
	return (
		<_MenuBar selectedMenu={selectedMenu} onChangeMenu={onChangeMenu}>
			{MENU.map((item, index) => (
				<_MenuBar.Menu key={index} value={item}>
					{item}
				</_MenuBar.Menu>
			))}
		</_MenuBar>
	);
};
