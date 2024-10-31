import { TabButton } from '@/components';

interface Props {
	isPublic: boolean;
	onFilterChange: (isPublic: boolean) => void;
}

export const DiaryFilter = ({ isPublic, onFilterChange }: Props) => {
	return (
		<div className="flex w-full">
			<TabButton active={isPublic} onClick={() => onFilterChange(true)}>
				공개
			</TabButton>
			<TabButton active={!isPublic} onClick={() => onFilterChange(false)}>
				비공개
			</TabButton>
		</div>
	);
};
