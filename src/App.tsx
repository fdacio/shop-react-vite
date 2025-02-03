import { ApiProvider } from './context/ApiProvider';
import { AppProvider } from './context/AppProvider';
import { useAppShop } from './context/AppProvider/useAppShop';
import { AuthProvider } from './context/AuthProvider';
import Routes from './routes';

function App() {
  const app = useAppShop();
  return (
    <>
      {(app.message) && <div>{app.message}</div>}
      <ApiProvider>
        <AuthProvider >
          <AppProvider>
            <Routes />
          </AppProvider>
        </AuthProvider>
      </ApiProvider>
    </>
  );
}

export default App
