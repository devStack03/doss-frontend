
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import usePaymentForm from '../../hooks/usePaymentForm';

const PaymentForm = () => {
  const { handleSubmit } = usePaymentForm();

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <br />
      {/* <button>Pay</button> */}
    </form>
  );
};

export default PaymentForm;