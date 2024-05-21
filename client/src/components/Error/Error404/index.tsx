import { ErrorContainer } from '@/components/Error/partials/ErrorContainer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <div>
        <h5 className="mb-4">Rota não encontrada</h5>
        <Button onClick={() => navigate('/')}>Voltar para Home</Button>
      </div>
    </ErrorContainer>
  );
};
