import 'App.css';
import AppRoutes from 'routes/AppRoutes';
import { getToken } from 'services/AuthenticationService';
import setAxiosConfig from 'services/AxiosConfig';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  if (getToken()) {
    setAxiosConfig(getToken());
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>

  );
};

export default App;
