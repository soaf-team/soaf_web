import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { userMutations, useToast } from '@/hooks';
import { useState } from 'react';
import { PencilIcon } from '@/assets';
import { Input } from '@/components';
import { cn } from '@/utils';

interface Props {
	userName: string;
}

export const UserNameSection = ({ userName }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [isEdit, setIsEdit] = useState(false);
	const [value, setValue] = useState(userName);

	const { patchUserMutation } = userMutations({
		onSuccess: () => {
			setIsEdit(false);
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.userProfile],
			});
			toast({
				title: '닉네임이 변경이 완료되었어요',
			});
		},
	});

	const handleChangeUserName = () => {
		patchUserMutation.mutate({
			payload: {
				name: value,
			},
		});
	};

	return (
		<div className={cn('flex flex-col mt-[18px]', !isEdit && 'pb-[34px]')}>
			<p className="label3 text-gray300">닉네임</p>

			<form
				className="flex items-center"
				onSubmit={(e) => {
					e.preventDefault();
					if (isEdit) {
						handleChangeUserName();
					}
				}}
			>
				<Input
					variant={isEdit ? 'underline' : 'ghost'}
					value={value}
					onChange={(value) => setValue(value)}
					className="h-0 px-0 mt-2 label2"
					maxLength={10}
					placeholder="사용할 닉네임을 적어주세요"
					readOnly={!isEdit}
					isResetButton={isEdit}
				/>

				{!isEdit && (
					<button type="button" onClick={() => setIsEdit((prev) => !prev)}>
						<img src={PencilIcon} width={20} height={20} alt="edit" />
					</button>
				)}
			</form>

			{isEdit && (
				<div className="flex justify-end my-1 label3 text-gray300">
					{value.length}/<span className="text-black">10</span>
				</div>
			)}
		</div>
	);
};
