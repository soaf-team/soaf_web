import soaf from '@/assets/icons/my-home/soaf1.svg';

export const Soaf = ({ className }: { className: string }) => {
	return (
		<div className={className}>
			<img src={soaf} alt="plant" className="full_img_contain" />
		</div>
	);
};
