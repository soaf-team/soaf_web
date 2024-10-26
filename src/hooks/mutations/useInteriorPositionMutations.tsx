import { useGenericMutation } from './useGenericMutation';
import { useToast } from '../useToast';
import { Interior } from '@/types';

export interface PositionPayloadType {
	items: Omit<Interior, 'type' | '_id'>[];
}

export const useInteriorPositionMutations = () => {
	const { toast } = useToast();

	const updatePositionMutation = useGenericMutation<
		void,
		void,
		PositionPayloadType
	>('/room', 'PATCH', {
		onSuccess: () => {
			toast({
				title: '마이홈 꾸미기가 수정되었어요',
			});
		},
		// TODO: 에러 발생시 포지션 초기화
		onError: () => {
			toast({
				title: '마이홈 꾸미기에 실패했어요',
			});
		},
	});

	return { updatePositionMutation };
};
