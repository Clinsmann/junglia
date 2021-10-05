import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css';
import Dashboard from './components/Dashboard';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div style={{ backgroundColor: "#24292E" }}>
      <Dashboard />
    </div>
  </QueryClientProvider>
);

export default App;

/*
- #24292E
- #AEAEBA
- #363D4D
- #525252
 */

