import { createContext, useContext } from "react";
import type { createDemoStore, DemoState } from "./demoStore";
export type DemoStore = ReturnType<typeof createDemoStore>;
export const DemoContext = createContext<{
  active: boolean;
  state: DemoState;
  persistent: boolean;
  store: DemoStore;
} | null>(null);
export const useDemo = () => {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoProvider required");
  return value;
};
