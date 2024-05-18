import { useParams } from 'react-router-dom'

export const UserByIdView: React.FC = () => {
  const { userId } = useParams()

  return <div>Hello {userId}</div>
}
