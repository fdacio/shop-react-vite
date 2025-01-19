import './App.css'
import { ApiProvider } from './context/ApiProvider';
import { AuthProvider } from './context/AuthProvider';
import Routes from './routes';

function App() {

  return (
    <ApiProvider>
      <AuthProvider >
        <Routes />
      </AuthProvider>
    </ApiProvider>
  );
}

export default App
