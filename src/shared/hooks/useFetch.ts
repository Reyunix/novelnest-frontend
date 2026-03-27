import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions<TData> {
  url: string;
  enabled?: boolean;
  requestInit?: RequestInit;
  parseResponse?: (response: Response) => Promise<TData>;
}

interface UseFetchResult<TData> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const defaultParser = async <TData>(response: Response): Promise<TData> => {
  return (await response.json()) as TData;
};

export const useFetch = <TData>({
  url,
  enabled = true,
  requestInit,
  parseResponse,
}: UseFetchOptions<TData>): UseFetchResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...requestInit,
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const parser = parseResponse ?? defaultParser<TData>;
      const parsed = await parser(response);
      setData(parsed);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected request error");
      }
    } finally {
      setLoading(false);
    }
  }, [url, requestInit, parseResponse]);

  useEffect(() => {
    if (!enabled) return;
    void fetchData();
  }, [enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
};
