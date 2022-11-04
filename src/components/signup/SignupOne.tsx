import { useState, useContext } from 'react';
import { GeneralFuctionType } from '../../@types/props.types';
import useAuth from '../../hooks/useAuth';

const SignupOne = ({ handleActiveSectionChange } : { handleActiveSectionChange: GeneralFuctionType}) => {

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    invitationCode: '',
    email: ''
  });

  const { userSignupData, setUserSignupData } =  useAuth();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({...values, [name]: value}))
  }

  const handleSubmit = () => {
    setUserSignupData({
      ...userSignupData,
      ...formData
    });
    handleActiveSectionChange(2);
  }

  return (
    <div className="section-fullscreen wf-section">
      <div className="section-fullscreen-container">
        <div className="section-fullscreen-text-block">
          <div className="fullscreen--title">Bienvenid@ a Doss</div>
          <div className="fullscreen--subtitle">Estas a solo tres pasos de hacerte miembro del gastro club que esta arransando en Madriz.</div>
        </div>
        <div className="telephone-form">
          <div className="w-form">
            <form id="wf-form-1" name="wf-form-" data-name="" data-ms-form="signup">
              <div className="form-field-label--custom form-name--custom">
                <div className="form-field-label--name">Paso 1/3</div>
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Nombre</div>
                </div>
                <label htmlFor="your-name" className="field-label hide">Teléfono</label>
                <input type="text" className="form-field--field w-input" autoFocus maxLength={256} name="fullName" data-name="your-name" placeholder="Nombre Completo" id="your-name" data-ms-member="Nombre" required value={formData.fullName} onChange={handleChange}/>
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Correo electrónico</div>
                </div><label htmlFor="your-email" className="field-label hide">Teléfono</label>
                <input type="email" className="form-field--field w-input" maxLength={256} name="email" data-name="your-email" placeholder="Tu correo electrónico" id="your-email" data-ms-member="email" required value={formData.email} onChange={handleChange}/>
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Tu número</div>
                </div><label htmlFor="your-telephone" className="field-label hide">Teléfono</label>
                <input type="tel" className="form-field--field w-input" maxLength={256} name="phoneNumber" data-name="your-telephone" placeholder="Tu número" id="your-telephone" data-ms-member="telefono" required value={formData.phoneNumber} onChange={handleChange}/>
              </div>
              <div className="form-custom-field-block">
                <div className="form-field-label--custom">
                  <div className="form-field-label--name">Código de invitacíon</div>
                </div><label htmlFor="your-invite-code" className="field-label hide">Teléfono</label>
                <input type="text" className="form-field--field w-input" maxLength={256} name="invitationCode" data-name="your-invite-code" placeholder="Código" id="your-invite-code" data-ms-member="cupón" required value={formData.invitationCode} onChange={handleChange} />
              </div>
              <input type="button" data-wait="Cargando..." value="Siguiente" className="submit-button w-button" onClick={handleSubmit}/>
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupOne;