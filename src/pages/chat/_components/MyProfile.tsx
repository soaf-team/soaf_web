import { cn } from '@/utils';
import { User } from '@/types';
import { Plus } from '@/assets';

interface MyProfileProps {
	userProfile: User;
	handleStatusMessageChange: () => void;
}

export const MyProfile = ({
	userProfile,
	handleStatusMessageChange,
}: MyProfileProps) => {
	return (
		<article className="flex flex-col pt-5 pb-4 px-[18px]">
			<div className="flex justify-between items-center px-2">
				<div className="flex flex-col gap-1">
					<p>뽀송하루</p>
					<p className="text-xs text-gray300 font-medium">
						{userProfile?.status}
					</p>
				</div>
				<div
					className={cn(
						'flex items-center gap-1',
						'py-1 px-2 w-fit',
						'rounded-[16px] border border-solid border-gray100 text-gray400 text-xs cursor-pointer',
					)}
					onClick={handleStatusMessageChange}
				>
					상태메시지{' '}
					<img
						src={Plus}
						alt="plus"
						width={10}
						height={10}
						style={{
							filter:
								'invert(48%) sepia(13%) saturate(606%) hue-rotate(182deg) brightness(94%) contrast(86%)',
						}}
					/>
				</div>
			</div>
		</article>
	);
};
