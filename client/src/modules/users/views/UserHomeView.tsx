import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { countStore } from '@/stores/count'
import { socketStore } from '@/stores/socket'
import { Link } from 'react-router-dom'

export const UserHomeView: React.FC = () => {
  const { socket } = socketStore()
  const { countA, countB, setCountA, setCountB } = countStore()

  return (
    <div className="flex flex-col gap-5">
      <ModeToggle />
      <div>
        <h1>Counter A: {countA}</h1>
        <div className="flex gap-2">
          <Button onClick={() => setCountA(countA - 1)}>Decrementar A</Button>
          <Button onClick={() => setCountA(countA + 1)}>Incrementar A</Button>
        </div>
      </div>

      <div>
        <h1>Counter B: {countB}</h1>
        <div className="flex gap-2">
          <Button onClick={() => setCountB(countB - 1)}>Decrementar B</Button>
          <Button onClick={() => setCountB(countB + 1)}>Incrementar B</Button>
        </div>
      </div>

      <div>
        <h1>Navigate</h1>
        <Link to={`/user/${socket?.id}`}>
          <Button>Go to User Socket: {socket?.id}</Button>
        </Link>
      </div>
    </div>
  )
}
