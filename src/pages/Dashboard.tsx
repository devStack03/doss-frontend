import React, { useState, useEffect, useReducer } from 'react';

import NavHeader from "../components/NavHeader";
import { Link } from 'react-router-dom';
import EventSection from '../components/dashboard/EventSection';
import OfferSection from '../components/dashboard/OfferSection';
import InviteSection from '../components/dashboard/InviteSection';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { PreloadMedia, MediaType } from 'react-preload-media';

import ImgFrame from '../assets/images/Frame.png';
import ImgSuffolkPunchFull from '../assets/images/suffolk-punch-FULL-p-500.png';
import SvgEmojiPeopleGray from '../assets/images/emoji_people-24px--gray.svg';
import SvgEmojiPeopleYellow from '../assets/images/emoji_people-24px--yellow.svg';
import SvgBaseLineStyleYellow from '../assets/images/baseline-style-24px--yellow.svg';
import SvgBaseLineStyleGray from '../assets/images/baseline-style-24px--gray.svg';
import SvgBaseLineStoreMallDirectoryGray from '../assets/images/baseline-store_mall_directory-24px--gray.svg';
import SvgBaseLineStoreMallDirectoryYellow from '../assets/images/baseline-store_mall_directory-24px--yellow.svg';
import SvgLogoBlack from '../assets/images/logo-black.svg';
import ImgUnionOne from '../assets/images/Union-1.png';
import ImgUnionTwo from '../assets/images/Union-2.png';
import SvgBlackCheckmarkOferta from '../assets/svgs/black-checkmark-oferta.svg';
import SvgGreenCheckmarkEvent from '../assets/svgs/green-checkmark-event.svg';

import './dashboard.css';
import userService from '../services/user.service';
import { useDispatch, useTypedSelector } from '../store/store';
import LoadingScreen from '../components/LoadingScreen';
import { fetchStarted, resultLoaded } from '../store/slices/api.slice';
import { isValidToken, setSession } from '../utils/jwt';
import eventService from '../services/event.service';
import restaurantService from '../services/restaurant.service';
import { humanizeFutureToNow } from '../utils';
import { getStripeCustomerDetailAsync, setCustomerDetail } from '../store/slices/stripe.slice';
import Renew from './Renew';

export enum SECTION_INDEX {
  INVITE,
  OFFER,
  EVENT
}

const option1 = {
  type: 'slide',
  rewind: true,
  // perPage: 5,
  perPage: 3,
  arrows: true,
  fixedWidth: '327px',
  gap: '22px',
  arrowPath: 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z',
  breakpoints: {
    1440: {
      fixedWidth: '311px',
      gap: '22px',
      perPage: 1
    },
    900: {
      fixedWidth: '311px',
      gap: '22px',
      perPage: 1
    },
    690: {
      direction: 'ttb',
      height: '300px',
      autoHeight: true,
      arrows: false,
      type: 'loop',
    },
  }
};

const media = [
  { type: MediaType.Image, url: ImgFrame },
  { type: MediaType.Image, url: ImgSuffolkPunchFull },
  { type: MediaType.Image, url: SvgEmojiPeopleGray },
  { type: MediaType.Image, url: SvgEmojiPeopleYellow },
  { type: MediaType.Image, url: SvgBaseLineStyleYellow },
  { type: MediaType.Image, url: ImgSuffolkPunchFull },
  { type: MediaType.Image, url: SvgBaseLineStyleGray },
  { type: MediaType.Image, url: SvgBaseLineStoreMallDirectoryGray },
  { type: MediaType.Image, url: SvgBaseLineStoreMallDirectoryYellow },
  { type: MediaType.Image, url: SvgLogoBlack },
  { type: MediaType.Image, url: ImgUnionOne },
  { type: MediaType.Image, url: ImgUnionTwo },
];

const Dashboard = () => {

  const [activeSectionIndex, setActiveSectionIndex] = useState<SECTION_INDEX>(SECTION_INDEX.INVITE);
  const [isLoaded, loaded] = useReducer(() => true, false);
  const [customerPortalSessionUrl, setCustomerPortalSessionUrl] = useState(null);
  const { user } = useTypedSelector(state => state.auth);
  const stripeCustomerInfo = useTypedSelector(state => state.stripe.data);
  const dispatch = useDispatch();
  const [events, setEvents] = useState<any[]>(Array());
  const [restaurants, setRestaurants] = useState<any[]>(Array());
  const [subscriptionCanceled, setSubscriptionCanceled] = useState(false);

  useEffect(() => {
    var arrowsBlockElement = document.getElementsByClassName("splide__arrows--ltr");
    arrowsBlockElement[0]?.classList.add("splide__arrows--ltr-custom");
    arrowsBlockElement[1]?.classList.add("splide__arrows--ltr-custom");
    var arrowPrevElements = document.getElementsByClassName("splide__arrow--prev");
    arrowPrevElements[0]?.classList.add("splide__arrow--prev-custom");
    arrowPrevElements[1]?.classList.add("splide__arrow--prev-custom");
    var arrowNextElements = document.getElementsByClassName("splide__arrow--next");
    arrowNextElements[0]?.classList.add("splide__arrow--next-custom");
    arrowNextElements[1]?.classList.add("splide__arrow--next-custom");
    document.body.style.overflow = "scroll";
  });

  useEffect(() => {
    return () => {
      document.body.style.overflow = "scroll";
      console.log("cleaned up");
    };
  }, []);

  useEffect(() => {
    
    const makeRequests = async () => {
      
      dispatch(fetchStarted());
      if (user?.accessToken && isValidToken(user?.accessToken)) {
        setSession(user?.accessToken!);
        // dispatch(getStripeCustomerDetailAsync());
        try {
          const {data} = await userService.getCustomerDetail().then((res) => res.data);
          if (data.status === 'active') {
            setSubscriptionCanceled(true);
          }
          dispatch(setCustomerDetail(data));
          handleOpenStripeCustomerPortal();
          
        } catch (error) {
          
        } finally {
          dispatch(resultLoaded());
        }
      }
    }

    makeRequests();
  }, [user?.accessToken]);

  useEffect(() => {
    let interval = setInterval(() => {
      // dispatch(getStripeCustomerDetailAsync());
      checkCustomerInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const checkCustomerInfo = () => {
    console.log(stripeCustomerInfo.status);
    if (stripeCustomerInfo.status !== 'active') {
      // alert('check payment');
      // setSubscriptionCanceled(true);
    }
  }

  useEffect(() => {
    getAllEvents();
    getAllRestaurants();
  }, [])

  const getAllEvents = async () => {
    setSession(user?.accessToken!);
    eventService.getAll().then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setEvents(sortEvents(res.data.data));
      }
    })
  }

  const getAllRestaurants = async () => {
    setSession(user?.accessToken!);
    restaurantService.getAll().then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setRestaurants(sortRestaurants(res.data.data));
      }
    })
  }

  const sortRestaurants = (array: any[]) => {
    return array.sort((a, b) => {
      return a.status - b.status;
    })
  }

  const sortEvents = (array: any[]) => {
    return array.sort((a, b) => {
      return b.attended - a.attended;
    })
  }

  const handleOpenStripeCustomerPortal = () => {
    if (user?.stripeCustomerId) {
      dispatch(fetchStarted());
      if (isValidToken(user.accessToken!)) {
        setSession(user.accessToken!)
        userService.createCustomerPortal({
          customerId: user?.stripeCustomerId
          // customerId: 'cus_MlPq3FRioFLnMo'
        }).then((res) => {
          console.log(res);
          if (res.data.session) {
            console.log(res.data.session);
            setCustomerPortalSessionUrl(res.data.session.url);
          }

        }).catch((err) => {

        }).finally(() => {
          dispatch(resultLoaded());
        })
      }

    }
  }

  const handleClickOffer = (restaurant: any) => {
    if (restaurant.status) {
      setSession(user?.accessToken!);
      restaurantService.activate({}, restaurant.id).then((res) => {
        console.log(res);
        if (res.data.status) {
          const index = restaurants.indexOf(restaurant);
          console.log(index);
          const temp = [...restaurants];
          temp[index] = res.data.data;
          setRestaurants(sortRestaurants([...temp]));
        }
      })
    }
  }

  const handleClickEvent = (event: any) => {
    if (event.available && !event.attended) {
      setSession(user?.accessToken!);
      eventService.attend({ state: 1 }, event.id).then((res) => {
        console.log(res);
        if (res.data.status) {
          // const index = events.indexOf(event);
          // console.log(index);
          // const temp = [...events];
          // temp[index] = res.data.data;
          // setEvents(sortEvents([...temp]));
          getAllEvents();
        }
      });
    }
  }

  const handleClickCancelEvent = (event: any) => {
    if (event.attended) {
      setSession(user?.accessToken!);
      eventService.cancelAttend(event.attendId).then((res) => {
        console.log(res);
        getAllEvents();
      })
    }
  }

  const openGoogleStoreUrl = () => {
    if (customerPortalSessionUrl)
      window.open(customerPortalSessionUrl, '_blank', 'noopener,noreferrer')?.focus();
  }

  const handleMenuInviteClick = (index: SECTION_INDEX) => {
    const menuItemInvitar = document.getElementById('menu-item--Invitar')!;
    const itemImageInvitar = document.getElementById('item--image-Invitar')! as HTMLImageElement;
    const itemTextInvitar = document.getElementById('item--text-Invitar')!;
    const menuBlockInvitar = document.getElementById('menu-block--Invitar')!;
    const menuItemOfertas = document.getElementById('menu-item--Ofertas')!;
    const itemImageOfertas = document.getElementById('item--image-Ofertas')! as HTMLImageElement;
    const itemTextOfertas = document.getElementById('item--text-Ofertas')!;
    const menuBlockOfertas = document.getElementById('menu-block--Ofertas')!;
    const menuItemEventos = document.getElementById('menu-item--Eventos'!);
    const itemImageEventos = document.getElementById('menu--image-Eventos')! as HTMLImageElement;
    const itemTextEventos = document.getElementById('menu--text-Eventos')!;
    const menuBlockEventos = document.getElementById('menu-block--Eventos')!;
    const invitarDashImg = document.getElementById('invitar--dash--img')! as HTMLImageElement;
    const invitarDashText = document.getElementById('invitar--dash--text')!;
    const ofertasDashImg = document.getElementById('ofertas--dash--img')! as HTMLImageElement;
    const ofertasDashText = document.getElementById('ofertas--dash--text')!;
    const eventosDashImg = document.getElementById('eventos--dash--img')! as HTMLImageElement;
    const eventosDashText = document.getElementById('eventos--dash--text')!;
    const invitarMenuBlock = document.getElementById('menu-block--Invitar')!;
    const ofertasMenuBlock = document.getElementById('menu-block--Ofertas')!;
    const eventosMenuBlock = document.getElementById('menu-block--Eventos')!;
    const itemInvita = document.getElementById('menu-block--item--Invitar')!;
    const itemOfertas = document.getElementById('menu-block--item--Ofertas')!;
    const itemEventos = document.getElementById('menu-block--item--Eventos')!;
    /* const menuIconMobile = document.getElementById('menu-icon--mobile'); */
    const menuListMobile = document.getElementById('menu-list--mobile')!;
    const menuIconMobileOpen = document.getElementById('menu-icon--mobile__open')!;
    const menuIconMobileClose = document.getElementById('menu-icon--mobile__close')!;

    switch (index) {
      case SECTION_INDEX.INVITE:
        {
          itemImageInvitar.src = SvgEmojiPeopleYellow;
          itemTextInvitar.style.color = '#FAC945';
          menuBlockInvitar.style.display = 'block';
          menuBlockOfertas.style.display = 'none';
          menuBlockEventos.style.display = 'none';
          itemImageOfertas.src = SvgBaseLineStyleGray;
          itemTextOfertas.style.color = '#9aa6ad';
          itemImageEventos.src = SvgBaseLineStoreMallDirectoryGray;
          itemTextEventos.style.color = '#9aa6ad';

          setActiveSectionIndex(SECTION_INDEX.INVITE);

          invitarMenuBlock.style.display = "block";
          ofertasMenuBlock.style.display = "none";
          eventosMenuBlock.style.display = "none";
          invitarDashImg.src = SvgEmojiPeopleYellow;
          invitarDashText.style.color = '#FAC945';
          ofertasDashImg.src = SvgBaseLineStyleGray;
          ofertasDashText.style.color = '#9aa6ad';
          eventosDashImg.src = SvgBaseLineStoreMallDirectoryGray;
          eventosDashText.style.color = '#9aa6ad';
          menuListMobile.style.display = "none";
          menuIconMobileOpen.style.display = "block";
          menuIconMobileClose.style.display = "none";
          document.body.style.overflow = "scroll";
        }

        break;
      case SECTION_INDEX.OFFER:
        {
          itemImageOfertas.src = SvgBaseLineStyleYellow;
          itemTextOfertas.style.color = '#FAC945';
          menuBlockInvitar.style.display = 'none';
          menuBlockOfertas.style.display = 'block';
          menuBlockEventos.style.display = 'none';
          itemImageInvitar.src = SvgEmojiPeopleGray;
          itemTextInvitar.style.color = '#9aa6ad';
          itemImageEventos.src = SvgBaseLineStoreMallDirectoryGray;
          itemTextEventos.style.color = '#9aa6ad';
          setActiveSectionIndex(SECTION_INDEX.OFFER);
          const invitarDashImg = document.getElementById('invitar--dash--img')! as HTMLImageElement;
          const invitarDashText = document.getElementById('invitar--dash--text')!;
          const ofertasDashImg = document.getElementById('ofertas--dash--img')! as HTMLImageElement;
          const ofertasDashText = document.getElementById('ofertas--dash--text')!;
          const eventosDashImg = document.getElementById('eventos--dash--img')! as HTMLImageElement;
          const eventosDashText = document.getElementById('eventos--dash--text')!;
          const invitarMenuBlock = document.getElementById('menu-block--Invitar')!;
          const ofertasMenuBlock = document.getElementById('menu-block--Ofertas')!;
          const eventosMenuBlock = document.getElementById('menu-block--Eventos')!;
          const itemInvita = document.getElementById('menu-block--item--Invitar')!;
          const itemOfertas = document.getElementById('menu-block--item--Ofertas')!;
          const itemEventos = document.getElementById('menu-block--item--Eventos')!;
          /* const menuIconMobile = document.getElementById('menu-icon--mobile'); */
          const menuListMobile = document.getElementById('menu-list--mobile')!;
          const menuIconMobileOpen = document.getElementById('menu-icon--mobile__open')!;
          const menuIconMobileClose = document.getElementById('menu-icon--mobile__close')!;
          invitarMenuBlock.style.display = "none";
          ofertasMenuBlock.style.display = "block";
          eventosMenuBlock.style.display = "none";
          invitarDashImg.src = SvgEmojiPeopleGray;
          invitarDashText.style.color = '#9aa6ad';
          ofertasDashImg.src = SvgBaseLineStyleYellow;
          ofertasDashText.style.color = '#FAC945';
          eventosDashImg.src = SvgBaseLineStoreMallDirectoryGray;
          eventosDashText.style.color = '#9aa6ad';
          menuListMobile.style.display = "none";
          menuIconMobileOpen.style.display = "block";
          menuIconMobileClose.style.display = "none";
          document.body.style.overflow = "scroll";
        }
        break;
      case SECTION_INDEX.EVENT:
        {
          itemImageEventos.src = SvgBaseLineStoreMallDirectoryYellow;
          itemTextEventos.style.color = '#FAC945';
          menuBlockInvitar.style.display = 'none';
          menuBlockOfertas.style.display = 'none';
          menuBlockEventos.style.display = 'block';
          itemImageInvitar.src = SvgEmojiPeopleGray;
          itemTextInvitar.style.color = '#9aa6ad';
          itemImageOfertas.src = SvgBaseLineStyleGray;
          itemTextOfertas.style.color = '#9aa6ad';
          setActiveSectionIndex(SECTION_INDEX.EVENT);
          const invitarDashImg = document.getElementById('invitar--dash--img')! as HTMLImageElement;
          const invitarDashText = document.getElementById('invitar--dash--text')!;
          const ofertasDashImg = document.getElementById('ofertas--dash--img')! as HTMLImageElement;
          const ofertasDashText = document.getElementById('ofertas--dash--text')!;
          const eventosDashImg = document.getElementById('eventos--dash--img')! as HTMLImageElement;
          const eventosDashText = document.getElementById('eventos--dash--text')!;
          const invitarMenuBlock = document.getElementById('menu-block--Invitar')!;
          const ofertasMenuBlock = document.getElementById('menu-block--Ofertas')!;
          const eventosMenuBlock = document.getElementById('menu-block--Eventos')!;
          const itemInvita = document.getElementById('menu-block--item--Invitar')!;
          const itemOfertas = document.getElementById('menu-block--item--Ofertas')!;
          const itemEventos = document.getElementById('menu-block--item--Eventos')!;
          /* const menuIconMobile = document.getElementById('menu-icon--mobile'); */
          const menuListMobile = document.getElementById('menu-list--mobile')!;
          const menuIconMobileOpen = document.getElementById('menu-icon--mobile__open')!;
          const menuIconMobileClose = document.getElementById('menu-icon--mobile__close')!;
          invitarMenuBlock.style.display = "none";
          ofertasMenuBlock.style.display = "none";
          eventosMenuBlock.style.display = "block";
          invitarDashImg.src = SvgEmojiPeopleGray;
          invitarDashText.style.color = '#9aa6ad';
          ofertasDashImg.src = SvgBaseLineStyleGray;
          ofertasDashText.style.color = '#9aa6ad';
          eventosDashImg.src = SvgBaseLineStoreMallDirectoryYellow;
          eventosDashText.style.color = '#FAC945';
          menuListMobile.style.display = "none";
          menuIconMobileOpen.style.display = "block";
          menuIconMobileClose.style.display = "none";
          document.body.style.overflow = "scroll";
        }
        break;
      default:
        break;
    }


  }
  const handleMenuOfferClick = (e: any) => {

  }
  const handleMenuEventClick = (e: any) => {
    setActiveSectionIndex(SECTION_INDEX.EVENT);

  }

  const handleMobileIconOpenClick = () => {
    const menuListMobile = document.getElementById('menu-list--mobile');
    const menuIconMobileOpen = document.getElementById('menu-icon--mobile__open');
    const menuIconMobileClose = document.getElementById('menu-icon--mobile__close');
    menuListMobile!.style.display = "block";
    menuIconMobileOpen!.style.display = "none";
    menuIconMobileClose!.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  const handleMobileIconCloseClick = () => {
    const menuListMobile = document.getElementById('menu-list--mobile');
    const menuIconMobileOpen = document.getElementById('menu-icon--mobile__open');
    const menuIconMobileClose = document.getElementById('menu-icon--mobile__close');
    menuListMobile!.style.display = "none";
    menuIconMobileOpen!.style.display = "block";
    menuIconMobileClose!.style.display = "none";
    document.body.style.overflow = "scroll";
  }

  return (
    <>
      {subscriptionCanceled ? (
        <>
        <Renew />
        </>
      ) : (
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
              <div className="navigation-mobile--dashboard">
                <div className="navigation-mobile--head hide">
                  <Link to={`/`} replace className="w-inline-block">
                    <img src={SvgLogoBlack} loading="lazy" alt="" className="logo" />
                  </Link>
                  <div id="menu-icon--mobile" className="nav-mobile--icon-block" >
                    <img src={ImgUnionOne} loading="lazy" id="menu-icon--mobile__open" alt="" className=' tw-cursor-pointer' onClick={handleMobileIconOpenClick} />
                    <img src={ImgUnionTwo} loading="lazy" id="menu-icon--mobile__close" alt="" className="image-6 tw-cursor-pointer" onClick={handleMobileIconCloseClick} />
                  </div>
                </div>
                <div id="menu-list--mobile" className="navigation-mobile--menu-list hide">
                  <div className="menu-item--user--dash tw-cursor-pointer" onClick={openGoogleStoreUrl}>
                    <div className="user-icon user-icon--doss">
                      <div className="user-icon--text">S</div>
                    </div>
                    <div>{user?.fullName}</div>
                  </div>
                  <div id="menu-block--item--Invitar" className="menu-item--invitar--dash tw-cursor-pointer" onClick={() => handleMenuInviteClick(SECTION_INDEX.INVITE)}>
                    <img src={SvgEmojiPeopleGray} loading="lazy" id="invitar--dash--img" alt="" />
                    <div id="invitar--dash--text">Invitar un amigo</div>
                  </div>
                  <div id="menu-block--item--Ofertas" className="menu-item--ofertas--dash tw-cursor-pointer" onClick={() => handleMenuInviteClick(SECTION_INDEX.OFFER)}>
                    <img src={SvgBaseLineStyleYellow} loading="lazy" id="ofertas--dash--img" alt="" />
                    <div id="ofertas--dash--text" className="text-block-14">Ofertas</div>
                  </div>
                  <div id="menu-block--item--Eventos" className="menu-item--eventos--dash tw-cursor-pointer" onClick={() => handleMenuInviteClick(SECTION_INDEX.EVENT)}>
                    <img src={SvgBaseLineStoreMallDirectoryGray} loading="lazy" id="eventos--dash--img" alt="" />
                    <div id="eventos--dash--text">Eventos</div>
                  </div>
                </div>
              </div>
              {/* <div className="navbar navbar--dashboard wf-section">
          <div data-w-id="f1d4d938-1203-c02d-dd1a-080da9721921" data-animation="default" data-collapse="medium"
            data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-container w-nav">
            <div className="container-regular">
              <div className="navbar-wrapper navbar--homepage">
                <a href="../index.html" className="navbar-brand w-nav-brand">
                  <img src={SvgLogoBlack} loading="lazy" alt="" className="doss-logo-black" />
                </a>
                <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                  <ul data-w-id="f1d4d938-1203-c02d-dd1a-080da9721927" role="list" className="nav-menu nav-menu--dashboard w-list-unstyled">
                    <li id="menuItemInvitar2" data-w-id="f1d4d938-1203-c02d-dd1a-080da972192b" className="list-item-2">
                      <a data-w-id="f1d4d938-1203-c02d-dd1a-080da972192c" href="#" className="nav-link">Invitar un amigo</a>
                    </li>
                    <li className="list-item-3">
                      <a href="#" className="nav-link">Ofertas</a>
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
                    <li className="mobile-margin-top-10 menu-dashboard--hide">
                      <div className="nav-button-wrapper">
                        <a href="../sign-up/signup-step-1.html" className="button-primary w-button">Tengo un código</a>
                      </div>
                    </li>
                    <li className="mobile-margin-top-10 menu-dashboard--hide">
                      <div className="nav-button-wrapper">
                        <a href="../login/phone.html" className="button-primary button-secondary">Iniciar Sesión</a>
                      </div>
                    </li>
                  </ul>
                </nav>
                <div data-w-id="f1d4d938-1203-c02d-dd1a-080da9721949" className="menu-button menu-button--dashboard w-nav-button">
                  <img src={ImgUnionOne} loading="lazy" data-w-id="f1d4d938-1203-c02d-dd1a-080da972194a" alt="" className="menu-image--open" />
                  <img src={ImgUnionTwo} loading="lazy" data-w-id="f1d4d938-1203-c02d-dd1a-080da972194b" alt="" className="menu-image--close" />
                  <div className="icon-2 w-icon-nav-menu"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
              <div className="section-fullscreen--dashboard">
                <div className="dashboard--leftside">
                  <Link to={`/`} replace className="logo-block w-inline-block">
                    <img src={SvgLogoBlack} loading="lazy" alt="" />
                  </Link>

                  <div className="user-block tw-cursor-pointer" onClick={openGoogleStoreUrl}>
                    <div className="user-icon">
                      <div className="user-icon--text">S</div>
                    </div>
                    <div className="user-icon--name">{user?.fullName}</div>
                  </div>
                  <div className="dashbourd-menu">
                    <div id="menu-item--Invitar" className="dashboard-menu-item menu-item--invitar dashboard--pc-menu" onClick={() => handleMenuInviteClick(SECTION_INDEX.INVITE)}>
                      <img
                        src={SvgEmojiPeopleGray} loading="lazy" id="item--image-Invitar" alt=""
                        className="menu-item--image item--image-invitar" />
                      <div id="item--text-Invitar" className="menu-item--text item--text-invitar">Invitar un amigo</div>
                    </div>
                    <div id="menu-item--Ofertas" className="dashboard-menu-item menu-item--ofertas" onClick={() => handleMenuInviteClick(SECTION_INDEX.OFFER)}>
                      <img
                        src={SvgBaseLineStyleYellow} loading="lazy" id="item--image-Ofertas" alt=""
                        className="menu-item--image item--image-ofertas" />
                      <div id="item--text-Ofertas" className="menu-item--text item--text-ofertas">Ofertas</div>
                    </div>
                    <div id="menu-item--Eventos" className="dashboard-menu-item menu-item--eventos" onClick={() => handleMenuInviteClick(SECTION_INDEX.EVENT)}>
                      <img
                        src={SvgBaseLineStoreMallDirectoryGray} loading="lazy" id="menu--image-Eventos" alt=""
                        className="menu-item--image menu--image-eventos" />
                      <div id="menu--text-Eventos" className="menu-item--text menu--text-eventos">Eventos</div>
                    </div>
                  </div>
                  <div className="w-embed"></div>
                </div>
                <div className="dashboard--rightside">
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
                  <div id="menu-block--Eventos" className="menu-block--eventos">
                    <div className="block-head">
                      <h2 className="dashboard--heading">Hola {user?.fullName} ❤️</h2>
                      <div className="dashboard--title">Overview</div>
                      <div className="slider--block--header">
                        <div className="slider-block--emoji">💃</div>
                        <div className="slider-block--text">Eventos</div>
                      </div>
                    </div>

                    <Splide id="slider1" className="slider-blovk--basic oferta--splide" hasTrack={false} options={option1}>
                      <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">Prev</button>
                        <button className="splide__arrow splide__arrow--next">Next</button>
                      </div>
                      <SplideTrack className="ofertas--track w-dyn-list w-max-w-[650px] lg:tw-max-w-[660px] xl:tw-max-w-[999px] 2xl:tw-max-w-[1380px]">
                        {events.map((e, index) => (
                          <SplideSlide className="wl-dyn-item tw-rounded-3xl" key={index}>
                            <div className="ofertas--content-block">
                              <div className="ofertas--content-text">
                                <div className="ofertas-header">
                                  <div className="ofertas--title-and-timer">
                                    <div className="ofertas--title">{e.name}</div>
                                    <div className="ofertas--timer ofertas--timer-emoji"></div>
                                    <div className="ofertas--timer">{humanizeFutureToNow(e.eventDate)}</div>
                                    <div className="ofertas--timer ofertas--timer-post">left</div>
                                  </div>
                                  <div className="ofertas--subtitle">{e.description}</div>
                                </div>
                              </div>
                              <a className="link-block link-block--ofertas w-inline-block" onClick={() => handleClickEvent(e)}>
                                <div className="offer-block-button offer-block-button_responsive offer-block-button--status-asistir">
                                  {e.attended === 1 &&
                                    <div className="offer-block-currency-icon">
                                      <div className="currency-icon-text">

                                        <><img src={SvgGreenCheckmarkEvent} /></>

                                      </div>
                                    </div>
                                  }

                                  <div className="currency-icon-value">
                                    {e.attended === 1 &&
                                      <>Confirmado</>
                                    }
                                    {e.attended === 0 &&
                                      <>Asistir</>
                                    }
                                    {e.attended === -1 &&
                                      <>Has cancelado tu asistencia</>
                                    }
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className={e.attended ? "event--image-block" : `ofertas--image-block`}>
                              <img src={ImgSuffolkPunchFull} loading="lazy" alt="Suffolk punch Copy 2" className="ofertas--image" />
                            </div>
                            {e.attended === 1 &&
                              <div className="tw-m-auto -tw-mb-3 tw-text-[red] tw-text-[14px]">
                                <button className="tw-mt-2" onClick={() => handleClickCancelEvent(e)}>Cancelar</button>
                              </div>
                            }

                          </SplideSlide>
                        ))}

                      </SplideTrack>
                    </Splide>
                  </div>
                  <div id="menu-block--Ofertas" className="menu-block--ofertas">
                    <div className="block-head">
                      <h2 className="dashboard--heading">Hola {user?.fullName} ❤️</h2>
                      <div className="dashboard--title">Overview</div>
                      <div className="slider--block--header">
                        <div className="slider-block--emoji">💸</div>
                        <div className="slider-block--text">Tus ofertas</div>
                      </div>
                    </div>
                    <Splide id="slider2" className="slider-blovk--basic oferta--splide" hasTrack={false} options={option1}>
                      <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">Prev</button>
                        <button className="splide__arrow splide__arrow--next">Next</button>
                      </div>
                      <SplideTrack className="ofertas--track w-dyn-list tw-max-w-[650px] lg:tw-max-w-[660px] xl:tw-max-w-[999px] 2xl:tw-max-w-[1380px]">
                        {restaurants.map((restaurant, index) => (
                          <SplideSlide className="wl-dyn-item tw-rounded-3xl" key={index}>
                            <div className="ofertas--content-block">
                              <div className="ofertas--content-text">
                                <div className="ofertas-header">
                                  <div className="ofertas--title-and-timer">
                                    <div className="ofertas--title">{restaurant.name}</div>
                                    <div className="ofertas--timer ofertas--timer-emoji">⏳</div>
                                    <div className="ofertas--timer">October 30, 2022</div>
                                    <div className="ofertas--timer ofertas--timer-post w-condition-invisible">left</div>
                                  </div>
                                  <div className="ofertas--subtitle">{restaurant.description}</div>
                                </div>
                              </div>
                              <a className="link-block link-block--ofertas w-inline-block" onClick={() => handleClickOffer(restaurant)}>
                                <div className={restaurant.status ? "offer-block-button offer-block-button_responsive" : `offer-block-button offer-block-button_responsive active`}>
                                  <div className="offer-block-currency-icon">
                                    <div className="currency-icon-text">

                                      {restaurant.status === 1 &&
                                        <>€</>
                                      }
                                      {restaurant.status === 0 &&
                                        <><img src={SvgBlackCheckmarkOferta} /></>
                                      }
                                    </div>
                                  </div>
                                  <div className="currency-icon-value">
                                    {restaurant.status === 1 &&
                                      <>Activar</>
                                    }
                                    {restaurant.status === 0 &&
                                      <>Oferta Activada</>
                                    }
                                    {restaurant.status === -1 &&
                                      <></>
                                    }
                                  </div>
                                </div>
                                <div className="w-embed"></div>
                              </a>
                            </div>
                            <div className="ofertas--image-block">
                              <img src={ImgSuffolkPunchFull} loading="lazy" alt="Suffolk punch Copy 10" sizes="(max-width: 1919px) 175.00001525878906px, 9vw" className="ofertas--image" /></div>
                          </SplideSlide>
                        ))}

                      </SplideTrack>
                    </Splide>

                  </div>

                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
};

export default Dashboard;