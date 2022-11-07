import { useState, useRef } from 'react';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/auth.service';
import PaymentForm from '../payment';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { fetchStarted, resultLoaded } from '../../store/slices/api.slice';
import { useDispatch } from '../../store/store';
import Alert from '@mui/material/Alert';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const SignupThree = ({ handleActiveSectionChange, option }: { handleActiveSectionChange: GeneralFuctionType, option: string }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSignupData, setUserSignupData } = useAuth();
  const [cardError, setCardError] = useState(false);
  const appearance = {
    theme: 'stripe'
  } as Appearance;

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: userSignupData.stripeClientSecret,
    // Fully customizable with appearance API.
    appearance,
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    }
  };

  const [paymentSelected, setPaymentSelected] = useState(true);

  const childRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    // setUserSignupData({
    //   ...userSignupData,
    // });
    setCardError(false);
    dispatch(fetchStarted());
    childRef?.current?.callSubmit();
  }

  const handlePaymentCallback = (paymentIntent: any, error: boolean) => {
    console.log(error);
    if (error) {
      setCardError(true);
      dispatch(resultLoaded());
    } else {
      authService.create({
        ...userSignupData,
        lastPaymentStatus: paymentIntent.status
      }).then((res) => {
        console.log(res.data);
        if (res.data.status === -1) {
          alert(res.data.error.message);
        } else {
          navigate('/payment-success');
        }
      }).catch((err) => {
        alert('Something is wrong')
        console.log(err);
      }).finally(() => {
        dispatch(resultLoaded());
      })
    }

  }

  return (
    <div className="section-fullscreen wf-section">
      {cardError &&
        <div className="tw-mx-auto">
          <Alert severity="error" className="tw-flex tw-justify-center">Your card details are wrong!</Alert>
        </div>
      }
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
              {paymentSelected &&
                <>
                  <Elements stripe={stripePromise} options={options}>
                    <PaymentForm ref={childRef} callback={handlePaymentCallback} />
                  </Elements>
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
                <a href="#" onClick={() => handleActiveSectionChange(1)}> Volver </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupThree;