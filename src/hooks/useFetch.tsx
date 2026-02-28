import { useState, useEffect } from "react";
import type { ApiResponse } from "../schemas/apiResponseSchema";
interface Props {
  URL: string
  enabled: boolean
}

export const useFetch = ({URL, enabled}:Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled){ return}

    setLoading(true);
    const fetchData = async () => {
      setError(null);

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Ha ocurrido un error al cargar los usuarios");
        }
        const data: ApiResponse = (await response.json()) as ApiResponse;
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error inesperado");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [enabled, URL]);

  return { data, loading, error };
};
