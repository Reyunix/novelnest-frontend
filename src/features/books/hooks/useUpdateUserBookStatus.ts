import { useCallback, useState } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { patchJson } from "../../../shared/http/patchJson";
import {
  getUserBookApiResponseSchema,
  type UserBookStatus,
} from "../schemas/books.schemas";

export const useUpdateUserBookStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const parseResponse = useCallback(async (response: Response) => {
    const res = await response.json();
    const parsed = getUserBookApiResponseSchema.parse(res);
    return parsed.data;
  }, []);

  const updateUserBookStatus = useCallback(
    async (bookId: number, status: UserBookStatus) => {
      setLoading(true);   

      try {
        const url = `${API_ENDPOINTS.USER_BOOKS}/${bookId}/status`;

        const response = await patchJson(
          url,
          { status },
          parseResponse,
          { credentials: "include" },
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    [parseResponse],
  );

  return { updateUserBookStatus, loading };
};
