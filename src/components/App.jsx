import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import { lazy, Suspense } from 'react';
import { Header } from './Header';
import Spinner from './Spinner/Spinner';

const Phonebook = lazy(() => import('./Phonebook/Phonebook'));
const RegistrationForm = lazy(() =>
  import('./RegistrationForm/RegistrationForm')
);
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const HomePage = lazy(() => import('./HomePage/HomePage'));

export const BASE_URL = '/goit-react-hw-08-phonebook';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<Header />}>
            <Route
              index
              element={
                <PublicRoute index replace>
                  <HomePage />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute to={`${BASE_URL}/contacts`} replace restricted>
                  <RegistrationForm />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute to={`${BASE_URL}/contacts`} replace restricted>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute to={`${BASE_URL}/`} replace>
                  <Phonebook />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={`${BASE_URL}/`} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export { App };
