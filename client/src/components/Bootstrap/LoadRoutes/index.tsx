import { APP_ROUTES } from '@/components/Bootstrap/LoadRoutes/routes';
import { Error404 } from '@/components/Error/Error404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const LoadRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
