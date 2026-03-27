import { useCallback, useState } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { deleteJson } from "../../../shared/http/deleteJson";

export const useDeleteUserBook = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBook = useCallback(async (bookId: number) => {
    setLoading(true);

    try {
      const url = `${API_ENDPOINTS.DELETE_USERBOOK}/${bookId}`;
      const response = await deleteJson(url, { credentials: "include" });

      if (response.ok) return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { deleteBook, loading };
};
