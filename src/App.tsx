import { LibraryProvider } from "./features/books/LibraryProvider";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/authProvider";
import { NotificationProvider } from "./features/notifications/notificationProvider";

function App(): React.JSX.Element {
  return (
    <div className="app-container">
      <NotificationProvider>
        <AuthProvider>
          <LibraryProvider>
            <AppRoutes />
          </LibraryProvider>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
