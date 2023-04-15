import { useRoutes } from 'react-router-dom';
import userRoutes from './routes';

const ModuleLayout = () => {
  const elements = useRoutes(userRoutes);
  return <>{elements}</>;
};

export default ModuleLayout;
