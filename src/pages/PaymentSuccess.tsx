import { useNavigate } from 'react-router-dom'
import NavHeader from '../components/NavHeader';
import PaymentSuccessCheckMark from '../assets/svgs/success-checkmark.svg';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavHeader />
      <div className="section-fullscreen wf-section  tw-flex tw-justify-center tw-items-center">
        <div className="section-fullscreen-container tw-container">
          <div className="telephone-form tw-w-full md:tw-w-[570px] tw-max-w-xl">
            <div className="fullscreen--title tw-text-2xl md:tw-text-[28px]">
              Hemos recibido tu pago ❤️
            </div>
            <div className="fullscreen--subtitle tw-mt-7 tw-mb-12">
              Pronto recibiras un correo electrónico de confirmación 🎉
            </div>
            <div className="tw-flex tw-justify-center">
              <img src={PaymentSuccessCheckMark} alt="payment-success" />
            </div>

            <div className="tw-flex tw-justify-center tw-mt-14">
              {/* <button className="
                tw-w-[196px]
                tw-h-[48px]
                tw-bg-[#D9D9D9]
                tw-rounded-[8px] 
                tw-font-semibold 
                tw-text-sm
                submit-button w-button"
                onClick={() => navigate('/dashboard')}>
                Iniciar sesión
              </button> */}
              <input
                type="button"
                data-wait="Cargando..."
                value="Iniciar sesión"
                className="
                  submit-button 
                  w-button 
                  tw-w-[196px]
                  tw-h-[48px]
                  tw-rounded-[8px] 
                "
                onClick={() => navigate('/dashboard')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess;