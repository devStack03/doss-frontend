import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Elements>

  );
}

export default App;
