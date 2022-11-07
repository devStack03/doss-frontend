import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('User context must be use inside UserContext Provider');
  return context;
};

export default useAuth;