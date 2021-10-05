import { useCallback, useEffect, useState } from 'react';
import { getUsers } from './api';
import './App.css';

function App() {

  const [user, setUser] = useState<any>();

  const fetchUsers = useCallback(async () => {
    try {
      const { data }: any = await getUsers();
      console.log({ data: data.results });
      setUser(data.results[0]);
    } catch (error) {
      console.error({ error });
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="App">
      homepage
      <div>
        username: {user && `${user.name.title} ${user.name.first} ${user.name.last}`}
      </div>
      <img src={user && user.picture.thumbnail} alt="" />
    </div>
  );
}

export default App;
