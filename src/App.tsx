import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PaymentSuccess from './pages/PaymentSuccess';
import { useTypedSelector } from './store/store';
import Landing from './pages/Landing';

export const RequireAuth = ({ children, redirectTo }: { children: JSX.Element, redirectTo?: string }) => {
  let { registered, loggedin } = useTypedSelector(state => state.api);
  let location = useLocation();
  if (!loggedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export const RequireSignup = ({ children, redirectTo }: { children: JSX.Element, redirectTo?: string }) => {
  let { registered } = useTypedSelector(state => state.api);
  let location = useLocation();
  if (!registered) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Navigate to="/login" replace />} /> */}
          <Route path='/' element={<Landing />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path='signup' element={<Signup option='' />} />

          <Route path='payment-success' element={
            <RequireSignup>
              <PaymentSuccess />
            </RequireSignup>
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
