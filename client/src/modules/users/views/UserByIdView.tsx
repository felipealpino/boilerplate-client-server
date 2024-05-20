import { AxiosFactory } from '@/factories/AxiosFactory';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const factory = new AxiosFactory();

export const UserByIdView: React.FC = () => {
  const { userId } = useParams();

  useEffect(() => {
    factory.get('v1/users').then((response) => console.log('users', response.data));
  }, []);

  return <div>Hello {userId}</div>;
};
