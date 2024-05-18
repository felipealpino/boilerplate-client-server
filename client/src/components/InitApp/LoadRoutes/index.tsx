import { APP_ROUTES } from '@/components/InitApp/LoadRoutes/routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const LoadRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" element={<div>Rota não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  )
}
