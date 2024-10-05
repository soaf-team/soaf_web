import { GenericForm } from '@/components';
import { useFunnel } from '@/hooks';
import { useState } from 'react';
import { SearchMusicList } from './SearchMusicList';
import { SetMusicInfo } from './SetMusicInfo';

const STEP = ['음악 검색', '음악 등록'] as const;

export const RegisterMusicForm = () => {
	const [music, setMusic] = useState<Record<string, string>>({
		name: '',
		artist: '',
		imageUrl: '',
	});

	const { Funnel, Step, setStep } = useFunnel(STEP[0]);

	const handleNextStep = () => {
		setStep(STEP[1]);
	};

	const handlePrevStep = () => {
		setStep(STEP[0]);
	};

	return (
		<GenericForm formOptions={{ mode: 'onSubmit' }}>
			<Funnel>
				<Step name={STEP[0]}>
					<SearchMusicList onNextStep={handleNextStep} setMusic={setMusic} />
				</Step>
				<Step name={STEP[1]}>
					<SetMusicInfo onPrevStep={handlePrevStep} music={music} />
				</Step>
			</Funnel>
		</GenericForm>
	);
};
