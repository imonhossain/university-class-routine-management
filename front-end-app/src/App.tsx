import 'App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from 'routes/AppRoutes';
import { useGetToken } from 'services/AuthenticationService';
import setAxiosConfig from 'services/AxiosConfig';

const queryClient = new QueryClient();

const App = () => {
  const token = useGetToken();
  if (token) {
    setAxiosConfig(token);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
