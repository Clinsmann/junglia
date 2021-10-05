import { useQuery as apolloUseQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api';
import { COMPANY } from '../queries';

const Users: React.FC = () => {

  const [user, setUser] = useState<any>();
  const [company, setCompany] = useState<any>();
  const graphQuery = apolloUseQuery(COMPANY);
  const query = useQuery<any>('users', getUsers);
  const { isLoading, data, isSuccess } = query;

  useEffect(() => {
    if (isSuccess) setUser(data?.data?.results[0]);
  }, [data, isSuccess]);

  useEffect(() => {
    if (!graphQuery.loading && !graphQuery.error) setCompany(graphQuery.data.company);
  }, [graphQuery.loading, graphQuery.error, graphQuery.data]);

  console.log({ company, user });

  return (
    <div>
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
