import { useSelector } from 'react-redux';
import { selectLogin } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children, ...routeProps }) {
  const isLoggedIn = useSelector(selectLogin);
  return (
    <>
      {isLoggedIn && routeProps.restricted ? (
        <Navigate {...routeProps} />
      ) : (
        children
      )}
    </>
  );
}
