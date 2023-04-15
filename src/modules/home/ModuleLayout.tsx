import { useRoutes } from 'react-router-dom';
import homeRoutes from './routes';

const ModuleLayout = () => {
  const elements = useRoutes(homeRoutes);
  return <>{elements}</>;
};

export default ModuleLayout;
