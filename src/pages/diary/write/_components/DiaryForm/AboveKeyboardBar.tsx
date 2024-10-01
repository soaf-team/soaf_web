import { useEffect, useRef } from 'react';
import { DiaryFormType, useDiaryStore } from '@/store';
import { useKeyboardHeight } from '@/hooks';
import { Lock, Photo, UnLock } from '@/assets';
import { convertToBase64 } from '@/utils';

type AboveKeyboardBarProps = {
	diary: DiaryFormType;
	handleAddPhoto: (photos: string[]) => void;
	handleSaveDiary: () => void;
	handleTogglePublic: () => void;
	handleKeepKeyboard: () => void;
};

export const AboveKeyboardBar = ({
	diary,
	handleSaveDiary,
	handleTogglePublic,
	handleKeepKeyboard,
}: AboveKeyboardBarProps) => {
	const photoInputRef = useRef<HTMLInputElement>(null);
	const { isOnKeyboard } = useKeyboardHeight();
	const { onChangePhotos } = useDiaryStore();

	const handleAddPhotoButtonClick = () => {
		photoInputRef.current?.click();
	};

	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const img = event.target.files[0];

			try {
				const base64Image = await convertToBase64(img);
				onChangePhotos([...diary.photos, base64Image]);
			} catch (error) {
				console.error('Error converting image to Base64:', error);
			}
		}
	};

	const handleTogglePrivateButtonClick = () => {
		if (isOnKeyboard) {
			handleKeepKeyboard();
		}
		handleTogglePublic();
	};

	useEffect(() => {
		const mainEl = document.querySelector('main')!;

		if (isOnKeyboard) {
			mainEl.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
		} else {
			mainEl.style.overflow = 'auto';
			document.body.style.overflow = 'auto';
		}

		return () => {
			mainEl.style.overflow = 'auto';
			document.body.style.overflow = 'auto';
		};
	}, [isOnKeyboard]);

	return (
		<div
			className="flex justify-start fixed left-0 right-0 bottom-0 w-full border-t border-solid border-gray100 px-[18px] bg-white"
			style={{
				height: isOnKeyboard ? '39px' : '73px',
			}}
		>
			<div className="flex justify-between h-[39px] w-full">
				<div className="flex items-center gap-[16px]">
					<div>
						<input
							ref={photoInputRef}
							type="file"
							accept="image/*"
							onChange={onImageChange}
							hidden
						/>
						<img src={Photo} alt="photo" onClick={handleAddPhotoButtonClick} />
					</div>
					<img
						src={diary.isPublic ? UnLock : Lock}
						alt="emoji"
						onClick={handleTogglePrivateButtonClick}
					/>
				</div>
				<div className="flex items-center gap-[16px]">
					<span>
						<span
							style={{
								color: diary.content.length < 2000 ? '#8a91a8' : '#ff3c3c',
							}}
						>
							{diary.content.length}
						</span>
						/2000
					</span>
					<button className="head6sb" onClick={handleSaveDiary}>
						저장
					</button>
				</div>
			</div>
		</div>
	);
};
