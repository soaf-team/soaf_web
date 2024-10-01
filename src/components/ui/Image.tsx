import { useFlow } from '@/stackflow';

type ImageProps = {
	src: string;
	alt: string;
} & Omit<React.HTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const Image = ({ src, ...props }: ImageProps) => {
	const { push } = useFlow();

	const handleClickImage = () => {
		push('ImageDetailPage', { src: src, alt: 'image' });
	};

	return <img onClick={handleClickImage} {...props} src={src} />;
};
