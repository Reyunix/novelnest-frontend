import { createContext, useContext } from "react";
type NotificationType = "success" | "error" | "info";
type NotificationState = {
  active: boolean;
  message: string;
  type: NotificationType;
};

type NotificationContextValue = NotificationState & {
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
};
export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within an NotificationProvider",
    );
  }
  return context;
};
