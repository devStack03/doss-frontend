import NavHeader from '../components/NavHeader';
import PaymentSuccessCheckMark from '../assets/svgs/success-checkmark.svg';
import PaymentSuccessBtn from '../assets/svgs/success-btn.svg'

const PaymentSuccess = () => {
  return (
    <>
      <NavHeader />
      <div className="section-fullscreen wf-section  tw-flex tw-justify-center tw-items-center">
        <div className="section-fullscreen-container">
          <div className="telephone-form tw-w-[570px] tw-max-w-xl">
            <div className="fullscreen--title">
              Hemos recibido tu pago ❤️
            </div>
            <div className="fullscreen--subtitle tw-mt-7 tw-mb-12">
              Pronto recibiras un correo electrónico de confirmación 🎉
            </div>
            <div className="tw-flex tw-justify-center">
              <img src={PaymentSuccessCheckMark} alt="payment-success" />
            </div>

            <div className="tw-flex tw-justify-center tw-mt-14">
              <button>
                <img src={PaymentSuccessBtn} alt="payment-success" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess;