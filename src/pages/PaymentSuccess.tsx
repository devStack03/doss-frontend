import NavHeader from '../components/NavHeader';
import PaymentSuccessCheckMark from '../assets/images/check-circle.png';

const PaymentSuccess = () => {
  return (
    <>
      <NavHeader />
      <div className="section-fullscreen wf-section  tw-flex tw-justify-center tw-items-center">
        <div className="section-fullscreen-container">
          <div className="telephone-form tw-max-w-lg">
            <div className="fullscreen--title">Hemos recibido tu pago.</div>
            <div className="fullscreen--subtitle tw-mt-7">Tu suscripcion ha sido procesada correctamente
              Pronto recibiras un correcto electronico de confirmacion.
            </div>
            <div className="tw-flex tw-justify-center">
              <img src={PaymentSuccessCheckMark} alt="payment-success" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess;