// Type definitions for react-query 0.3
// Project: https://github.com/tannerlinsley/react-query
// Definitions by: Lukasz Fiszer <https://github.com/lukaszfiszer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { ComponentType } from 'react';

export function useQuery<TResult, TVariables extends object>(
    queryKey: QueryKey<TVariables>,
    queryFn: QueryFunction<TResult, TVariables>,
    options?: QueryOptions<TResult>
): QueryResult<TResult, TVariables>;

export type QueryKey<TVariables> = string | [string, TVariables] | false | null | QueryKeyFunction<TVariables>;
export type QueryKeyFunction<TVariables> = () => string | [string, TVariables] | false | null;

export type QueryFunction<TResult, TVariables extends object> = (variables: TVariables) => Promise<TResult>;

export interface QueryOptions<TResult> {
    manual?: boolean;
    paginated?: boolean;
    getCanFetchMore?: (lastPage: number, allPages: number) => boolean;
    retry?: boolean | number;
    retryDelay?: (retryAttempt: number) => number;
    staleTime?: number;
    cacheTime?: number;
    refetchInterval?: false | number;
    onError?: (err: any) => void;
    onSucess?: (data: TResult) => void;
    suspense?: boolean;
}

export interface QueryResult<TResult, TVariables> {
    data: null | TResult;
    error: null | Error;
    isLoading: boolean;
    isFetching: boolean;
    isCached: boolean;
    failureCount: number;
    refetch: (arg?: {variables?: TVariables, merge?: (...args: any[]) => any, disableThrow?: boolean}) => void;
    isFetchingMore: boolean;
    canFetchMore: boolean;
    fetchMore: (variables?: TVariables) => Promise<TResult>;
}

export function prefetchQuery<TResult, TVariables extends object>(
    queryKey: QueryKey<TVariables>,
    queryFn: QueryFunction<TResult, TVariables>,
    options?: PrefetchQueryOptions<TResult>
): Promise<TResult>;

export interface PrefetchQueryOptions<TResult> extends QueryOptions<TResult> {
    force?: boolean;
}

export function useMutation<TResults, TVariables extends object>(
    mutationFn: MutationFunction<TResults, TVariables>,
    mutationOptions?: MutationOptions
): [MutateFunction<TResults, TVariables>, MutationResult<TResults>];

export type MutationFunction<TResults, TVariables extends object> = (
    variables: TVariables,
) => Promise<TResults>;

export interface MutationOptions {
    refetchQueries?: Array<string | [string, object]>;
    refetchQueriesOnFailure?: boolean;
}

export type MutateFunction<TResults, TVariables extends object> = (
    variables?: TVariables,
    options?: {
        updateQuery?: string | [string, object],
        waitForRefetchQueries?: boolean;
    }
) => Promise<TResults>;

export interface MutationResult<TResults> {
    data: TResults | null;
    isLoading: boolean;
    error: null | Error;
    promise: Promise<TResults>;
}

export function setQueryData(
    queryKey: string | [string, object],
    data: any,
    options?: {
        shouldRefetch?: boolean
    }
): void | Promise<void>;

export function refetchQuery(
    queryKey: string | [string, object] | [string, false],
    force?: {
        force?: boolean
    }
): Promise<void>;

export function refetchAllQueries(
    options?: {
        force?: boolean,
        includeInactive: boolean
    }
): Promise<void>;

export function useIsFetching(): boolean;

export const ReactQueryConfigProvider: React.ComponentType<{
    config?: ReactQueryProviderConfig
}>;

export interface ReactQueryProviderConfig {
    retry: number;
    retryDelay: (attempt: number) => number;
    staleTime: number;
    cacheTime: number;
    refetchAllOnWindowFocus: boolean;
    refetchInterval: boolean;
    suspense: boolean;
}

export function clearQueryCache(): void;
