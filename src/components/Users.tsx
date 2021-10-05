import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api';

const Users: React.FC = () => {

  const [user, setUser] = useState<any>();
  const query = useQuery<any>('users', getUsers);
  const { isLoading, data, isSuccess } = query;

  console.log(query);

  useEffect(() => {
    if (isSuccess) setUser(data?.data?.results[0]);
  }, [data, isSuccess]);

  return (
    <div className="App">
      homepage
      {isLoading ? (
        <span>
          loading...
        </span>
      ) : (
        user && (
          <>
            <div>
              username: {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </div>
            <img src={user.picture.thumbnail} alt="" />
          </>
        )
      )}
    </div>
  );
}

export default Users;
