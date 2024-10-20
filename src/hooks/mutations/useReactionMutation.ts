import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { DiaryType, ReactionKeyType } from '@/types';
import { QUERY_KEY } from '@/constants';
import { useUserProfileQuery } from '../queries';

export type ReactionPayloadType = {
	reactionType: ReactionKeyType;
};

export const useReactionMutation = () => {
	const queryClient = useQueryClient();
	const { userProfile } = useUserProfileQuery();

	const toggleReactionMutation = useGenericMutation<
		void,
		{
			diaryId: string;
		},
		ReactionPayloadType
	>((params) => `/diary/reaction/${params?.diaryId}`, 'POST', {
		onMutate: (params, payload) => {
			queryClient.setQueryData(
				[QUERY_KEY.diaryDetail, params?.diaryId],
				(data: DiaryType) => {
					const isReacted = data.reactions[
						payload?.reactionType as string
					].includes(userProfile.id);

					if (isReacted) {
						const filteredReactions = data.reactions[
							payload?.reactionType as string
						].filter((id) => id !== userProfile.id);

						return {
							...data,
							reactions: {
								...data.reactions,
								[payload?.reactionType as string]: filteredReactions,
							},
						};
					} else {
						return {
							...data,
							reactions: {
								...data.reactions,
								[payload?.reactionType as string]: [
									...data.reactions[payload?.reactionType as string],
									userProfile.id,
								],
							},
						};
					}
				},
			);
		},
		onSuccess: (_, params) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.diaryDetail, params?.diaryId],
			});
		},
	});

	return { toggleReactionMutation };
};
