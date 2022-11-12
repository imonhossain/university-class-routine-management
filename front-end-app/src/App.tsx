import 'App.css';
import AppRoutes from 'routes/AppRoutes';
import setAxiosConfig from 'services/AxiosConfig';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetToken } from 'services/AuthenticationService';

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
