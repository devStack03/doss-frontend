import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PaymentStatus from './pages/PaymentStatus';
import PaymentSuccess from './pages/PaymentSuccess';
import useAuth from './hooks/useAuth';
import { useTypedSelector } from './store/store';

export const RequireAuth = ({ children, redirectTo }: { children: JSX.Element, redirectTo?: string }) => {
  let registered = useTypedSelector(state => state.api.registered);
  let location = useLocation();
  if (!registered) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup option='' />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup option='' />} />

          <Route path='payment-success' element={
            <RequireAuth>
              <PaymentSuccess />
            </RequireAuth>
          } />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404 | There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
