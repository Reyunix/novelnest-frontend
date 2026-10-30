import { LibraryEntrySchema } from "./types/libraryEntry";
import { useDemo } from "../demo/demoContext";
import { useCallback, type ReactNode } from "react";
import { useAuth } from "../auth/authContext";
import { useFetch } from "../../shared/hooks/useFetch";
import { API_ENDPOINTS } from "../../shared/config/config.api";
import { postJson } from "../../shared/http/postJson";
import { patchJson } from "../../shared/http/patchJson";
import { deleteJson } from "../../shared/http/deleteJson";
import {
  getUserBookApiResponseSchema,
  getUserBooksApiResponseSchema,
  type SaveToLibraryData,
  type UserBookStatus,
} from "./schemas/books.schemas";
import { LibraryContext } from "./libraryContext";

const parseBooks = async (response: Response) =>
  getUserBooksApiResponseSchema.parse(await response.json()).data;
const parseBook = async (response: Response) =>
  getUserBookApiResponseSchema.parse(await response.json()).data;

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const demo = useDemo();
  const { data, loading, error, refetch, updateData } = useFetch({
    url: API_ENDPOINTS.USER_BOOKS,
    queryKey: `library:${user?.userId ?? "guest"}`,
    enabled: isAuthenticated,
    parseResponse: parseBooks,
  });
  const save = useCallback(
    async (book: SaveToLibraryData) => {
      if (demo.active) {
        demo.store.save(book);
        return;
      }
      if (!isAuthenticated || book.provider === "demo")
        throw new Error("Session required");
      const response: unknown = await postJson(API_ENDPOINTS.BOOK_SAVE, book);
      const saved = getUserBookApiResponseSchema.parse(response).data;
      updateData((previous) => [
        saved,
        ...(previous ?? []).filter((item) => item.id !== saved.id),
      ]);
    },
    [updateData, demo.active, demo.store, isAuthenticated],
  );
  const remove = useCallback(
    async (id: number) => {
      if (demo.active) {
        demo.store.remove(id);
        return;
      }
      if (!isAuthenticated) throw new Error("Session required");
      await deleteJson(`${API_ENDPOINTS.USER_BOOKS}/${id}`);
      updateData((previous) =>
        (previous ?? []).filter((book) => book.id !== id),
      );
    },
    [updateData, demo.active, demo.store, isAuthenticated],
  );
  const changeStatus = useCallback(
    async (id: number, status: UserBookStatus) => {
      if (demo.active) {
        demo.store.changeStatus(id, status);
        return;
      }
      if (!isAuthenticated) throw new Error("Session required");
      const updated = await patchJson(
        `${API_ENDPOINTS.USER_BOOKS}/${id}/status`,
        { status },
        parseBook,
      );
      updateData((previous) =>
        (previous ?? []).map((book) => (book.id === id ? updated : book)),
      );
    },
    [updateData, demo.active, demo.store, isAuthenticated],
  );
  return (
    <LibraryContext.Provider
      value={{
        books: demo.active
          ? demo.state.books
          : (data ?? []).map((book) => LibraryEntrySchema.parse(book)),
        loading: demo.active ? false : loading,
        error: demo.active ? null : error,
        refetch: demo.active ? async () => {} : refetch,
        save,
        remove,
        changeStatus,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
