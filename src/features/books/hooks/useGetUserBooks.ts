import { useCallback, useMemo } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { useFetch } from "../../../shared/hooks/useFetch";
import {
  getUserBooksApiResponseSchema,
  type GetUserBookResponse,
} from "../schemas/books.schemas";

export const useGetUserBooks = () => {
  const url = API_ENDPOINTS.GET_USER_BOOKS;

  const requestInit = useMemo<RequestInit>(
    () => ({
      credentials: "include",
    }),
    [],
  );

  const parseResponse = useCallback(async (response: Response) => {
    const json = await response.json();
    const parsed = getUserBooksApiResponseSchema.parse(json);
    return parsed.data;
  }, []);

  return useFetch<GetUserBookResponse>({
    url,
    requestInit,
    parseResponse,
  });
};
