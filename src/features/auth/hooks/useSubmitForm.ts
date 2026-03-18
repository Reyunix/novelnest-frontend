import { useCallback, useState } from "react";
import { AppHttpError } from "../../../shared/types/httpError.types";
import { postJson } from "../../../shared/http/postJson";
import type { ApiSuccessResponse } from "../../../shared/types/apiResponse.types";

type SubmitResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: AppHttpError };

export const useSubmitForm = <TData>(url: string) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppHttpError | null>(null);

  const submitForm = useCallback(
    async (payload: unknown): Promise<SubmitResult<TData>> => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await postJson<ApiSuccessResponse<TData>>(
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
                message: "Unknown error",
                cause: error,
                method: "POST",
                url,
              });
        setError(appError);
        return { ok: false, error: appError };
      } finally {
        setLoading(false);
      }
    },
    [url],
  );
  return { submitForm, data, loading, error };
};
