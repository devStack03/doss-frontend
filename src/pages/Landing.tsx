
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
  Link
} from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Default theme
// import '@splidejs/react-splide/css';

// or other themes
// import '@splidejs/react-splide/css/skyblue';
// import '@splidejs/react-splide/css/sea-green';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Slider from "react-slick";

import { PreloadMedia, MediaType } from 'react-preload-media';

import LogoBlack from '../assets/images/logo-black.svg';
import Union1 from '../assets/images/Union-1.png';
import Union2 from '../assets/images/Union-2.png';
import ImgQuote from '../assets/images/quote.png';
import ImgLable from '../assets/images/lable.png';
import ImgSuffolkPunchFull from '../assets/images/suffolk-punch-FULL-p-500.png';
import ImgSplideOne from '../assets/images/635132af0c9e8e141b8db4e4_2a1f1649ea15fec3ca9c52d3da69d91e.png';
import ImgSplideTwo from '../assets/images/634e80e11c2d3c43e986b207_a245b1fb535200c4dad10e7baccc9975.png';
import ImgSplideThree from '../assets/images/6351329d6de2a5c9c782e52a_dac68f2397d62fdb22114ea36ecdda27.png';
import ImgAva from '../assets/images/ava.jpg';
import LogoWhite from '../assets/images/logo-white.svg';
import UnaEnUnRestaurante from '../assets/images/una-mujer-en-un-restaurante.png';
import OfferCarouselItem from '../components/landing/OfferCarouselItem';
import LoadingScreen from '../components/LoadingScreen';

const media = [
  { type: MediaType.Image, url: LogoBlack },
  { type: MediaType.Image, url: Union1 },
  { type: MediaType.Image, url: Union2 },
  { type: MediaType.Image, url: ImgQuote },
  { type: MediaType.Image, url: ImgLable },
  { type: MediaType.Image, url: ImgSuffolkPunchFull },
  { type: MediaType.Image, url: ImgSplideOne },
  { type: MediaType.Image, url: ImgSplideTwo },
  { type: MediaType.Image, url: ImgSplideThree },
  { type: MediaType.Image, url: ImgAva },
  { type: MediaType.Image, url: LogoWhite },
  { type: MediaType.Image, url: UnaEnUnRestaurante },
];

const Landing = () => {
  const navigate = useNavigate();
  const [isLoaded, loaded] = useReducer(() => true, false);
  const offerImgList = [
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
    ImgSuffolkPunchFull,
  ]
  const settings0 = {
    arrows: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 8000,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 1200,
      settings: {
        variableWidth: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        variableWidth: true,
      }
    }
    ]
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,

        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      }
    ]
  };

  const option1 = {
    type: 'loop',
    pagination: false,
    perPage: 3,
    fixedWidth: '327px',
    gap: '22px',
    breakpoints: {
      1250: {
        arrows: false,
        fixedWidth: '311px',
        gap: '22px',
      },
      400: {
        arrows: false,
        fixedWidth: '240px',
        gap: '22px',
      },
    }
  };

  const option2 = {
    type: 'loop',
    pagination: false,
    perPage: 3,
    fixedWidth: '327px',
    gap: '22px',
    breakpoints: {
      1250: {
        arrows: false,
        fixedWidth: '311px',
        gap: '22px',
      },
      400: {
        arrows: false,
        fixedWidth: '240px',
        gap: '22px',
      },
    }
  }

  useEffect(() => {
    var arrowPrevElements = document.getElementsByClassName("splide__arrow--prev");
    arrowPrevElements[1]?.classList.add("splide__arrow--prev-custom");
    var arrowNextElements = document.getElementsByClassName("splide__arrow--next");
    arrowNextElements[1]?.classList.add("splide__arrow--next-custom");
    document.body.style.overflow = "scroll";


    // document.addEventListener('DOMContentLoaded', function () {

    //   homeMenuIconMobileOpen?.addEventListener('click', function () {
    //     homeMenuListMobile!.style.display = "flex";
    //     homeMenuIconMobileOpen!.style.display = "none";
    //     homeMenuIconMobileClose!.style.display = "block";
    //     document.body.style.overflow = "hidden";
    //     homeMenuBlock!.style.backgroundColor = "white";
    //     homeMenuBlock!.style.marginBottom = "0px";
    //   });
    //   homeMenuIconMobileClose!.addEventListener('click', function () {
    //     homeMenuListMobile!.style.display = "none";
    //     homeMenuIconMobileOpen!.style.display = "block";
    //     homeMenuIconMobileClose!.style.display = "none";
    //     document.body.style.overflow = "scroll";
    //     homeMenuBlock!.style.backgroundColor = "transparent";
    //     homeMenuBlock!.style.marginBottom = "-144px";
    //   });
    // });
  });

  useEffect(() => {
    return () => {
      document.body.style.overflow = "scroll";
      console.log("cleaned up");
    };
  }, []);

  const handleClickMobileMenuOpen = () => {
    const homeMenuListMobile = document.getElementById('home-menu-list--mobile');
    const homeMenuIconMobileOpen = document.getElementById('home-menu-icon--mobile__open');
    const homeMenuIconMobileClose = document.getElementById('home-menu-icon--mobile__close');
    const homeMenuBlock = document.getElementById('home-menu__block');

    homeMenuListMobile!.style.display = "flex";
    homeMenuIconMobileOpen!.style.display = "none";
    homeMenuIconMobileClose!.style.display = "block";
    document.body.style.overflow = "hidden";
    homeMenuBlock!.style.backgroundColor = "white";
    homeMenuBlock!.style.marginBottom = "0px";
  }

  const handleClickMobileMenuClose = () => {
    const homeMenuListMobile = document.getElementById('home-menu-list--mobile');
    const homeMenuIconMobileOpen = document.getElementById('home-menu-icon--mobile__open');
    const homeMenuIconMobileClose = document.getElementById('home-menu-icon--mobile__close');
    const homeMenuBlock = document.getElementById('home-menu__block');

    homeMenuListMobile!.style.display = "none";
    homeMenuIconMobileOpen!.style.display = "block";
    homeMenuIconMobileClose!.style.display = "none";
    document.body.style.overflow = "scroll";
    homeMenuBlock!.style.backgroundColor = "transparent";
    homeMenuBlock!.style.marginBottom = "-144px";
  }

  return (
    <>
      <PreloadMedia media={media} onFinished={() => loaded()}>
        <div className="preloading-container">
        {!isLoaded &&
          <LoadingScreen />
        }
        </div>
      </PreloadMedia>
      {isLoaded ? (
        <>
          <div id="home-menu__block" className="homepage-menu__main wf-section">
            <div className="menu-main__container">
              <div className="menu-main__logo">
                <img src={LogoBlack} loading="lazy" alt="" />
              </div>
              <div id="home-menu-list--mobile" className="menu-home__menu-list">
                <Link to="/signup" className="menu-list__button--dark w-button">Tengo Un Código</Link>
                <Link to="/login" className="menu-list__button--light w-button">Iniciar Sesión</Link>
              </div>
              <div id="home-menu-icon--mobile" className="home-nav-mobile--icon-block">
                <img src={Union1} loading="lazy" id="home-menu-icon--mobile__open" alt="" onClick={handleClickMobileMenuOpen} className=" tw-cursor-pointer" />
                <img src={Union2} loading="lazy" id="home-menu-icon--mobile__close" alt="" className="image-7 tw-cursor-pointer" onClick={handleClickMobileMenuClose} />
              </div>
            </div>
          </div>
          <div className="navbar hide wf-section">
            <div data-w-id="22adec4b-42aa-64b1-612e-23065a88637c" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-container w-nav">
              <div className="container-regular">
                <div className="navbar-wrapper navbar--homepage">
                  <a href="index.html" aria-current="page" className="navbar-brand w-nav-brand w--current">
                    <img src={LogoBlack} loading="lazy" alt="" className="doss-logo-black" />
                  </a>
                  <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                    <ul data-w-id="22adec4b-42aa-64b1-612e-23065a886382" role="list" className="nav-menu w-list-unstyled">
                      <li className="list-item">
                        <a href="#" className="nav-link">About</a>
                      </li>
                      <li className="list-item-2">
                        <a href="#" className="nav-link">Feature</a>
                      </li>
                      <li className="list-item-3">
                        <a href="#" className="nav-link">User Examples</a>
                      </li>
                      <li className="list-item-4">
                        <a href="#" className="nav-link">Pricing</a>
                      </li>
                      <li className="list-item-5">
                        <div data-hover="false" data-delay="0" className="nav-dropdown w-dropdown">
                          <div className="nav-dropdown-toggle w-dropdown-toggle">
                            <div className="nav-dropdown-icon w-icon-dropdown-toggle"></div>
                            <div>Resources</div>
                          </div>
                          <nav className="nav-dropdown-list shadow-three mobile-shadow-hide w-dropdown-list">
                            <a href="#" className="nav-dropdown-link w-dropdown-link">Resource Link 1</a>
                            <a href="#" className="nav-dropdown-link w-dropdown-link">Resource Link 2</a>
                            <a href="#" className="nav-dropdown-link w-dropdown-link">Resource Link 3</a>
                          </nav>
                        </div>
                      </li>
                      <li className="mobile-margin-top-10">
                        <div className="nav-button-wrapper">
                          <a href="sign-up/signup-step-1.html" className="button-primary w-button">Tengo un código</a>
                        </div>
                      </li>
                      <li className="mobile-margin-top-10">
                        <div className="nav-button-wrapper">
                          <a href="login/phone.html" className="button-primary button-secondary">Iniciar Sesión</a>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <div data-w-id="22adec4b-42aa-64b1-612e-23065a8863a0" className="menu-button w-nav-button"><img src={Union1} loading="lazy" data-w-id="b271a3de-fdef-f1c8-b019-f91cb59d9bba" alt="" className="menu-image--open" /><img src={Union2} loading="lazy" alt="" className="menu-image--close" />
                    <div className="icon-2 w-icon-nav-menu"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-main wf-section">
            <div className="container-main w-container">
              <div className="main-div">
                <h1 className="heading">El Gastro Club que está arrasando en Madriz!</h1>
                <p className="main-description">Suscríbete por solo <strong>12.99€</strong> y disfruta de 2 restaurantes nuevos cada mes y de acceso a eventos exclusivos solo para miembros.</p>
                <a href="#" className="main-link">Solicitar Invitación</a>
              </div>
            </div>
          </div>
          <div className="section-cover-main wf-section"></div>
          <div className="section-social wf-section">
            <div className="container-social w-container">
              <div className="social-div">
                <div className="social-title">GASTRO CLUB SOCIAL</div>
                <h4 className="social-heading">Prepárate para descubrir restaurantes únicos, asistir a eventos exclusivos para miembros, mientras te enamoras más y más de tu ciudad ❤️</h4>
                <p className="social-description">Porque la vida es demasiado corta para estar atrapado en el sofá. <br />El Gastro Club que está arrasando en Madrid y qué pronto estará en <strong>Barcelona </strong>⛪</p>
              </div>
            </div>
          </div>
          <div className="section-cover-telephone wf-section"></div>
          <section className="section-functiona wf-section">
            <div className="container">
              <p className="pricing-description">DOSS - GASTRO &amp; SOCIAL<br /></p>
              <h2 className="centered-heading">¿Cómo funciona?</h2>
              <div className="pricing-grid">
                <div id="w-node-db0abc3a-c6e4-8b51-c826-a5078e56f5ae-51b98b83" className="pricing-card-three"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a55c612aae2_portfolio%202%20-%20wide.svg" loading="lazy" alt="" className="pricing-image" />
                  <div className="pricing-card-text-img">💌</div>
                  <h3 className="pricing-card-heading">1</h3>
                  <p className="pricing-card-text">El primero de cada mes, te mandaremos por correo electrónico 2 restaurantes cuidadosamente seleccionados para que los pruebes.</p>
                  <a href="#" className="text-link-arrow w-inline-block">
                    <div>Learn more</div>
                    <div className="arrow-embed w-embed"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z" fill="currentColor"></path>
                    </svg></div>
                  </a>
                </div>
                <div id="w-node-db0abc3a-c6e4-8b51-c826-a5078e56f5b8-51b98b83" className="pricing-card-three"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124ace5e12aae4_portfolio%204%20-%20wide.svg" loading="lazy" alt="" className="pricing-image" />
                  <div className="pricing-card-text-img">💸</div>
                  <h3 className="pricing-card-heading">2</h3>
                  <p className="pricing-card-text">Disfruta de un saldo de entre 10-15€ en cada ubicación o de un plato especial fuera de carta.</p>
                  <a href="#" className="text-link-arrow w-inline-block">
                    <div>Learn more</div>
                    <div className="arrow-embed w-embed"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z" fill="currentColor"></path>
                    </svg></div>
                  </a>
                </div>
                <div id="w-node-db0abc3a-c6e4-8b51-c826-a5078e56f5c2-51b98b83" className="pricing-card-three"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124af1aa12aadf_placeholder%201.svg" loading="lazy" alt="" className="pricing-image" />
                  <div className="pricing-card-text-img">🤩</div>
                  <h3 className="pricing-card-heading">3</h3>
                  <p className="pricing-card-text">Tienes hasta fin de mes para probar cada restaurante. Invita a tus amigos y disfruta 🎉</p>
                  <a href="#" className="text-link-arrow w-inline-block">
                    <div>Learn more</div>
                    <div className="arrow-embed w-embed"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.72 15L16.3472 10.357C16.7732 9.92932 16.7732 9.23603 16.3472 8.80962L11.72 4.16667L10.1776 5.71508L12.9425 8.4889H4.16669V10.6774H12.9425L10.1776 13.4522L11.72 15Z" fill="currentColor"></path>
                    </svg></div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="section-newsletter wf-section">
            <div className="container-newsletter w-container">
              <div className="newsletter-div">
                <div className="newsletter-div-left">
                  <h1 className="newsletter-div-left-heading">Tu nuevo restaurante favorito a un click.</h1><img src={ImgQuote} loading="lazy" alt="" className="newsletter-div-left-img" />
                  <blockquote className="block-quote"><em className="block-quote-quote">“Doss se paga solo cada mes y me ayuda a probar nuevos lugares increíbles de los que nunca habría oído hablar.”</em> <br /><strong className="block-quote-author">Alejandro G.</strong></blockquote>
                </div>
                <div className="newsletter-div-right"><img src={UnaEnUnRestaurante} loading="lazy" alt="una mujer en un restaurante" className="newsletter-div-right-img" /></div>
              </div>
            </div>
          </div>
          <div className="section-offers wf-section">
            <div className="container-offers">
              <div className="header-wrapper">
                <div className="header-wrapper_right">
                  <p className="mb-0">Connect it to any collection list or static items, position and style the nav arrows wherever, and filter by another collection if needed!</p>
                </div>
                <div className="header-wrapper_left">
                  <div className="card-slider_nav">
                    <div data-hover="false" data-delay="0" className="w-dropdown">
                      <div className="btn btn-primary cc-dropdown w-dropdown-toggle">
                        <div id="active-state" className="d-inline-block">Filter Category</div>
                        <div className="btn-icon w-embed"><svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 2.3125L6.375 6.6875L10.75 2.3125" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"></path>
                        </svg></div>
                      </div>
                      <nav className="dropdown-list w-dropdown-list">
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item"></div>
                          </div>
                          <div className="w-dyn-empty"></div>
                        </div>
                      </nav>
                    </div>
                    <a id="cms-slider-left" href="#" className="btn btn-primary card-slider_nav-btn w-inline-block">
                      <div className="card-slider_nav-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.12 11.41" fill="currentColor">
                        <g>
                          <g>
                            <path d="M5.71,0,0,5.71l5.71,5.7L7.12,10,2.83,5.71l4.29-4.3Z"></path>
                          </g>
                        </g>
                      </svg></div>
                    </a>
                    <a id="cms-slider-right" href="#" className="btn btn-primary card-slider_nav-btn w-inline-block">
                      <div className="card-slider_nav-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.12 11.41" fill="currentColor">
                        <g>
                          <g>
                            <path d="M1.41,11.41l5.71-5.7L1.41,0,0,1.41l4.29,4.3L0,10Z"></path>
                          </g>
                        </g>
                      </svg></div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="collection-list-wrapper w-dyn-list">
                <Slider {...settings} className="cms-slider w-dyn-items">
                  {offerImgList.map((list, index) => (
                    <OfferCarouselItem imageSrc={list} key={index} />
                  ))}

                </Slider>
                {/* <Splide className="section-blog-slider" hasTrack={false} options={option1}>
              <SplideTrack className="w-dyn-list">
                {offerImgList.map((list, index) => (
                  <SplideSlide className="w-dyn-item">
                    <OfferCarouselItem imageSrc={list} key={index} />
                  </SplideSlide>
                ))}

              </SplideTrack>
            </Splide> */}

              </div>
              <a href="#" className="offers-newsletter-button w-button">Ver ejemplo de newsletter</a>
            </div>
          </div>
          <div className="section-blog wf-section">
            <div className="section-blog-container">
              <div className="section-blog-general"><img src={ImgLable} loading="lazy" alt="BENEFICIOS lable" />
                <h3 className="heading-4 section-blog-heading">Ventajas exclusivas y eventos privados solo para miembros.</h3>
                <div className="text-block-4">Doss ademas de ser un club gastronomico también es un club social. Organizamos eventos privados para que nuestros miembros sociabilicen y compartan su aficion por lo culinario.</div>
              </div>
              <Splide className="section-blog-slider" hasTrack={false} options={option1}>
                <SplideTrack className="w-dyn-list">
                  <SplideSlide className="w-dyn-item">
                    <div className="blog--post-content">
                      <div className="blog--post-content-text">
                        <div className="blog--post-title">Pre-opening party Copy 3</div>
                        <div className="blog--post-subtitle">Hopfly brewing</div>
                        <div className="blog--post-category">Sunt Deleniti</div>
                      </div>
                      <div className="blog-post-content-image">
                        <img src={ImgSplideOne}
                          loading="lazy" alt="Pre-opening party Copy 3"
                          sizes="(max-width: 479px) 102.59375px, (max-width: 991px) 37vw, 327px"
                          className="image" /></div>
                    </div>
                  </SplideSlide>
                  <SplideSlide className="w-dyn-item">
                    <div className="blog--post-content">
                      <div className="blog--post-content-text">
                        <div className="blog--post-title">Pre-opening party Copy 3</div>
                        <div className="blog--post-subtitle">Hopfly brewing</div>
                        <div className="blog--post-category">Sunt Deleniti</div>
                      </div>
                      <div className="blog-post-content-image">
                        <img src={ImgSplideThree}
                          loading="lazy" alt="Pre-opening party Copy 3"
                          sizes="(max-width: 479px) 102.59375px, (max-width: 991px) 37vw, 327px"
                          className="image" /></div>
                    </div>
                  </SplideSlide>
                  <SplideSlide className="w-dyn-item">
                    <div className="blog--post-content">
                      <div className="blog--post-content-text">
                        <div className="blog--post-title">Pre-opening party Copy TEST TEST TEST TEST TEST TEST TEST</div>
                        <div className="blog--post-subtitle">Hopfly brewing</div>
                        <div className="blog--post-category">Sunt Deleniti</div>
                      </div>
                      <div className="blog-post-content-image"><img src={ImgSplideTwo} loading="lazy" alt="" className="image" /></div>
                    </div>
                  </SplideSlide>
                </SplideTrack>
              </Splide>
            </div>
          </div>
          <div className="section-subscription wf-section">
            <div className="section-subscription-content">
              <div className="text-block-2">Sincroniza tu suscripción con tus amig@s</div>
              <div className="text-block-3">Doss se ha convertido en la excusa perfecta para quedar con amigos y descubrir nuevos restaurantes.</div>
            </div>
          </div>
          <div className="section-cover-table wf-section"></div>
          <div className="section-testimonials wf-section">
            <div className="section-testimonials-content">
              <div className="section-testimonials-header">Lo que nuestros miembros cuentan:</div>
              <div className="text-block-5">Ya somos más de 1000+ miembros en Madrid.</div>
            </div>
            <Splide className="section-testimonials-slider" hasTrack={false} options={option1}>
              <SplideTrack className="testimonials-splide__track">
                <SplideSlide className="testimonials-splide__slider">
                  <div className="blog--post-content testimonials--post-content">
                    <div className="blog--post-content-text testimonials--post-content-text">
                      <div className="testimonials-content--just-to-float">
                        <div className="testimonials-content--header">”</div>
                        <blockquote className="testimonials-content--quote">A good review should describe various aspects of the customer experience. Did the customer receive fantastic customer service? Was an employee particularly helpful, and did the customer leave the employee’s name. <br /><br />Responding to this type of review can be tough. Without details to go off of, it can be difficult to know how to respond. Start by asking if the reviewer could give more details about their experience, then switch to email or direct messaging to finish solving the issue.</blockquote>
                      </div>
                      <a href="#" className="testimonials-content--author w-inline-block"><img src={ImgAva} loading="lazy" sizes="(max-width: 991px) 34px, (max-width: 1279px) 3vw, (max-width: 1439px) 34px, (max-width: 1919px) 2vw, 34px" alt="" className="testimonials-content--author-photo" />
                        <div className="testimonials-content--author-name">sara.indiana_92</div>
                      </a>
                    </div>
                  </div>
                </SplideSlide>
                <SplideSlide className="testimonials-splide__slider">
                  <div className="blog--post-content testimonials--post-content">
                    <div className="blog--post-content-text testimonials--post-content-text">
                      <div className="testimonials-content--just-to-float">
                        <div className="testimonials-content--header">”</div>
                        <blockquote className="testimonials-content--quote">A good review should describe various aspects of the customer experience. Did the customer receive fantastic customer service? Was an employee particularly helpful, and did the customer leave the employee’s name. <br /><br />Responding to this type of review can be tough. Without details to go off of, it can be difficult to know how to respond. Start by asking if the reviewer could give more details about their experience, then switch to email or direct messaging to finish solving the issue.</blockquote>
                      </div>
                      <a href="#" className="testimonials-content--author w-inline-block"><img src={ImgAva} loading="lazy" sizes="(max-width: 991px) 34px, (max-width: 1279px) 3vw, (max-width: 1439px) 34px, (max-width: 1919px) 2vw, 34px" alt="" className="testimonials-content--author-photo" />
                        <div className="testimonials-content--author-name">sara.indiana_92</div>
                      </a>
                    </div>
                  </div>
                </SplideSlide>
                <SplideSlide className="testimonials-splide__slider">
                  <div className="blog--post-content testimonials--post-content">
                    <div className="blog--post-content-text testimonials--post-content-text">
                      <div className="testimonials-content--just-to-float">
                        <div className="testimonials-content--header">”</div>
                        <blockquote className="testimonials-content--quote">A good review should describe various aspects of the customer experience. Did the customer receive fantastic customer service? Was an employee particularly helpful, and did the customer leave the employee’s name. <br /><br />Responding to this type of review can be tough. Without details to go off of, it can be difficult to know how to respond. Start by asking if the reviewer could give more details about their experience, then switch to email or direct messaging to finish solving the issue.</blockquote>
                      </div>
                      <a href="#" className="testimonials-content--author w-inline-block"><img src={ImgAva} loading="lazy" sizes="(max-width: 991px) 34px, (max-width: 1279px) 3vw, (max-width: 1439px) 34px, (max-width: 1919px) 2vw, 34px" alt="" className="testimonials-content--author-photo" />
                        <div className="testimonials-content--author-name">sara.indiana_92</div>
                      </a>
                    </div>
                  </div>
                </SplideSlide>
              </SplideTrack>
            </Splide>

          </div>
          <section className="footer wf-section">
            <div className="container-4">
              <div className="footer-wrapper">
                <a href="index.html" aria-current="page" className="footer-brand w-inline-block w--current">
                  <img src={LogoWhite} loading="lazy" alt="DOSS Gastro Club logo" className="doss-logo-white" /></a>
                <div className="footer-content">
                  <div id="w-node-_40d1f75c-f822-0cf1-6381-e0425a24704d-51b98b83" className="footer-block">
                    <div className="title-small">Company</div>
                    <a href="#" className="footer-link">How it works</a>
                    <a href="#" className="footer-link">Pricing</a>
                    <a href="#" className="footer-link">Docs</a>
                  </div>
                  <div id="w-node-_40d1f75c-f822-0cf1-6381-e0425a247056-51b98b83" className="footer-block">
                    <div className="title-small">Resources</div>
                    <a href="#" className="footer-link">Blog post name</a>
                    <a href="#" className="footer-link">Blog post name</a>
                    <a href="#" className="footer-link">Blog post name list</a>
                  </div>
                  <div id="w-node-_40d1f75c-f822-0cf1-6381-e0425a247061-51b98b83" className="footer-block">
                    <div className="title-small">About</div>
                    <a href="#" className="footer-link">Terms &amp; Conditions</a>
                    <a href="#" className="footer-link">Privacy policy</a>
                    <a href="#" className="footer-link">Privacy policy</a>
                    <div className="footer-social-block hide">
                      <a href="#" className="footer-social-link w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124ac15112aad5_twitter%20small.svg" loading="lazy" alt="" /></a>
                      <a href="#" className="footer-social-link w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a389912aad8_linkedin%20small.svg" loading="lazy" alt="" /></a>
                      <a href="#" className="footer-social-link w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a51bf12aae9_facebook%20small.svg" loading="lazy" alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-divider hide"></div>
            <div className="footer-copyright-center hide">Copyright © 2021 Company name</div>
          </section>
          <div className="section-testimonials hide wf-section">
            <div className="section-testimonials-content">
              <div className="section-testimonials-header">Lo que nuestros miembros cuentan:</div>
              <div className="text-block-5">Ya somos más de 1000+ miembros en Madrid.</div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

    </>

  )
}

export default Landing;