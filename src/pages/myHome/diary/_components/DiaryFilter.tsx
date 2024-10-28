import { TabButton } from '@/components';

interface Props {
	isPrivate: boolean;
	onFilterChange: (isPrivate: boolean) => void;
}

export const DiaryFilter = ({ isPrivate, onFilterChange }: Props) => {
	return (
		<div className="flex w-full">
			<TabButton active={!isPrivate} onClick={() => onFilterChange(false)}>
				공개
			</TabButton>
			<TabButton active={isPrivate} onClick={() => onFilterChange(true)}>
				비공개
			</TabButton>
		</div>
	);
};
