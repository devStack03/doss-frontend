import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import ImgSuffolkPunchFull from '../../assets/images/suffolk-punch-FULL-p-500.png';

const option1 = {
  type: 'loop',
  perPage: 5,
  fixedWidth: '327px',
  gap: '22px',
  arrowPath: 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z',
  breakpoints: {
    478: {
      direction: 'ttb',
      height: '300px',
      autoHeight: true,
      arrows: false,
      type: 'loop',
    },
  }
};
const EventSection = () => {

  return (
    <div id="menu-block--Eventos-" className="menu-block--eventos">
      <div className="block-head">
        <h2 className="dashboard--heading">Heading</h2>
        <div className="dashboard--title">This is some text inside of a div block.</div>
        <div className="slider--block--header">
          <div className="slider-block--emoji">💃</div>
          <div className="slider-block--text">Eventos</div>
        </div>
      </div>

      <Splide className="slider-blovk--basic oferta--splide" hasTrack={false} options={option1}>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">Prev</button>
          <button className="splide__arrow splide__arrow--next">Next</button>
        </div>
        <SplideTrack className="ofertas--track w-dyn-list">
          <SplideSlide className="w-dyn-item tw-rounded-3xl">
            <div className="ofertas--content-block">
              <div className="ofertas--content-text">
                <div className="ofertas-header">
                  <div className="ofertas--title-and-timer">
                    <div className="ofertas--title">Suffolk punch Copy 2</div>
                    <div className="ofertas--timer ofertas--timer-emoji"></div>
                    <div className="ofertas--timer">October 31, 2022</div>
                    <div className="ofertas--timer ofertas--timer-post">left</div>
                  </div>
                  <div className="ofertas--subtitle">culinary cafe + taphouse in South End</div>
                </div>
              </div>
              <a href="/events/suffolk-punch-copy-2" className="link-block link-block--ofertas w-inline-block">
                <div className="offer-block-button offer-block-button_responsive offer-block-button--status-asistir">
                  <div className="currency-icon-value">
                    Asistir
                  </div>
                </div>
              </a>
            </div>
            <div className="ofertas--image-block">
              <img src={ImgSuffolkPunchFull} loading="lazy" alt="Suffolk punch Copy 2" className="ofertas--image" />
            </div>
          </SplideSlide>
        </SplideTrack>
      </Splide>
    </div>
  )
}

export default EventSection;