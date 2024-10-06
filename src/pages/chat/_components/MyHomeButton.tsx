import { MyHomeIcon } from '@/assets';
import { useFlow } from '@/stackflow';

export const MyHomeButton = ({ userId }: { userId: string }) => {
	const { push } = useFlow();

	return (
		<button
			onClick={() => {
				push('MyHomeMainPage', { src: userId, alt: 'image' });
			}}
		>
			<img src={MyHomeIcon} alt="my-home" width={24} height={24} />
		</button>
	);
};
