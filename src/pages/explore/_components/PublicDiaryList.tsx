import { NonDataFallback } from '@/components';
import {
	DiaryCard,
	DiaryCardSkeleton,
} from '@/pages/diary/_components/DiaryCard';
import { DiaryType } from '@/types';

const NO_DIARY_DESCRIPTION =
	'아직 작성된 일기가 없어요.\n일기를 먼저 작성해야 탐색이 가능해요.';
const NO_PUBLIC_DIARY_DESCRIPTION =
	'아직 공개된 일기가 없어요\n공개된 일기가 1개 이상일 때 탐색이 가능해요';
const ERROR_DESCRIPTION =
	'일기를 불러오는 데 문제가 생겼어요.\n잠시 후 다시 시도해주세요.';

type DescriptionState = 'error' | 'noData' | 'noPublicData';

type PublicDiaryListProps = {
	publicDiaryList: (Omit<DiaryType, 'isPublic'> & { isPublic: true })[];
	selectedId: string;
	handleDiarySelect: (index: number) => void;
	isNoAnyDiary: boolean;
	isLoading: boolean;
	isError: boolean;
};

export const PublicDiaryList = ({
	publicDiaryList,
	selectedId,
	handleDiarySelect,
	isNoAnyDiary,
	isLoading,
	isError,
}: PublicDiaryListProps) => {
	const descriptionState: DescriptionState = isError
		? 'error'
		: isNoAnyDiary
			? 'noData'
			: 'noPublicData';

	if (!isLoading && publicDiaryList.length === 0) {
		return (
			<div className="w-full flex-1">
				<NonDataFallback>
					<p className="whitespace-pre-line text-center">
						{STATE_DESCRIPTION[descriptionState]}
					</p>
				</NonDataFallback>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 items-center gap-[12px] mt-[24px] w-full px-[2px]">
			{isLoading
				? Array.from({ length: 5 }).map((_, index) => (
						<DiaryCardSkeleton key={index} isCheckable shadow />
					))
				: publicDiaryList.map((diary: DiaryType, index: number) => {
						return (
							<DiaryCard
								key={diary.id}
								diary={diary}
								isCheckable
								isSelected={selectedId === diary.id}
								onClick={() => handleDiarySelect(index)}
								className={
									index === publicDiaryList.length - 1 ? 'mb-[100px]' : ''
								}
								shadow
							/>
						);
					})}
		</div>
	);
};

export const STATE_DESCRIPTION: Record<DescriptionState, string> = {
	error: ERROR_DESCRIPTION,
	noData: NO_DIARY_DESCRIPTION,
	noPublicData: NO_PUBLIC_DIARY_DESCRIPTION,
};
