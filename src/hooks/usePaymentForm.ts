import { useStripe, useElements } from '@stripe/react-stripe-js';

import { FormEvent, useState, useEffect } from 'react';

function usePaymentForm({callback} : {callback: (paymentIntent: any, error: boolean) => void}) {
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const elements = useElements();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location}payment-status`,
      },
      redirect: 'if_required'
    });

    if (result.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(result.error.message as string);
      callback(null, true);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      
      callback(result.paymentIntent, false);
    }
  };

  return {
    handleSubmit
  }
}

export default usePaymentForm;