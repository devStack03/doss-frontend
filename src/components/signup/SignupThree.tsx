import ApplePayLogo from '../../assets/images/Apple-Pay-Logo.png';
import { useState } from 'react';
import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
import PaymentForm from '../payment';


const SignupThree = ({ handleActiveSectionChange }: { handleActiveSectionChange: GeneralFuctionType }) => {

  const [formData, setFormData] = useState({
    subscriptionPlan: 'anual',
    subscriptionStart: 'today',
  });

  const [paymentSelected, setPaymentSelected] = useState(false);
  const { userSignupData, setUserSignupData } = useAuth();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    // setUserSignupData({
    //   ...userSignupData,
    // });
    authService.create(userSignupData).then((res) => {
      console.log(res.data);
      if (res.data.status === -1) {
        alert(res.data.error.message);
      } else {
        alert('Success');
      }
    }).catch((err) => {
      alert('Something is wrong')
      console.log(err);
    })

  }

  return (
    <div className="section-fullscreen wf-section">
      <div className="section-fullscreen-container">
        <div className="section-fullscreen-text-block">
          <div className="fullscreen--title">Selecciona tu forma de pago</div>
          <div className="fullscreen--subtitle">Haz click en una de las opciones</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <div id="wf-form-3" data-name="" data-ms-form="signup" className="form">
              <div className="form-field-label--custom form-name--custom">
                <div className="form-field-label--name">Paso 3/3</div>
              </div>
              <div className="plan-header">
                <div className="plan-placeholder--name">Plan</div>
                <div className="plan-placeholder--cost-and-currency">
                  <div className="plan-placeholder--cost">{userSignupData.subscriptionPlan === 'anual' ? `109,99` : `12,99`}</div>
                  <div className="plan-placeholder--currency">€</div>
                </div>
              </div>
              <div className="payment-method">
                <div data-w-id="761696f8-89d2-a04a-6d65-0221837132db" className="payment-method--creditcart" onClick={() => setPaymentSelected(!paymentSelected)}>
                  <div>Tarjeta</div>
                </div>
                <div className="payment-method--applepay">
                  <img sizes="(max-width: 1279px) 65px, (max-width: 1439px) 5vw, 65px" loading="lazy" src={ApplePayLogo} alt="" className="image-2" />
                </div>
              </div>
              {paymentSelected &&
                <>
                  <br />
                  <PaymentForm />
                  <br />
                  <br />
                </>
              }

              <div className="payment-summary">
                <div className="payment-summary--title">Se le cobrarán </div>
                <div id="plan-placeholder" className="plan-placeholder--cost plan-placeholder--cost-custom">{userSignupData.subscriptionPlan === 'anual' ? `109,99` : `12,99`}</div>
                <div className="payment-summary--title">€</div>
              </div>
              <div className="w-embed w-script">

              </div>
              <input type="button" value="Empezar suscripción" data-wait="Please wait..." className="submit-button w-button" onClick={handleSubmit} />
            </div>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
            <div className="back">
              <div className="link--prev w-embed">
                <a href="#"> Volver </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupThree;