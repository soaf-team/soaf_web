import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/utils';
import { XButton } from '@/components';

const gridClass = (length: number) => {
	switch (length) {
		case 1:
			return 'grid-cols-1 max-h-[194px]';
		case 2:
			return 'grid-cols-2 gap-[2px] max-h-[128px]';
		case 3:
			return 'grid-cols-2 grid-rows-2 gap-[2px] max-h-[85px]';
		case 4:
			return 'grid-cols-2 grid-rows-2 gap-[2px] max-h-[258px]';
		default:
			return 'grid-cols-3';
	}
};

const sliderVariants = {
	center: { x: 0, opacity: 1 },
	exit: (direction: number) => ({
		x: direction < 0 ? '100%' : '-100%',
		opacity: 0,
	}),
};

const sliderTransition = {
	x: { type: 'spring', stiffness: 300, damping: 30 },
	opacity: { duration: 0.2 },
};

export const ImageGrid = ({ images }: { images: string[] }) => {
	const [currentImage, setCurrentImage] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const dragEndHandler = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		const threshold = 50;
		if (info.offset.x < -threshold && currentImage < images.length - 1) {
			setDirection(1);
			setCurrentImage(currentImage + 1);
		} else if (info.offset.x > threshold && currentImage > 0) {
			setDirection(-1);
			setCurrentImage(currentImage - 1);
		}
	};

	return (
		<div
			className={cn(
				'grid max-w-[260px] rounded-[16px] overflow-hidden',
				gridClass(images.length),
			)}
		>
			{images.map((image, index) => (
				<ImageWithPlaceholder
					key={`${image}-${index}`}
					src={image}
					alt={`Image ${index + 1}`}
					className={cn(
						'w-full h-full object-cover rounded-[4px] cursor-pointer',
						images.length === 3 && index === 0 ? 'col-span-2' : '',
					)}
					onClick={() => {
						setCurrentImage(index);
						setIsFullscreen(true);
					}}
				/>
			))}
			<AnimatePresence initial={false} custom={direction}>
				{isFullscreen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cn(
							'fixed z-[9999] top-0 bottom-0 left-0 right-0',
							'flex flex-col',
							'bg-white',
						)}
					>
						<div
							className={cn(
								'flex justify-between items-center relative',
								'py-[14px] px-[18px] w-full h-[52px]',
							)}
						>
							<div className="flex-1" />
							<p
								className={cn(
									'absolute left-1/2 transform -translate-x-1/2',
									'font-bold',
								)}
							>
								{currentImage + 1}/{images.length}
							</p>
							<XButton
								className="flex-none z-[9999]"
								onClick={() => setIsFullscreen(false)}
							/>
						</div>
						<motion.div
							className={cn(
								'flex-1 flex justify-center items-center',
								'w-full',
								'bg-white',
								'overflow-hidden',
							)}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={dragEndHandler}
						>
							<AnimatePresence initial={false} custom={direction}>
								<motion.img
									key={currentImage}
									src={images[currentImage]}
									custom={direction}
									variants={sliderVariants}
									initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
									animate="center"
									exit="exit"
									transition={sliderTransition}
									drag="x"
									dragConstraints={{ left: 0, right: 0 }}
									dragElastic={1}
									onDragEnd={dragEndHandler}
									className="w-full h-full object-contain absolute"
								/>
							</AnimatePresence>
						</motion.div>
						<motion.div className="h-[52px]" />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const ImagePlaceholder = () => (
	<div className="w-full h-[700px] bg-gray-200 animate-pulse rounded-[4px]" />
);

const ImageWithPlaceholder = ({
	src,
	alt,
	className,
	onClick,
}: {
	src: string;
	alt: string;
	className?: string;
	onClick?: () => void;
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setIsLoaded(true);
	}, [src]);

	return (
		<div className="w-full h-full">
			{!isLoaded && <ImagePlaceholder />}
			<img className={className} src={src} alt={alt} onClick={onClick} />
		</div>
	);
};
