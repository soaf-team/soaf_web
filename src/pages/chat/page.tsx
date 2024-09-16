import React from 'react';

import { PageLayout } from '@/components';
import { MenuBar, SoafList } from './_components';

const ChatMainPage = () => {
	return (
		<PageLayout className="px-0">
			<article className="px-[18px]">
				<MenuBar selectedMenu="소프 목록" onChangeMenu={() => {}} />
			</article>
			<SoafList />
		</PageLayout>
	);
};

export default ChatMainPage;

ChatMainPage.displayName = 'ChatMainPage';
