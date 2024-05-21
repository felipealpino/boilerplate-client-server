import { LoadRoutes } from '@/components/Bootstrap/LoadRoutes';
import { LoadSocket } from '@/components/Bootstrap/LoadSocket';
import { socketStore } from '@/stores/socket';
import { Fragment, useMemo } from 'react';

export function App() {
  const { socket } = socketStore();

  const canLoadRoutes = useMemo(() => Boolean(socket), [socket]);

  return (
    <Fragment>
      <LoadSocket />
      {canLoadRoutes && <LoadRoutes />}
    </Fragment>
  );
}
