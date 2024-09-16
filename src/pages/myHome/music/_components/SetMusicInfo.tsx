import { useMusicDetailQuery } from '@/hooks';
import { MusicItem } from './MusicItem';
import { BackButton, Header } from '@/components';
import { ReviewSection } from '../../_components/ReviewSection';

interface Props {
	onPrevStep: () => void;
	music: Record<string, string>;
}

export const SetMusicInfo = ({ onPrevStep, music }: Props) => {
	const { musicInfo } = useMusicDetailQuery({
		name: music.name,
		artist: music.artist,
	});

	if (!musicInfo) return null;

	return (
		<>
			<Header
				leftSlot={<BackButton onClick={onPrevStep} />}
				rightSlot={
					<button type="submit" className="label2">
						저장
					</button>
				}
			>
				<h1 className="head6b">나의 음악</h1>
			</Header>

			<div className="flex flex-col gap-[32px] pt-[58px]">
				<MusicItem type="detail" music={musicInfo} />

				<ReviewSection
					title="감상평"
					placeholder="음악 감상 후 어떤 생각이 드셨나요?"
					className="h-[20px]"
				/>
			</div>
		</>
	);
};
