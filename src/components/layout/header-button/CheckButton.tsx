import { BlackCheckIcon } from '@/assets';

export const CheckButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button className="w-[24px] h-[24px]" onClick={onClick}>
			<img src={BlackCheckIcon} alt="check-icon" className="full_img_cover" />
		</button>
	);
};
