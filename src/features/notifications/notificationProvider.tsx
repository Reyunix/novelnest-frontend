import { useMemo, useState, type ReactNode } from "react";
import { NotificationContext } from "./notificationContext";
import { NotificationToast } from "../../components/NotificationToast";

type NotificationType = "success" | "error" | "info";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("info");

  const showNotification = (
    nextMessage: string,
    nextType: NotificationType = "info",
  ) => {
    setMessage(nextMessage);
    setType(nextType);
    setActive(true);
  };

  const hideNotification = () => {
    setActive(false);
    setMessage("");
    setType("info");
  };

  const value = useMemo(
    () => ({
      active,
      message,
      type,
      showNotification,
      hideNotification,
    }),
    [active, message, type],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationToast/>
    </NotificationContext.Provider>
  );
};
