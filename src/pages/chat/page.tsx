import { useState } from 'react';

import { PageLayout } from '@/components';
import { ChatList, MenuBar, SoafList } from './_components';

const ChatMainPage = () => {
	const [selectedMenu, setSelectedMenu] = useState<'소프 목록' | '친구 목록'>(
		'소프 목록',
	);

	return (
		<PageLayout className="px-0">
			<article className="px-[18px]">
				<MenuBar
					selectedMenu={selectedMenu}
					onChangeMenu={(menu) => {
						setSelectedMenu(menu as '소프 목록' | '친구 목록');
					}}
				/>
			</article>
			{selectedMenu === '소프 목록' ? <SoafList /> : <ChatList />}
		</PageLayout>
	);
};

export default ChatMainPage;

ChatMainPage.displayName = 'ChatMainPage';
