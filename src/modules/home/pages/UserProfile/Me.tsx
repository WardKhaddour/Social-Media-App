import { useSelector } from 'react-redux';
import UserProfile from '.';
import { RootState } from 'store';

const Me = () => {
  const { _id } = useSelector((state: RootState) => state.user.user);

  return <UserProfile id={_id} />;
};

export default Me;
