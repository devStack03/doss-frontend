
import React, { forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { CardElement, PaymentElement } from '@stripe/react-stripe-js';
import usePaymentForm from '../../hooks/usePaymentForm';
interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLFormElement;

const PaymentForm = forwardRef((props, ref) => {
  const { handleSubmit } = usePaymentForm();
  const form = useRef<HTMLFormElement | null>(null);
  useImperativeHandle(ref, () => ({
    callSubmit() {
      // form.current && form.current.submit();
      form?.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }));

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <PaymentElement />
      <br />
      <button>Pay</button>
    </form>
  );
});

export default PaymentForm;