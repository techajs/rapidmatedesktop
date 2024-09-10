import { useSelector } from 'react-redux';

export const UseFetch = () => {
  const { user } = useSelector((state) => state.auth);
  return user;
};