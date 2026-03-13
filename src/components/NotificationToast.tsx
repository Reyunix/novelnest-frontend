import { useNotifications } from "../features/notifications/notificationContext";

export const NotificationToast = () => {
  const { active, message, type, hideNotification } = useNotifications();

  if (!active) return null;

  return (
    <aside
      className={`notification-toast notification-toast--${type}`}
      role="status"
      aria-live="polite"
    >
      <p>{message}</p>
      <button type="button" onClick={hideNotification} aria-label="Close notification">
        x
      </button>
    </aside>
  );
};
