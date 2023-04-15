import { useRoutes } from 'react-router-dom';
import authRoutes from './routes';

const ModuleLayout = () => {
  const elements = useRoutes(authRoutes);
  return <>{elements}</>;
};

export default ModuleLayout;
