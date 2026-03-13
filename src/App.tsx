import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/authProvider";
import { NotificationProvider } from "./features/notifications/notificationProvider";

function App(): React.JSX.Element {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
