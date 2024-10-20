import {
	Button,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components';
import { useFlow } from '@/stackflow';
import { useDiaryStore } from '@/store';

const TYPE_TITLE = {
	write: '일기를 그만 쓸까요?',
	modify: '수정을 취소할까요?',
};

const TYPE_DESCRIPTION = {
	write: '지금까지 입력한 내용이 사라져요',
	modify: '일기 내용은 원래대로 돌아가요',
};

const NO_BUTTON_TEXT = '아니요';
const YES_BUTTON_TEXT = '네, 취소할래요';

type DiaryWriteCancelDialogProps = {
	popCount: number;
	type?: 'write' | 'modify';
};

export const DiaryCancelConfirmDialog = ({
	popCount = 1,
	type = 'write',
}: DiaryWriteCancelDialogProps) => {
	const { pop } = useFlow();
	const { resetAllDiaryState } = useDiaryStore();

	const handleCancelClick = () => {
		pop(popCount);

		if (type === 'write') {
			resetAllDiaryState();
		}
	};

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>{TYPE_TITLE[type]}</DialogTitle>
				<DialogDescription>{TYPE_DESCRIPTION[type]}</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<div className="flex w-full gap-[8px]">
					<DialogClose className="flex-1">
						<Button size="sm" variant="secondary">
							{NO_BUTTON_TEXT}
						</Button>
					</DialogClose>
					<DialogClose className="flex-1">
						<Button size="sm" onClick={handleCancelClick} variant="warn">
							{YES_BUTTON_TEXT}
						</Button>
					</DialogClose>
				</div>
			</DialogFooter>
		</DialogContent>
	);
};
