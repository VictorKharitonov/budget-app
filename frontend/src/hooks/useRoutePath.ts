import { useLocation } from 'react-router-dom';

const useRoutePath = () => {
  const location = useLocation();
  return location.pathname.split('/').filter(path => path);
};

export default useRoutePath;
