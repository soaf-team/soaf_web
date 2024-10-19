import { axiosBase } from '@/apis';
import {
	useMutation,
	UseMutationResult,
	MutationFunction,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

const MIN_LOADING_TIME = 500;

interface ApiResponse<T> {
	data: T;
	message: string;
}

interface MutationOptions<TData, TVariables, TContext = unknown> {
	onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
	onSuccess?: (data: ApiResponse<TData>) => void;
	onError?: (error: AxiosError) => void;
	onSettled?: (
		data: ApiResponse<TData> | undefined,
		error: AxiosError | null,
		variables: TVariables,
		context: TContext | undefined,
	) => void | Promise<unknown>;
	minLoadingTime?: number;
}

type UrlFunction<TVariables> = (variables: TVariables) => string;

/**
 * 제네릭 뮤테이션 훅
 * @param urlOrFunction API 엔드포인트 URL 또는 URL을 생성하는 함수
 * @param method HTTP 메서드
 * @param options 뮤테이션 옵션
 * @returns UseMutationResult와 isLoading
 */
export function useGenericMutation<TData, TVariables>(
	urlOrFunction: string | UrlFunction<TVariables>,
	method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
	options?: MutationOptions<TData, TVariables>,
): UseMutationResult<ApiResponse<TData>, AxiosError, TVariables> & {
	isLoading: boolean;
} {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const minLoadingTime = options?.minLoadingTime || MIN_LOADING_TIME;

	const mutationFn: MutationFunction<ApiResponse<TData>, TVariables> = async (
		variables,
	) => {
		const startTime = Date.now();
		const url =
			typeof urlOrFunction === 'function'
				? urlOrFunction(variables)
				: urlOrFunction;
		const response = await axiosBase({
			method,
			url,
			data: variables,
		});
		const elapsedTime = Date.now() - startTime;
		if (elapsedTime < minLoadingTime) {
			await new Promise((resolve) =>
				setTimeout(resolve, minLoadingTime - elapsedTime),
			);
		}
		return response.data;
	};

	const mutation = useMutation<ApiResponse<TData>, AxiosError, TVariables>({
		mutationFn,
		onMutate: options?.onMutate,
		onSuccess: options?.onSuccess,
		onError: options?.onError,
		onSettled: options?.onSettled,
	});

	useEffect(() => {
		if (mutation.isPending) {
			setIsLoading(true);
		} else {
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, minLoadingTime);
			return () => clearTimeout(timer);
		}
	}, [mutation.isPending, minLoadingTime]);

	return { ...mutation, isLoading };
}
