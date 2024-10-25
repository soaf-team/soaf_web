import none from '@/assets/icons/shared/none-diary.svg';

type NonDataFallbackProps = {
	children: React.ReactNode;
};

export const NonDataFallback = ({ children }: NonDataFallbackProps) => {
	return (
		<div className="flex flex-col items-center justify-center gap-[12px]">
			<div className="w-[52px] h-[52px]">
				<img
					src={none}
					alt="none-diary"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="flex flex-col items-center justify-center body2">
				{children}
			</div>
		</div>
	);
};
