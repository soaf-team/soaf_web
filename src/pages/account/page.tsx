import { useUserProfileQuery, userMutations } from '@/hooks';
import {
	BackButton,
	CancelConfirmDialog,
	Divider,
	PageLayout,
} from '@/components';
import { overlay } from '@/libs';
import { sendMessageToApp } from '@/utils';

const getSNSAccount = (sns: string) => {
	if (sns === 'kakao') return '카카오 계정';
	if (sns === 'naver') return '네이버 계정';
	if (sns === 'apple') return '애플 계정';
	if (sns === 'google') return '구글 계정';
	return '';
};

const AccountPage = () => {
	const { userProfile } = useUserProfileQuery();
	const { logoutUserMutation, deleteUserMutation } = userMutations({
		onSuccess: () => {},
	});

	const handleLogout = async () => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="login-confirm"
				title="로그아웃 하시겠어요?"
				cancelButtonText="아니요"
				confirmButtonText="네, 로그아웃할래요"
				resolve={() => {
					sendMessageToApp({
						type: 'LOGOUT',
					});
					logoutUserMutation.mutate({});
				}}
			/>,
		);
	};

	const handleWithdrawal = async () => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="withdrawal-confirm"
				title="서비스를 탈퇴하시겠어요?"
				description={
					<>
						<span>탈퇴 시 작성하신 일기와, 취향, 채팅 내용이</span>
						<br />
						<span>모두 삭제되며 복구가 불가능해요.</span>
					</>
				}
				cancelButtonText="아니요"
				confirmButtonText="네, 탈퇴할래요"
				resolve={() => {
					sendMessageToApp({
						type: 'LOGOUT',
					});
					deleteUserMutation.mutate({});
				}}
			/>,
		);
	};

	return (
		<PageLayout
			header={{
				title: <h2 className="head6b">계정관리</h2>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div className="flex flex-col mt-[34px]">
				<div className="flex items-center justify-between w-full py-4">
					<span className="label2">{getSNSAccount(userProfile.sns)}</span>
					<button onClick={handleLogout} className="label3 text-gray400">
						로그아웃
					</button>
				</div>

				<Divider className="bg-gray50" />

				<div className="flex items-center justify-between w-full py-4">
					<span className="label3 text-gray200">
						회원정보를 삭제하시겠어요?
					</span>
					<button onClick={handleWithdrawal} className="label3 text-gray400">
						서비스 탈퇴
					</button>
				</div>
			</div>
		</PageLayout>
	);
};

export default AccountPage;
AccountPage.displayName = 'AccountPage';
