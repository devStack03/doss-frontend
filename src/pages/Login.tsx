import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PhoneInput from "../components/login/PhoneInput";
import VerificationCodeInput from "../components/login/VerificationCodeInput";
import NavHeader from "../components/NavHeader";
import authService from '../services/auth.service';
import LoadingScreen from '../components/LoadingScreen';
import { fetchStarted, resultLoaded, userLoggedin } from '../store/slices/api.slice';
import { useDispatch, useTypedSelector } from '../store/store';
import { setSession } from '../utils';
import userService from '../services/user.service';

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useTypedSelector(state => state.auth);
  const dispatch = useDispatch();
  const [phoneNumberSubmitted, setPhoneNumberSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [codeInvalid, setCodeInvalid] = useState(false);
  const handleSubmit = (bool: boolean, number?: string, _code?: string) => {
    if (number) {
      setPhoneNumber(number);
      setPhoneNumberSubmitted(bool);
    }
    if (!_code?.length && phoneNumber.length) {

    }
    if (_code?.length && phoneNumber.length) {
      dispatch(fetchStarted());
      setCode(_code);
      authService.login({
        phoneNumber,
        code: _code
      }).then((res) => {
        if (res.data.status < 1) {
          // } else if (res.data.status === -3) {
          // } else if (res.data.status === -4) {
          // } else if (res.data.status === -5) {
          setCodeInvalid(true);
        } else {
          const { user, accessToken, refreshToken, ...rest } = res.data;
          setSession(accessToken);
          // userService.getCustomerDetail().then((res) =>{

          // })
          dispatch(userLoggedin({
            ...user,
            accessToken,
            refreshToken
          }));
          navigate('/dashboard', { replace: true });
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setCodeInvalid(true);
        dispatch(resultLoaded());
      })
    }
  }

  return (
    <>
      <NavHeader />
      {!user?.accessToken ? (
        <>
          {phoneNumberSubmitted ? (
            <PhoneInput handleAfterSubmit={handleSubmit} />
          ) : (
            <VerificationCodeInput handleAfterSubmit={handleSubmit} codeInValid={codeInvalid} phoneNumber={phoneNumber} />
          )}
          {isLoading &&
            <LoadingScreen />
          }
        </>
      ) : (
        <Navigate to={`/dashboard`} replace />
      )}
    </>
  )
}

export default Login;