import { MyHomeIcon } from '@/assets';
import { useFlow } from '@/stackflow';

export const MyHomeButton = ({
	userId,
	userName,
}: {
	userId: string;
	userName: string;
}) => {
	const { push } = useFlow();

	return (
		<button
			onClick={() => {
				push('MyHomeMainPage', { userId, userName });
			}}
		>
			<img src={MyHomeIcon} alt="my-home" width={24} height={24} />
		</button>
	);
};
