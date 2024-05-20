import { LoadRoutes } from '@/components/Bootstrap/LoadRoutes';
import { LoadSocket } from '@/components/Bootstrap/LoadSocket';
import { Fragment } from 'react';

export function App() {
  return (
    <Fragment>
      <LoadSocket />
      <LoadRoutes />
    </Fragment>
  );
}
