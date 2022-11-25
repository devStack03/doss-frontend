import { useState, useEffect } from "react";
// import ReactInputVerificationCode from "react-input-verification-code";
import ReactInputVerificationCode from "./VerifyCodeInput";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
// import VerificationInput from "react-verification-input";

const VerificationCodeInput = (
  { handleAfterSubmit, codeInValid, phoneNumber }: {
    handleAfterSubmit: (bool: boolean, number: string, code: string) => void,
    codeInValid: boolean,
    phoneNumber: string
  }) => {

  const [value, setValue] = useState("");
  const [count, setCount] = useState(15);

  useEffect(() => {
    const element: HTMLInputElement = document.querySelector('#one-time-code') as HTMLInputElement;
    element?.classList.add('autofocus');
    // console.log(element);
    element?.focus();
  }, [])

  useEffect(() => {
    let timer = setInterval(() => {
      if (count > 0)
        setCount((count) => count - 1);
    }, 1000);

    return () => clearTimeout(timer)
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (count === 0) {
      handleResend();
      setCount(15);
    }
  }

  const handleVerifyCode = (code: string) => {
    console.log(code);
    handleAfterSubmit(true, '', code);
  }

  const handleResend = () => {
    if (phoneNumber.length) {
      authService.sendVerificationCode({
        phoneNumber
      }).then((res) => {
        console.log(res);
        if (res.data.status < 0) {
          if (res.data.status === -1) {
          } else if (res.data.status === -3) {
          } else if (res.data.status === -4) {
          } else if (res.data.status === -5) {
            // setPhoneErrorMessage(phoneErrorMessages.used);
            // setPhoneNumberFieldValid(false);
          }
        }
        else {
        }
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
      });
    }
  }

  const countDown = () => {
    let timer = setInterval(() => {
      if (count)
        setCount((count) => count - 1);
    }, 1000);
  }

  const onChangeValue = (_value: string) => {
    // -- I also tried without this part below
    if (_value.length === 6) {
      handleAfterSubmit(true, '', _value);
    }
    // --  still doesn't work for me
  };


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
              <div className="custom-styles div-block-2 tw-mb-14">
                {/* <VerificationInput
                  // value={value}
                  classNames={{
                    container: "pin-container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                  }}
                  onChange={onChangeValue}
                  onFocus={() => {

                  }}
                  placeholder=""
                  validChars="0-9"
                  inputProps={{ autoComplete: "one-time-code", type: 'tel' }}
                  // removeDefaultStyles
                  autoFocus
                /> */}
                <ReactInputVerificationCode
                  placeholder=""
                  length={6}
                  value={value}
                  onChange={setValue}
                  onCompleted={handleVerifyCode}
                />
                {/* <ReactCodeInput type="number" className="code-input" autoFocus onComplete={handleVerifyCode}/> */}
              </div>
              <input type="submit" data-wait="Cargando" value={count > 0 ? `Reenviar en ${count} segundos` : `Reenviar SMS`} disabled={count > 0 ? true : false} className={count === 0 ? "submit-button-3 w-button tw-bg-[#ffc700]" : "submit-button-3 w-button"} />
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