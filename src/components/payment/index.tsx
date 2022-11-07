
import { forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { PaymentElement, useElements } from '@stripe/react-stripe-js';
import usePaymentForm from '../../hooks/usePaymentForm';
import { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLFormElement;

const PaymentForm = forwardRef((props: any, ref) => {
  const { handleSubmit } = usePaymentForm(props);
  const form = useRef<HTMLFormElement | null>(null);
  useImperativeHandle(ref, () => ({
    callSubmit() {
      // form.current && form.current.submit();
      form?.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }));

  const handleElementChange = (e: StripePaymentElementChangeEvent) => {
    console.log(e);
  }

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <PaymentElement onChange={handleElementChange} />
      <br />
    </form>
  );
});

export default PaymentForm;