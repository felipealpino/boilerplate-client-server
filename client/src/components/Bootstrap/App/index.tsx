import { LoadRoutes } from '@/components/Bootstrap/LoadRoutes';
import { LoadSocket } from '@/components/Bootstrap/LoadSocket';
import { socketStore } from '@/stores/socket';
import { Fragment, useMemo } from 'react';

export function App() {
  const { socket } = socketStore();
  const isAppReady = useMemo(() => socket?.connected, [socket]);

  return (
    <Fragment>
      <LoadSocket />
      {isAppReady && <LoadRoutes />}
    </Fragment>
  );
}
