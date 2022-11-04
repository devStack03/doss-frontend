import { CardElement, useStripe, useElements, PaymentRequestButtonElement, PaymentElement } from '@stripe/react-stripe-js';

import { FormEvent, useState, useEffect } from 'react';

function usePaymentForm() {
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
    });

    if (result.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(result.error.message as string);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    console.log(result);

    // const amountToCharge = 100;

    // const paymentElement = elements?.getElement(PaymentElement);

    // if (!stripe || !elements || !paymentElement) {
    //   return;
    // }

    // const stripeResponse = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement
    // });

    // const { error, paymentMethod } = stripeResponse;

    // if (error || !paymentMethod) {
    //   return;
    // }

    // const paymentMethodId = paymentMethod.id;

    // fetch(`${process.env.REACT_APP_API_URL}/charge`, {
    //   method: 'POST',
    //   body: JSON.stringify(({
    //     paymentMethodId,
    //     amount: amountToCharge
    //   })),
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })

  };

  return {
    handleSubmit
  }
}

export default usePaymentForm;