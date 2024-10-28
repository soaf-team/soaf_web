import { useFlow } from '@/stackflow';

const NOTION_PAGES = {
	notice: 'https://sapienslee.notion.site/10a4c268586a80a79cb1c7877ea69cfe',
	terms: 'https://sapienslee.notion.site/728784b805874b5089b2670fb53af64e',
	policy: 'https://sapienslee.notion.site/3a63247a23714df5ade533a1ca7fba7b',
};

const openInNewTab = (url: string) => {
	window.open(url, '_blank', 'noopener,noreferrer');
};

export const useSettingMenuItems = () => {
	const { push } = useFlow();

	const MENU_ITEMS1 = [
		{ label: '공지사항', onClick: () => openInNewTab(NOTION_PAGES.notice) },
		{ label: '문의하기', onClick: () => push('InquiryPage', {}) },
		{ label: '차단친구 관리', onClick: () => push('BlockedPage', {}) },
		{ label: '계정관리', onClick: () => push('AccountPage', {}) },
	];

	const MENU_ITEMS2 = [
		{
			label: '서비스 이용약관',
			onClick: () => openInNewTab(NOTION_PAGES.terms),
		},
		{
			label: '개인정보 처리방침',
			onClick: () => openInNewTab(NOTION_PAGES.policy),
		},
		{ label: '오픈소스 라이선스', onClick: () => {} },
		{ label: '사용된 API', onClick: () => push('UsedApisPage', {}) },
	];

	return { MENU_ITEMS1, MENU_ITEMS2 };
};
