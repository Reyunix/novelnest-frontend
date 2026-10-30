import { DemoProvider } from "./features/demo/DemoProvider";
import { LibraryProvider } from "./features/books/LibraryProvider";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/authProvider";
import { NotificationProvider } from "./features/notifications/notificationProvider";

function App(): React.JSX.Element {
  return (
    <div className="app-container">
      <NotificationProvider>
        <AuthProvider>
          <DemoProvider>
            <LibraryProvider>
              <AppRoutes />
            </LibraryProvider>
          </DemoProvider>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
