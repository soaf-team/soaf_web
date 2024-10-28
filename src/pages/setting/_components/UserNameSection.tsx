import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { userMutations, useToast } from '@/hooks';
import { useState } from 'react';
import { PencilIcon, WarningRedIcon } from '@/assets';
import { Input } from '@/components';
import { cn } from '@/utils';

interface Props {
	userName: string;
}

export const UserNameSection = ({ userName }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const [error, setError] = useState<string | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const [value, setValue] = useState(userName);

	const { patchUserMutation, validateUserNameMutation } = userMutations({
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

	const checkUserName = async () => {
		try {
			const result = await validateUserNameMutation.mutateAsync({
				params: {
					name: value,
				},
			});

			const isAvailable = result.data;

			if (!isAvailable) {
				setError(null);
				return true;
			} else {
				setError('중복되지 않은 닉네임으로 설정해주세요');
				return false;
			}
		} catch (error) {
			setError('닉네임 검증 중 오류가 발생했어요');
			return false;
		}
	};

	const handleChangeUserName = async () => {
		if (!value.trim()) {
			setError('사용할 닉네임을 적어주세요');
			return;
		}

		const isAvailable = await checkUserName();

		if (isAvailable) {
			patchUserMutation.mutate({
				payload: {
					name: value,
				},
			});
		}
	};

	return (
		<div className={cn('flex flex-col mt-[18px]', !isEdit && 'pb-[6px]')}>
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
					className={cn('px-0 label2')}
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
				<div className="flex items-center justify-between w-full my-2">
					{!error && <div />}

					{isEdit && error && (
						<div className="flex items-center gap-1 label4 text-warn">
							<img src={WarningRedIcon} width={16} height={16} alt="warning" />
							{error}
						</div>
					)}

					{isEdit && (
						<div className="flex justify-end label3 text-gray300">
							{value.length}/<span className="text-black">10</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
