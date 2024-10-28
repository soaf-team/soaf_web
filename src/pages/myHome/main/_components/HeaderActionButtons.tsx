import { useFlow } from '@/stackflow';
import { BellIcon, BrushIcon, SettingIcon } from '@/assets';

interface Props {
	onBrushClick?: () => void;
}

export const HeaderActionButtons = ({ onBrushClick }: Props) => {
	const { push } = useFlow();

	const handleButtonClick = (type: 'bell' | 'setting') => {
		switch (type) {
			case 'bell':
				push('NotificationPage', {});
				break;
			case 'setting':
				push('SettingPage', {});
				break;
		}
	};

	return (
		<div className="flex gap-[14px]">
			<button className="w-[24px] h-[24px]" onClick={onBrushClick}>
				<img src={BrushIcon} alt="brush-icon" className="full_img_cover" />
			</button>
			<button
				className="w-[24px] h-[24px]"
				onClick={() => handleButtonClick('bell')}
			>
				<img src={BellIcon} alt="brush-icon" className="full_img_cover" />
			</button>
			<button
				className="w-[24px] h-[24px]"
				onClick={() => handleButtonClick('setting')}
			>
				<img src={SettingIcon} alt="brush-icon" className="full_img_cover" />
			</button>
		</div>
	);
};
