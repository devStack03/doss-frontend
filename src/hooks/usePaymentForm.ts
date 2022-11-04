import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';

function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const amountToCharge = 100;

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    fetch(`${process.env.REACT_APP_API_URL}/charge`, {
      method: 'POST',
      body: JSON.stringify(({
        paymentMethodId,
        amount: amountToCharge
      })),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

  };

  return {
    handleSubmit
  }
}

export default usePaymentForm;