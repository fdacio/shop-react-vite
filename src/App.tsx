import { ApiProvider } from './context/ApiProvider';
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';
import Routes from './routes';

function App() {

  return (
    <ApiProvider>
      <AuthProvider >
        <AppProvider>
          <Routes />
        </AppProvider>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App
