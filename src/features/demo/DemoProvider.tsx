import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useAuth } from "../auth/authContext";
import { createDemoStore } from "./demoStore";
import { DemoContext } from "./demoContext";

export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [store] = useState(() => createDemoStore());
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  useEffect(() => {
    if (isAuthenticated) store.leave();
  }, [isAuthenticated, store]);
  return (
    <DemoContext.Provider
      value={{
        ...snapshot,
        active: snapshot.state.active && !isAuthenticated,
        store,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
