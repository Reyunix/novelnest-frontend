import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { NotificationContext } from "./notificationContext";
import { NotificationToast } from "../../components/NotificationToast";

type NotificationType = "success" | "error" | "info";
const NOTIFICATION_DURATION_MS = 3000;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("info");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNotification = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setActive(false);
    setMessage("");
    setType("info");
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showNotification = useCallback(
    (nextMessage: string, nextType: NotificationType = "info") => {
      setMessage(nextMessage);
      setType(nextType);
      setActive(true);

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        hideNotification();
      }, NOTIFICATION_DURATION_MS);
    },
    [hideNotification],
  );

  const value = useMemo(
    () => ({
      active,
      message,
      type,
      showNotification,
      hideNotification,
    }),
    [active, message, type, showNotification, hideNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationToast />
    </NotificationContext.Provider>
  );
};
