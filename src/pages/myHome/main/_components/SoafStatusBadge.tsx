import { ButtonHTMLAttributes, useState } from 'react';
import dayjs from 'dayjs';
import { cn } from '@/utils';
import { useToast, useSoafRequestMutations } from '@/hooks';
import { overlay } from '@/libs';
import { SoafRequestDialogOverlay } from './SoafRequestDialogOverlay';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	status: 'soaf' | 'rejected' | 'pending' | 'normal';
	date?: string;
	receiverId: string;
}

const getStatusMessage = (status: Props['status'], date?: string) => {
	switch (status) {
		case 'soaf':
			return '소울프렌드';
		case 'rejected':
			return `D-${dayjs(date).diff(dayjs(), 'day')}`;
		case 'pending':
			return '소프 대기';
		default:
			return '소프 신청';
	}
};

export const SoafStatusBadge = ({
	status,
	date,
	receiverId,
	className,
	...rest
}: Props) => {
	const { toast } = useToast();
	const { createSoafRequestMutation } = useSoafRequestMutations();
	const [text, setText] = useState(''); // TODO: 소프 신청하는 로직은 분리하는게 좋겠다

	const handleTextChange = (value: string) => {
		setText(value);
	};

	const openRequestModal = async () => {
		await overlay.open(
			<SoafRequestDialogOverlay
				overlayKey="soaf-request"
				header={{ title: '소프 신청 메세지 작성' }}
				text={text}
				onTextChange={handleTextChange}
				leftButton={{
					text: '다음에 보낼래요',
				}}
				rightButton={{
					text: '메시지 전송',
				}}
				resolve={(text) => {
					createSoafRequestMutation.mutate({
						payload: {
							receiverId,
							message: text as string,
						},
					});
				}}
			/>,
		);
	};

	const handleButtonClick = () => {
		switch (status) {
			case 'soaf':
				toast({
					title: '두 분의 소중한 인연을 응원합니다',
				});
				break;
			case 'pending':
				toast({
					title: '상대방이 소프 신청을 확인하는 중입니다',
				});
				break;
			case 'rejected':
				toast({
					title: '소프 재신청은 일주일이 지나야 가능합니다',
				});
				break;
			default:
				openRequestModal();
		}
	};

	return (
		<button
			{...rest}
			onClick={handleButtonClick}
			className={cn([
				'h-9 px-4 py-2 flex items-center justify-center text-label3 border border-black rounded-[16px]',
				className,
			])}
		>
			{getStatusMessage(status)}
		</button>
	);
};
