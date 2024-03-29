import { useState, useEffect } from 'react';
import userService from '../services/user.service';
import { fetchStarted, resultLoaded } from '../store/slices/api.slice';
import { useDispatch, useTypedSelector } from '../store/store';
import { format } from 'date-fns';
import SignupThree from '../components/signup/SignupThree';
import RenewCard from '../components/payment/RenewCard';

const Renew = ({ handleSubscriptionRenewed }: { handleSubscriptionRenewed: () => void }) => {
  const dispatch = useDispatch();
  const { user } = useTypedSelector(state => state.auth);
  const { data } = useTypedSelector(state => state.stripe);
  const [formData, setFormData] = useState({
    subscriptionPlan: 'year',
    subscriptionStart: 'today',
  });

  const [optionSelected, setOptionSelected] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('year');
  const [selectedStart, setSelectedStart] = useState('today');
  const [errorMessage, setErrorMessage] = useState('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [subscriptionCreated, setSubscriptionCreated] = useState(false);
  /** Stripe Data */
  const [prices, setPrices] = useState<any>(null);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  // const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const getPriceList = async () => {
      const { prices } = await userService.priceList().then((res) => res.data);
      setPrices(prices);
    };

    getPriceList();
  }, [])

  const handleSubmit = () => {
    let priceId = null;
    if (prices) {
      for (let index = 0; index < prices.data.length; index++) {
        const element = prices.data[index];
        if (selectedPlan === element.recurring.interval) {
          priceId = element.id;
          setSelectedPriceId(element.id);
        }
      }
      createSubscription(priceId);
    }
  }

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }

  const createSubscription = async (priceId: string) => {
    setErrorMessage('');
    console.log(priceId);
    dispatch(fetchStarted());

    try {

      const { subscriptionId, invoiceData } = await userService.createSubscription({
        customerId: user?.stripeCustomerId,
        priceId
      }).then((r) => (r.data));
      console.log({ subscriptionId, invoiceData });
      setCustomerData({
        subscriptionPlan: selectedPlan,
        subscriptionStart: selectedStart,
        priceId,
        stripeSubscriptionId: subscriptionId,
        stripeClientSecret: invoiceData.payment_intent.client_secret
      });
      setSubscriptionCreated(true);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message)
    } finally {
      dispatch(resultLoaded());
    }
  }

  const renewSubscription = async () => {
    dispatch(fetchStarted());
    userService.renewSubscription().then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleActiveSectionChange = (index: number) => {
    if (index) {
      handleSubscriptionRenewed();
    } else {

    }
  }

  return (
    <>
      <div className="section-fullscreen wf-section">
        {!optionSelected ? (
          <div className="section-fullscreen-container">
            <div className="telephone-form">
              <div className="tw-mb-6">
                {/* <button className="submit-button w-button" onClick={renewSubscription}>Renew</button> */}
                You have cancelled your subscription the &nbsp;
                <span>{format(new Date(data.canceled_at!), "do 'of' MMMM")}</span>.
                Please subscribe to a plan to use doss:
              </div>
              <div className="tw-mx-auto tw-w-full tw-text-center"></div>
              <div><button className="submit-button w-button" onClick={() => setOptionSelected(true)}>Update your plan</button></div>
            </div>
          </div>
        ) : (
          <>
            {subscriptionCreated ? (
              <>
                <RenewCard handleActiveSectionChange={handleActiveSectionChange} option="renew" customerData={customerData} />
              </>
            ) : (
              <div className="section-fullscreen-container">
                <div className="section-fullscreen-text-block">
                  <div className="fullscreen--title">Selecciona tu plan</div>
                  <div className="fullscreen--subtitle">Ahorra un 30% en tu plan anual!</div>
                </div>
                <div className="telephone-form">
                  <div className="w-form">
                    <form id="wf-form-2" name="wf-form-" data-name="" data-ms-form="signup" className="form">
                      <div className="form-field-label--custom form-name--custom">
                        <div className="form-field-label--name">Paso 1/2</div>
                      </div>
                      <div className="plan-proposal-block">
                        <div id="radio-anual" className="radio-button-field plan-radio w-radio tw-w-1/2 tw-mr-3" onClick={() => { setSelectedPlan('year'); }}>
                          <div id="plan-choice--anual" className={selectedPlan === 'year' ? `plan-anual-block plan-anual-block--custom plan-choice tw-w-full` : `plan-anual-block plan-anual-block--custom tw-w-full`}>
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
                          <input type="radio" id="anual" name="subscriptionPlan" value="year" data-name="plan" required plan-name="Anual" className="w-form-formradioinput radio-button hide--opasity w-radio-input" onChange={handleChange} checked={selectedPlan === 'year'} />
                          <span className="hide--opasity w-form-label">Radio 3</span>
                        </div>
                        <div id="radio-month" className="radio-button-field-2 w-radio tw-w-1/2" onClick={() => setSelectedPlan('month')}>
                          <div id="plan-choice--mensual" className={selectedPlan === 'month' ? `plan-anual-block plan-mensual-block--custom plan-choice  tw-w-full` : `plan-anual-block plan-mensual-block--custom  tw-w-full`}>
                            <div className="plan-anual-head plan-mensual-block--title">
                              <div className="plan-mensual-block--title">Mensual</div>
                            </div>
                            <div className="plan-mensual-block--price">12,99€</div>
                            <div className="plan-mensual-block--subtitle">Cancela cuando quieras!</div>
                          </div>
                          <input type="radio" id="mensual" name="subscriptionPlan" value="month" data-name="plan" required
                            plan-name="Mensual" className="w-form-formradioinput radio-button-2 hide--opasity w-radio-input" onChange={handleChange} checked={selectedPlan === 'month'} />
                          <span className="hide--opasity w-form-label">Radio 3</span>
                        </div>
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
                      <div>{errorMessage}</div>
                    </div>
                    <div className="back">
                      <div className="link--prev w-embed">
                        <a href="#" onClick={() => setOptionSelected(false)}> Volver </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div >
            )
            }
          </>
        )}
      </div>
    </>
  );
}

export default Renew;