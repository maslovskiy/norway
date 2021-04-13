import { useContext } from 'react';
import { UserContext } from '../user';

export const useUser = () => {
  const { user, setUser, deleteUser, updateUser } = useContext(UserContext);
  return { user, setUser, deleteUser, updateUser };
};