import ApplePayLogo from '../../assets/images/Apple-Pay-Logo.png';
import { useState } from 'react';
import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';


const SignupThree = ({ handleActiveSectionChange } : { handleActiveSectionChange: GeneralFuctionType}) => {

  const [formData, setFormData] = useState({
    subscriptionPlan: 'anual',
    subscriptionStart: 'today',
  });

  const [selectedPlan, setSelectedPlan] = useState('anual');
  const [selectedStart, setSelectedStart] = useState('today');

  const { userSignupData, setUserSignupData } = useAuth();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = () => {
    setUserSignupData({
      ...userSignupData,
      subscriptionPlan: selectedPlan,
      subscriptionStart: selectedStart
    });
    handleActiveSectionChange(3);
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
            <form id="wf-form-" name="wf-form-" data-name="" data-redirect="/membership/dashboard" method="get" data-ms-form="signup" className="form">
              <div className="form-field-label--custom form-name--custom">
                <div className="form-field-label--name">Paso 3/3</div>
              </div>
              <div className="plan-header">
                <div className="plan-placeholder--name">Plan</div>
                <div className="plan-placeholder--cost-and-currency">
                  <div className="plan-placeholder--cost">9999</div>
                  <div className="plan-placeholder--currency">€</div>
                </div>
              </div>
              <div className="payment-method">
                <div data-w-id="761696f8-89d2-a04a-6d65-0221837132db" className="payment-method--creditcart">
                  <div>Tarjeta</div>
                </div>
                <div className="payment-method--applepay">
                  <img sizes="(max-width: 1279px) 65px, (max-width: 1439px) 5vw, 65px" loading="lazy" src={ApplePayLogo} alt="" className="image-2" />
                </div>
              </div>
              <div className="payment-method--creditcart-info">
                <div className="form-custom-field-block">
                  <div className="form-field-label--custom">
                    <div className="form-field-label--name">Número de tarjeta</div>
                  </div>
                  <label htmlFor="your-cart-number" className="field-label hide">Teléfono</label>
                  <input type="text" className="form-field--field w-input" autoFocus maxLength={19} name="your-cart-number" data-name="your-cart-number" placeholder="0000 0000 0000 0000" id="your-cart-number" required />
                </div>
                <div className="creditcard--mmyy-cvc">
                  <div className="form-custom-field-block">
                    <div className="form-field-label--custom">
                      <div className="form-field-label--name">MM/YY</div>
                    </div>
                    <label htmlFor="your-cart-date" className="field-label hide">Teléfono</label>
                    <input type="tel" className="form-field--field form-field--field-date w-input" maxLength={5} name="your-cart-date" data-name="your-cart-date" placeholder="MM/YY" id="your-cart-date" required />
                  </div>
                  <div className="form-custom-field-block">
                    <div className="form-field-label--custom">
                      <div className="form-field-label--name">CVC</div>
                    </div>
                    <label htmlFor="your-cvc" className="field-label hide">Teléfono</label>
                    <input type="password" className="form-field--field w-input" maxLength={3} name="your-cvc" data-name="your-cvc" placeholder="CVC" id="your-cvc" required />
                  </div>
                </div>
                <div className="form-custom-field-block hide">
                  <div className="form-field-label--custom">
                    <div className="form-field-label--name">Nombre</div>
                  </div>
                  <label htmlFor="your-pais" className="field-label hide">Teléfono</label>
                  <select id="your-pais" name="your-pais" data-name="your-pais" required className="form-field--field w-select">
                    <option value="Spain">Spain</option>
                    <option value="First">First choice</option>
                    <option value="Second">Second choice</option>
                    <option value="Third">Third choice</option>
                  </select>
                </div>
                <div className="form-custom-field-block">
                  <div className="form-field-label--custom">
                    <div className="form-field-label--name">Nombre</div>
                  </div>
                  <label htmlFor="your-name" className="field-label hide">Teléfono</label>
                  <input type="text" className="form-field--field w-input" maxLength={256} name="your-name" data-name="your-name" placeholder="Nombre Completo" id="your-name" data-ms-member="Nombre" required />
                </div>
              </div>
              <div className="payment-summary">
                <div className="payment-summary--title">Se le cobrarán </div>
                <div id="plan-placeholder" className="plan-placeholder--cost plan-placeholder--cost-custom">9999</div>
                <div className="payment-summary--title">€</div>
              </div>
              <div className="w-embed w-script">

              </div><input type="submit" value="Empezar suscripción" data-wait="Please wait..." className="submit-button w-button" />
            </form>
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