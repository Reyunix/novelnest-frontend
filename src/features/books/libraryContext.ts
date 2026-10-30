import { createContext, useContext } from "react";
import type {
  SaveToLibraryData,
  UserBookSchemaType,
  UserBookStatus,
} from "./schemas/books.schemas";

export interface LibraryValue {
  books: UserBookSchemaType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  save: (book: SaveToLibraryData) => Promise<void>;
  remove: (id: number) => Promise<void>;
  changeStatus: (id: number, status: UserBookStatus) => Promise<void>;
}
export const LibraryContext = createContext<LibraryValue | null>(null);
export const useLibrary = () => {
  const value = useContext(LibraryContext);
  if (!value) throw new Error("useLibrary requires LibraryProvider");
  return value;
};
