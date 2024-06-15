import { useListUsers } from '@/modules/users/hooks/useListUsers';
import { useParams } from 'react-router-dom';

export const UserByIdView: React.FC = () => {
  const { userId } = useParams();

  const { data } = useListUsers({
    filters: {
      user: {
        name: 'John Doe',
        siblings: [{ name: 'Carl Mark', age: 28 }],
        parents: [{ name: 'Jony Petter', age: 60, siblings: [{ name: 'Ronald McDonal', age: 65 }] }],
        profiles: ['Admin', 'Manager'],
      },
    },
  });

  return (
    <div>
      Hello {data?.user.name} - {userId}
    </div>
  );
};
