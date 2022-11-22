import { useState } from 'react';
import authService from '../../services/auth.service';
import { fetchStarted, resultLoaded } from '../../store/slices/api.slice';
import { useDispatch } from '../../store/store';
import { validatePhoneField } from "../../utils/validation";
const PhoneInput = ({ handleAfterSubmit }: { handleAfterSubmit: (bool: boolean, number: string) => void }) => {

  const phoneErrorMessages = {
    empty: 'Por favor introduce tu número de teléfono.',
    invalid: 'Por favor introduce un número de teléfono valido.',
    used: 'Este número de teléfono ya esta en uso.',
    notFound: 'Por favor introduce un teléfono valido.'
  };
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberFieldValid, setPhoneNumberFieldValid] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPhoneNumberFieldValid(true);

    if (!phoneNumber.length) {
      setPhoneErrorMessage(phoneErrorMessages.empty);
      setPhoneNumberFieldValid(false);
      return;
    }

    if (phoneNumber.length < 9) {
      setPhoneErrorMessage(phoneErrorMessages.invalid);
      setPhoneNumberFieldValid(false);
      return;
    }

    // dispatch(fetchStarted());
    handleAfterSubmit(true, phoneNumber);
    return;
    authService.sendVerificationCode({
      phoneNumber
    }).then((res) => {
      console.log(res);
      if (res.data.status < 0) {
        if (res.data.status === -1) {
          setPhoneNumberFieldValid(false);
          setPhoneErrorMessage(phoneErrorMessages.notFound);
        } else if (res.data.status === -3) {
        } else if (res.data.status === -4) {
        } else if (res.data.status === -5) {
          // setPhoneErrorMessage(phoneErrorMessages.used);
          // setPhoneNumberFieldValid(false);
        }
      }
      else {
        handleAfterSubmit(true, phoneNumber);
      }
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      dispatch(resultLoaded());
    })
  }

  const handleChange = (e: any) => {
    setPhoneNumberFieldValid(true);
    setPhoneNumber(e.target.value);
  }

  return (
    <div className="section-fullscreen wf-section">
      <div className="section-fullscreen-container">
        <div className="section-fullscreen-text-block">
          <div className="fullscreen--title">Inicio de sesión</div>
          <div className="fullscreen--subtitle">Introduce tu número de teléfono y recibiras un sms para iniciar sesión.</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <form id="wf-form-Registration-form---Telephone" name="wf-form-Registration-form---Telephone" data-name="Registration form - Telephone" onSubmit={handleSubmit}>
              <div className="form-field-label--custom">
                <div className="form-field-label--name">Teléfono</div>
              </div>
              <label htmlFor="Telephone-2" className="field-label hide">Teléfono</label>
              <input
                type="number"
                className="form-field--field w-input no-spin"
                maxLength={9}
                pattern="\d*"
                name="phoneNumber"
                data-name="your-telephone"
                placeholder="666 123 456"
                id="your-telephone"
                data-ms-member="telefono"
                required
                value={phoneNumber}
                onInput={validatePhoneField}
                onChange={handleChange}
                autoComplete={"do-not-autofill"}
              />
              {!phoneNumberFieldValid &&
                <>
                  <span className='wf-error-msg'>{phoneErrorMessage}</span>
                </>
              }
              <input type="submit" data-wait="Cargando..." value="Siguiente" className="submit-button w-button" style={{marginTop: '10px'}} />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneInput;