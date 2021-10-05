import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css';
import Users from './components/Users';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    homepage
    <Users />
  </QueryClientProvider>
);

export default App;
