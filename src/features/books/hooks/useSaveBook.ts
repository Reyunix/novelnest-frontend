import { useCallback, useState } from "react";
import { postJson } from "../../../shared/http/postJson";
import type { SaveToLibraryData } from "../schemas/books.schemas";
import { AppHttpError } from "../../../shared/types/httpError.types";
import type { ApiSuccessResponse } from "../../../shared/types/apiResponse.types";

type SaveBookResult =
  | { ok: true; data: SaveToLibraryData }
  | { ok: false; error: AppHttpError };

export const useSaveBook = (url: string) => {
  const [data, setData] = useState<SaveToLibraryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppHttpError | null>(null);

  const saveBook = useCallback(
    async (payload: SaveToLibraryData): Promise<SaveBookResult> => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await postJson<ApiSuccessResponse<SaveToLibraryData>>(
          url,
          payload,
        );
        setData(response.data);
        return { ok: true, data: response.data };
      } catch (error) {
        const appError =
          error instanceof AppHttpError
            ? error
            : new AppHttpError({
                status: 0,
                errorCode: "UNKNOWN_ERROR",
                message: "Unexpected error",
                cause: error,
                url,
                method: "POST",
              });
        setError(appError);
        return { ok: false, error: appError };
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  return { saveBook, data, loading, error };
};
