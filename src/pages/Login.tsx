import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from "../components/login/PhoneInput";
import VerificationCodeInput from "../components/login/VerificationCodeInput";
import NavHeader from "../components/NavHeader";
import authService from '../services/auth.service';
import LoadingScreen from '../components/LoadingScreen';
import { fetchStarted, resultLoaded, userLoggedin } from '../store/slices/api.slice';
import { useDispatch, useTypedSelector } from '../store/store';

const Login = () => {
  const navigate = useNavigate();
  const isLoading = useTypedSelector(state => state.api.isLoading);
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
          dispatch(userLoggedin(res.data.user));
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
      {!phoneNumberSubmitted ? (
        <PhoneInput handleAfterSubmit={handleSubmit} />
      ) : (
        <VerificationCodeInput handleAfterSubmit={handleSubmit} codeInValid={codeInvalid} phoneNumber={phoneNumber} />
      )}
      {isLoading &&
        <LoadingScreen />
      }
    </>
  )
}

export default Login;