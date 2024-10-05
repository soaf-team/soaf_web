import { WarningIcon } from '@/assets';
import { Button } from '../ui';
import { RenderFallbackProps } from './ErrorBoundary';

type ErrorFallbackProps = {
	variant: 'network' | 'unknown';
} & RenderFallbackProps;

export const ErrorFallback = ({
	error,
	reset,
	variant,
}: ErrorFallbackProps) => {
	console.error(error);

	return (
		<div className="flex-1 flex flex-col items-center">
			<div className="flex-1 flex flex-col items-center justify-center gap-[8px]">
				<img src={WarningIcon} alt="warning" />
				<h2 className="head3 text-[#121212]">{TYPE_VARIANTS[variant].title}</h2>
				<p className="text-[16px] font-medium text-gray300 text-center whitespace-pre-line leading-[24px]">
					{`${TYPE_VARIANTS[variant].description}`}
				</p>
			</div>
			<Button onClick={reset} className="mb-[60px]">
				{TYPE_VARIANTS[variant].button}
			</Button>
		</div>
	);
};

const TYPE_VARIANTS = {
	network: {
		title: '현재 연결이 불안해요',
		description:
			'네트워크 연결상태가 좋지 않습니다.\n일시적인 현상이니 잠시 후 다시 시도해 주세요. ',
		button: '홈으로 가기',
	},
	unknown: {
		title: '시스템 오류가 발생했어요',
		description:
			'예상치 못한 에러가 발생했습니다.\n해결중이니 조금만 기다려주세요. ',
		button: '다음에 접속하기',
	},
};
