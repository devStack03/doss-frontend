import React, { useState } from 'react';
import ImgFrame from '../../assets/images/Frame.png';
const InviteSection = () => {
  return (
    <div id="menu-block--Invitar" className="menu-block--invitar">
      <div className="block-head">
        <h2 className="dashboard--heading">Invite a friend</h2>
        <div className="dashboard--title">Provide info bla bla bla</div>
      </div>
      <div className="block--invitar-form">
        <div className="text-block-12">We value friendship. <br />At exactly $20</div>
        <div className="text-block-13">You and your frind get <strong>FREE </strong>rind</div>
        <img
          src={ImgFrame}
          loading="lazy"
          sizes="100vw"
          alt=""
          className="image-4" />
        <div className="form-block w-form">
          <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
            <input
              type="email"
              className="invitar-form--email w-input"
              autoFocus maxLength={256}
              name="email"
              data-name="Email"
              placeholder="Email"
              id="email"
              required />
            <input
              type="submit"
              value="Mandar invitación"
              data-wait="Please wait..."
              className="submit-button-2 w-button" />
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
  )
}

export default InviteSection;