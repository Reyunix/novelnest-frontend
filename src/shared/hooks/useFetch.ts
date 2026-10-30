import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRequestScope } from "../http/requestScope";
import { errorMessage, request } from "../http/request";

interface UseFetchOptions<T> {
  url: string;
  enabled?: boolean;
  queryKey?: string;
  requestInit?: RequestInit;
  parseResponse?: (response: Response) => Promise<T>;
}
interface FetchState<T> {
  key: string;
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>({
  url,
  queryKey = url,
  enabled = true,
  requestInit,
  parseResponse,
}: UseFetchOptions<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    key: "",
    data: null,
    loading: false,
    error: null,
  });
  const currentKey = useRef(queryKey);
  const scope = useMemo(() => createRequestScope(), []);

  const runRequest = useCallback((): Promise<void> => {
    const task = scope.start();
    if (!enabled || !url) return Promise.resolve();
    return request(url, { ...requestInit, signal: task.signal })
      .then((response) =>
        parseResponse
          ? parseResponse(response)
          : (response.json() as Promise<T>),
      )
      .then((data) => {
        if (task.isCurrent())
          setState({ key: queryKey, data, loading: false, error: null });
      })
      .catch((error) => {
        if (task.isCurrent())
          setState({
            key: queryKey,
            data: null,
            loading: false,
            error: errorMessage(error),
          });
      });
  }, [url, queryKey, enabled, requestInit, parseResponse, scope]);

  useEffect(() => {
    currentKey.current = queryKey;
    void runRequest();
    return scope.cancel;
  }, [runRequest, scope, queryKey]);

  const refetch = useCallback(async () => {
    if (!enabled || !url || currentKey.current !== queryKey) return;
    setState((previous) => ({
      key: queryKey,
      data: previous.key === queryKey ? previous.data : null,
      loading: true,
      error: null,
    }));
    await runRequest();
  }, [enabled, url, queryKey, runRequest]);

  const updateData = useCallback(
    (update: (previous: T | null) => T) => {
      if (currentKey.current !== queryKey) return;
      scope.cancel();
      setState((previous) => ({
        key: queryKey,
        data: update(previous.key === queryKey ? previous.data : null),
        loading: false,
        error: null,
      }));
    },
    [queryKey, scope],
  );

  const active = enabled && Boolean(url);
  const matches = active && state.key === queryKey;
  return {
    data: matches ? state.data : null,
    loading: active && (!matches || state.loading),
    error: matches ? state.error : null,
    refetch,
    updateData,
  };
};
