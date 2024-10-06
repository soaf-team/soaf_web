import { axiosBase } from '@/apis';
import {
	useMutation,
	UseMutationResult,
	MutationFunction,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

const MIN_LOADING_TIME = 500;

interface ApiResponse<TData> {
	data: TData;
	message: string;
}

type UrlFunction<TParams> = (params?: TParams) => string;

interface MutationOptions<
	TData,
	TVariables,
	TParams = void,
	TContext = unknown,
> {
	onMutate?: (
		variables: TVariables,
		params?: TParams,
	) => Promise<TContext> | TContext;
	onSuccess?: (
		data: ApiResponse<TData>,
		variables: TVariables,
		context: TContext | undefined,
		params?: TParams,
	) => void;
	onError?: (
		error: AxiosError,
		variables: TVariables,
		context: TContext | undefined,
		params?: TParams,
	) => void;
	onSettled?: (
		data: ApiResponse<TData> | undefined,
		error: AxiosError | null,
		variables: TVariables,
		context: TContext | undefined,
		params?: TParams,
	) => void | Promise<unknown>;
	minLoadingTime?: number;
}

/**
 * 향상된 제네릭 뮤테이션 훅
 * URL string 또는 URL 생성 함수를 모두 지원합니다.
 * @param urlOrFunction API 엔드포인트 URL 또는 URL을 생성하는 함수
 * @param method HTTP 메서드
 * @param options 뮤테이션 옵션
 * @returns UseMutationResult와 isLoading
 */
export function useGenericMutation<
	TData,
	TVariables,
	TParams = void,
	TContext = unknown,
>(
	urlOrFunction: string | UrlFunction<TParams>,
	method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
	options?: MutationOptions<TData, TVariables, TParams, TContext>,
): UseMutationResult<
	ApiResponse<TData>,
	AxiosError,
	{ variables: TVariables; params?: TParams },
	TContext
> & {
	isLoading: boolean;
} {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const minLoadingTime = options?.minLoadingTime || MIN_LOADING_TIME;

	const mutationFn: MutationFunction<
		ApiResponse<TData>,
		{ variables: TVariables; params?: TParams }
	> = async ({ variables, params }) => {
		const startTime = Date.now();
		const url =
			typeof urlOrFunction === 'function'
				? urlOrFunction(params)
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

	const mutation = useMutation<
		ApiResponse<TData>,
		AxiosError,
		{ variables: TVariables; params?: TParams },
		TContext
	>({
		mutationFn,
		onMutate: async ({ variables, params }) =>
			options?.onMutate ? options.onMutate(variables, params) : undefined,
		onSuccess: (data, { variables, params }, context) =>
			options?.onSuccess?.(data, variables, context, params),
		onError: (error, { variables, params }, context) =>
			options?.onError?.(error, variables, context, params),
		onSettled: (data, error, { variables, params }, context) =>
			options?.onSettled?.(data, error, variables, context, params),
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
