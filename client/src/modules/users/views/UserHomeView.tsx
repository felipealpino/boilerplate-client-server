import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { CounterAction, countStore } from '@/stores/count';
import { socketStore } from '@/stores/socket';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const UserHomeView: React.FC = () => {
  const { socket } = socketStore();
  const { socketCount, count, setSocketCount, setCount } = countStore();

  // const factory = new AxiosFactory();
  // useEffect(() => {
  //   factory.get('/', { params: { batata: 123 } }).then((response) => console.log('healthcheck', response.data));
  // }, []);

  useEffect(() => {
    socket?.emit('JOIN_ROOM', { roomName: 'APP_ROOM', options: { batata: 123 } });
    socket?.on('CONNECTED', (args) => console.log(`Conectado na ${args.roomName}`));
  }, [socket]);

  useEffect(() => {
    socket?.on('CHANGE_COUNT', (args) => {
      console.log('CHANGE_COUNT event received:', args);
      setSocketCount(1, args);
    });
  }, [setSocketCount, socket]);

  function onChangeSocketCount(action: CounterAction['action']) {
    socket?.emit('CHANGE_COUNT', { action });
  }

  return (
    <div className="flex flex-col gap-5">
      <ModeToggle />
      <div>
        <h1>Socket Counter A: {socketCount}</h1>
        <div className="flex gap-2">
          <Button onClick={() => onChangeSocketCount('remove')}>Decrementar A</Button>
          <Button onClick={() => onChangeSocketCount('add')}>Incrementar A</Button>
        </div>
      </div>

      <div>
        <h1>Counter B: {count}</h1>
        <div className="flex gap-2">
          <Button onClick={() => setCount(count - 1)}>Decrementar B</Button>
          <Button onClick={() => setCount(count + 1)}>Incrementar B</Button>
        </div>
      </div>

      <div>
        <h1>Navigate</h1>
        <Link to={`/user/${socket?.id}`}>
          <Button>Go to User Socket: {socket?.id}</Button>
        </Link>
      </div>
    </div>
  );
};
