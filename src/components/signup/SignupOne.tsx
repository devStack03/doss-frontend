import { useState } from 'react';

import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';
import couponService from '../../services/coupon.service';
import { fetchStarted, resultLoaded } from '../../store/slices/api.slice';
import { useDispatch } from '../../store/store';
const SignupOne = ({ handleActiveSectionChange }: { handleActiveSectionChange: GeneralFuctionType }) => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    invitationCode: '',
    email: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [couponCodeValid, setCouponCodeValid] = useState(true);
  const [emailFieldValid, setEmailFieldValid] = useState(true);
  const [phoneNumberFieldValid, setPhoneNumberFieldValid] = useState(true);
  const [nameFieldValid, setNameFieldValid] = useState(true);

  const { userSignupData, setUserSignupData, setStripeInfo } = useAuth();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }

  const validatePhoneField = (e: any) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  }

  const handleSubmit = () => {
    setNameFieldValid(true);
    setCouponCodeValid(true);
    setPhoneNumberFieldValid(true);
    setEmailFieldValid(true);
    setErrorMessage('');
    if (!formData.fullName.length) {
      setNameFieldValid(false);
      return;
    }
    if (!formData.email.length) {
      setEmailFieldValid(false);
      return;
    }

    if (!formData.phoneNumber.length) {
      setPhoneNumberFieldValid(false);
      return;
    }

    if (!formData.invitationCode.length) {
      setCouponCodeValid(false);
      return;
    }

    dispatch(fetchStarted());
    couponService.validate({
      code: formData.invitationCode,
      email: formData.email,
      name: formData.fullName
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === -1) {
        setErrorMessage(res.data.error.message)
      } else {
        if (setStripeInfo)
          setStripeInfo(res.data);
        setUserSignupData({
          ...userSignupData,
          ...formData,
          stripeCustomerId: res.data.customer.id
        });
        setCouponCodeValid(true);
        handleActiveSectionChange(2);
      }

    }).catch((err) => {
      console.log(err);
      setErrorMessage(err.message);
      // alert(err.message);
    }).finally(() => {
      dispatch(resultLoaded());
    });
  }

  return (
    <div className="section-fullscreen wf-section">
      <div className="section-fullscreen-container">
        <div className="section-fullscreen-text-block">
          <div className="fullscreen--title">Bienvenid@ a Doss</div>
          <div className="fullscreen--subtitle">Estas a solo tres pasos de hacerte miembro del gastro club que esta arransando en Madriz.</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <form id="wf-form-1" name="wf-form-" data-name="" data-ms-form="signup">
              <div className="form-field-label--custom form-name--custom">
                <div className="form-field-label--name">Paso 1/3</div>
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Nombre</div>
                </div>
                <label htmlFor="your-name" className="field-label hide">Teléfono</label>
                <input type="text" className="form-field--field w-input" autoFocus maxLength={256} name="fullName" data-name="your-name" placeholder="Nombre Completo" id="your-name" data-ms-member="Nombre" required value={formData.fullName} onChange={handleChange} />
                {!nameFieldValid &&
                  <span className='wf-error-msg'>Name is invalid</span>
                }
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Correo electrónico</div>
                </div><label htmlFor="your-email" className="field-label hide">Teléfono</label>
                <input type="email" className="form-field--field w-input" maxLength={256} name="email" data-name="your-email" placeholder="Tu correo electrónico" id="your-email" data-ms-member="email" required value={formData.email} onChange={handleChange} />
                {!emailFieldValid &&
                  <span className='wf-error-msg'>Email is invalid</span>
                }
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Tu número</div>
                </div><label htmlFor="your-telephone" className="field-label hide">Teléfono</label>
                <input
                  type="number"
                  className="form-field--field w-input no-spin"
                  maxLength={9}
                  name="phoneNumber"
                  data-name="your-telephone"
                  placeholder="Tu número"
                  id="your-telephone"
                  data-ms-member="telefono"
                  required
                  value={formData.phoneNumber}
                  onInput={validatePhoneField}
                  onChange={handleChange}
                  autoComplete={"do-not-autofill"}
                />
                {!phoneNumberFieldValid &&
                  <span className='wf-error-msg'>Phone number is invalid</span>
                }
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Código de invitacíon</div>
                </div><label htmlFor="your-invite-code" className="field-label hide">Teléfono</label>
                <input type="text" className="form-field--field w-input" maxLength={256} name="invitationCode" data-name="your-invite-code" placeholder="Código" id="your-invite-code" data-ms-member="cupón" required value={formData.invitationCode} onChange={handleChange} />
                {!couponCodeValid &&
                  <span className='wf-error-msg'>Invalid Coupon code</span>
                }
              </div>
              <input type="button" data-wait="Cargando..." value="Siguiente" className="submit-button w-button" onClick={handleSubmit} />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div><span className='wf-error-msg'>{errorMessage}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupOne;