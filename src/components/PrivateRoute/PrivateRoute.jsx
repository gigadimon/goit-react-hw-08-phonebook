import { useSelector } from 'react-redux';
import { selectLogin } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, ...routeProps }) {
  const isLoggedIn = useSelector(selectLogin);
  return <>{isLoggedIn ? children : <Navigate {...routeProps} />}</>;
}
