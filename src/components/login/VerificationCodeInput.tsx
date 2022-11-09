import { useState } from "react";
import { validatePhoneField } from "../../utils/validation";
import ReactCodeInput from 'react-verification-code-input';
import ReactInputVerificationCode from "react-input-verification-code";
import { Link } from "react-router-dom";

const VerificationCodeInput = (
  { handleAfterSubmit, codeInValid }: {
    handleAfterSubmit: (bool: boolean, number: string, code: string) => void,
    codeInValid: boolean
  }) => {

  const [value, setValue] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(value);
    handleAfterSubmit(true, '', value);
  }

  return (
    <div className="section-fullscreen wf-section">
      <div className="section-fullscreen-container">
        <div className="section-fullscreen-text-block">
          <div className="fullscreen--title">Iniciando sesión...</div>
          <div className="fullscreen--subtitle">Introduce el código recibido por sms.</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <form id="wf-form-Registration-form---SMS-code" name="wf-form-Registration-form---SMS-code" data-name="Registration form - SMS code" onSubmit={handleSubmit}>
              <div className="custom-styles div-block-2">
                <ReactInputVerificationCode
                  autoFocus
                  placeholder=""
                  length={6}
                  value={value}
                  onChange={setValue}
                  onCompleted={console.log}
                />
              </div>
              <input type="submit" data-wait="Cargando" value="Iniciar sesión" className="submit-button w-button" />
              {codeInValid &&
                <span className='wf-error-msg'>{`Invalid code`}</span>
              }
              <div className="text-block-10">¿Teléfono incorrecto? <Link to="/">Volver</Link>
              </div>
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

export default VerificationCodeInput;