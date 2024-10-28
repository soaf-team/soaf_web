interface Props {
	onUnblock: () => void;
	userName: string;
}

export const BlockedUserItem = ({ onUnblock, userName }: Props) => {
	return (
		<div className="flex items-center justify-between px-2 py-3">
			<span className="text-black">{userName}</span>

			<button
				onClick={onUnblock}
				className="body4 text-gray400 flex items-center justify-center border border-gray100 rounded-[16px] px-2 py-1"
			>
				차단해제
			</button>
		</div>
	);
};
