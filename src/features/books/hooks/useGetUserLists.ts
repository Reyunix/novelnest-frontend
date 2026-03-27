import { useCallback, useMemo } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { useFetch } from "../../../shared/hooks/useFetch";
import {
  UserListSchemaApiResponse,
  type UserListSchemaApiResponseType,
} from "../schemas/books.schemas";

export const useGetUserLists = () => {
  const url = API_ENDPOINTS.GET_USER_LISTS;
  const requestInit = useMemo<RequestInit>(
    () => ({ credentials: "include" }),
    [],
  );
  const parseResponse = useCallback(async (response: Response) => {
    const res = await response.json();
    const parsed = UserListSchemaApiResponse.parse(res);
    return parsed;
  }, []);
  return useFetch<UserListSchemaApiResponseType>({
    url,
    requestInit,
    parseResponse,
  });
};
