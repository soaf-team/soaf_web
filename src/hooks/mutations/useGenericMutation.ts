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

interface MutationOptions<TData, TParams, TPayload, TContext = unknown> {
	onMutate?: (
		params?: TParams,
		payload?: TPayload,
	) => Promise<TContext> | TContext;
	onSuccess?: (
		data: ApiResponse<TData>,
		params?: TParams,
		payload?: TPayload,
		context?: TContext,
	) => void;
	onError?: (
		error: AxiosError,
		params?: TParams,
		payload?: TPayload,
		context?: TContext,
	) => void;
	onSettled?: (
		data: ApiResponse<TData> | undefined,
		error: AxiosError | null,
		context: TContext | undefined,
		params?: TParams,
		payload?: TPayload,
	) => void | Promise<unknown>;
	minLoadingTime?: number;
}

/**
 * 향상된 제네릭 뮤테이션 훅
 * @param urlOrFunction API 엔드포인트 URL 또는 URL을 생성하는 함수
 * @param method HTTP 메서드
 * @param options 뮤테이션 옵션
 * @returns UseMutationResult와 isLoading
 */
export function useGenericMutation<
	TData,
	TParams,
	TPayload,
	TContext = unknown,
>(
	urlOrFunction: string | UrlFunction<TParams>,
	method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
	options?: MutationOptions<TData, TParams, TPayload, TContext>,
): UseMutationResult<
	ApiResponse<TData>,
	AxiosError,
	{ params?: TParams; payload?: TPayload },
	TContext
> & {
	isLoading: boolean;
} {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const minLoadingTime = options?.minLoadingTime || MIN_LOADING_TIME;

	const mutationFn: MutationFunction<
		ApiResponse<TData>,
		{ params?: TParams; payload?: TPayload }
	> = async ({ params, payload }) => {
		const startTime = Date.now();
		const url =
			typeof urlOrFunction === 'function'
				? urlOrFunction(params)
				: urlOrFunction;

		const response = await axiosBase({
			method,
			url,
			data: payload,
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
		{ params?: TParams; payload?: TPayload },
		TContext
	>({
		mutationFn,
		onMutate: async ({ params, payload }) =>
			options?.onMutate ? options.onMutate(params, payload) : undefined,
		onSuccess: (data, { params, payload }, context) =>
			options?.onSuccess?.(data, params, payload, context),
		onError: (error, { params, payload }, context) =>
			options?.onError?.(error, params, payload, context),
		onSettled: (data, error, { params, payload }, context) =>
			options?.onSettled?.(data, error, context, params, payload),
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
