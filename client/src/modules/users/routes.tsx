import { UserByIdView } from '@/modules/users/views/UserByIdView';
import { UserHomeView } from '@/modules/users/views/UserHomeView';
import { RouteProps } from 'react-router-dom';

export const userRoutes: RouteProps[] = [
  {
    path: '/',
    element: <UserHomeView />,
  },
  {
    path: '/user/:userId',
    element: <UserByIdView />,
  },
];
