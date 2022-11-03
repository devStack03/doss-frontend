import { useState } from 'react';
import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';

const SignupTwo = ({ handleActiveSectionChange }: { handleActiveSectionChange: GeneralFuctionType }) => {

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
          <div className="fullscreen--title">Selecciona tu plan</div>
          <div className="fullscreen--subtitle">Ahorra un 30% en tu plan anual!</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <form id="wf-form-" name="wf-form-" data-name="" data-ms-form="signup" className="form">
              <div className="form-field-label--custom form-name--custom">
                <div className="form-field-label--name">Paso 2/3</div>
              </div>
              <div className="plan-proposal-block">
                <label className="radio-button-field plan-radio w-radio"  onClick={() => {setSelectedPlan('anual');}}>
                  <div id="plan-choice--anual" className={selectedPlan === 'anual' ? `plan-anual-block plan-anual-block--custom plan-choice` : `plan-anual-block plan-anual-block--custom`}>
                    <div className="plan-anual-head">
                      <div className="plan-anual-name">Anual</div>
                      <div className="plan-anual-count-block">
                        <div className="plan-anual-amount">-30%</div>
                      </div>
                    </div>
                    <div className="plan-anual-subhead">
                      <div className="plan-anual-subhead--title">109,99€</div>
                      <div className="block-anual-subhead--subtitle">Ahorra un 30%!</div>
                    </div>
                  </div>
                  <input type="radio" id="anual" name="subscriptionPlan" value="anual" data-name="plan" required plan-name="Anual" className="w-form-formradioinput radio-button hide--opasity w-radio-input" onChange={handleChange} checked={selectedPlan === 'anual'} />
                  <span className="hide--opasity w-form-label">Radio 3</span>
                </label>
                <label className="radio-button-field-2 w-radio" onClick={() => setSelectedPlan('month')}>
                  <div id="plan-choice--mensual" className={selectedPlan === 'month' ? `plan-anual-block plan-mensual-block--custom plan-choice` : `plan-anual-block plan-mensual-block--custom`}>
                    <div className="plan-anual-head plan-mensual-block--title">
                      <div className="plan-mensual-block--title">Mensual</div>
                    </div>
                    <div className="plan-mensual-block--price">12,99€</div>
                    <div className="plan-mensual-block--subtitle">Cancela cuando quieras!</div>
                  </div>
                  <input type="radio" id="mensual" name="subscriptionPlan" value="month" data-name="plan" required
                    plan-name="Mensual" className="w-form-formradioinput radio-button-2 hide--opasity w-radio-input" onChange={handleChange} checked={selectedPlan === 'month'} />
                  <span className="hide--opasity w-form-label">Radio 3</span>
                </label>
              </div>
              <div className="cuando-quieres--block">
                <div className="cuando-quieres--title">¿Cuando quieres que empiece tu suscripción?</div>
                <label className="w-radio" onClick={() => setSelectedStart('today')}>
                  <input type="radio" id="Hoy" name="subscriptionStart" value="today" data-name="subscription-start" required className="w-form-formradioinput w-radio-input" onChange={handleChange} checked={formData.subscriptionStart === 'today'} />
                  <span className="cuando-quieres--radio w-form-label">Hoy</span>
                </label>
                <label className="w-radio" onClick={() => setSelectedStart('month')}>
                  <input type="radio" id="1st-of-VARIABLE-NEXT-MONTH" name="subscriptionStart" value="month" data-name="subscription-start" required className="w-form-formradioinput w-radio-input" onChange={handleChange} checked={formData.subscriptionStart === 'month'} />
                  <span className="cuando-quieres--radio w-form-label">El primero del próximo mes.</span>
                </label>
              </div>
              <ul role="list" className="plan-list">
                <li className="plan-list--item">
                  <div>Si eliges hoy tu suscripción empezara a contar<br />desde hoy.</div>
                </li>
                <li>
                  <div>We&#x27;ll start billing you for your annual membership once your account is created.</div>
                </li>
              </ul>
              <div className="w-embed w-script">
                <input type="hidden" id="hidden-input-for--your-name" name="your-name" />
              </div>
              <input type="button" data-wait="Please wait..." value="Siguiente" className="submit-button w-button" onClick={handleSubmit} />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
            <div className="back">
              <div className="link--prev w-embed">
                <a href="#" onClick={() => { }}> Volver </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupTwo;