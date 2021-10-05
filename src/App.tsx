import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css';
import Dashboard from './components/Dashboard';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div className="h-screen app-background overflow-scroll">
      <Dashboard />
    </div>
  </QueryClientProvider>
);

export default App;
