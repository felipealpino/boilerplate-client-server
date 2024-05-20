import { AxiosFactory } from '@/factories/AxiosFactory';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const factory = new AxiosFactory();

export const UserByIdView: React.FC = () => {
  const { userId } = useParams();

  useEffect(() => {
    factory
      .get('v1/users', {
        params: {
          user: {
            name: 'Felipe Gontijo',
            siblings: [{ name: 'Thais Gontijo', age: 28 }],
            parents: [{ name: 'Zenia Gontijo', age: 60, siblings: [{ name: 'Sandra Gontijo', age: 65 }] }],
            profiles: ['Admin', 'Manager'],
          },
        },
      })
      .then((response) => console.log('users', response.data));
  }, []);

  return <div>Hello {userId}</div>;
};
