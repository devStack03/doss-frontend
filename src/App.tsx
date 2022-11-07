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

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Signup option=''/>} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup option=''/>} />
              <Route path='payment-success' element={<PaymentSuccess />} />
            </Routes>
          </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
