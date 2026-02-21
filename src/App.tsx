import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./provider/authProvider";

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
