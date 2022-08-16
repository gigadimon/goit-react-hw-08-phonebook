import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './Header';
import Spinner from './Spinner/Spinner';

const Phonebook = lazy(() => import('./Phonebook/Phonebook'));
const RegistrationForm = lazy(() =>
  import('./RegistrationForm/RegistrationForm')
);
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const HomePage = lazy(() => import('./HomePage/HomePage'));
const PrivateRoute = lazy(() => import('./PrivateRoute/PrivateRoute'));
const PublicRoute = lazy(() => import('./PublicRoute/PublicRoute'));

function App() {
  return (
    <BrowserRouter basename="/goit-react-hw-08-phonebook">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Header />}>
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
                <PublicRoute to="/contacts" replace restricted>
                  <RegistrationForm />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute to="/contacts" replace restricted>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute to="/" replace>
                  <Phonebook />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export { App };
