
import ImgSuffolkPunchFull from '../../assets/images/suffolk-punch-FULL-p-500.png';
import xx from '../../assets/images/suffolk-punch.png';
const OfferCarouselItem = ({imageSrc} : { imageSrc: string}) => {
  return (
    <div className="offers-div">
      <div className="offers-div-offer-text">
        <div className="offers-div-title">Suffolk punch Copy 9</div>
        <div className="offers-div-sub-title">culinary cafe + taphouse in South End</div>
        <div className="offers-div-bestseller">Bestseller:</div>
        <div className="offers-div-bestseller-first-title">🦪 Rose-berry mule</div>
        <div className="offers-div-bestseller-first-description">Tito's Vodka, rosemary, cranberry juice, lime, ginger ale</div>
        <div className="offers-div-bestseller-second-title"> ‍🌮 C-B-R Tacos</div>
        <div className="offers-div-bestseller-second-description">Guajillo pulled chicken, smoked bacon, smoked jalapeño ranch,
          shredded lettuce, pico de gallo</div>
      </div>
      <div className="offers-div-offer-block">
        <img src={xx}
          loading="lazy" alt="Suffolk punch Copy 9" sizes="(max-width: 479px) 311px, 383px"
          className="offer-block-img" />
        <div className="offer-block-button hide">
          <div className="offer-block-currency-icon">
            <div className="currency-icon-text">€</div>
          </div>
          <div className="currency-icon-value">15€ Para Gastar</div>
        </div>
      </div>
      <a href="#" className="button w-button" tabIndex={0}>15€ Para Gastar</a><a href="/offers/suffolk-punch-copy-9"
        className="link-block w-inline-block" tabIndex={0}>
        <div className="offer-block-button offer-block-button_responsive">
          <div className="offer-block-currency-icon">
            <div className="currency-icon-text">€</div>
          </div>
          <div className="currency-icon-value">15€ Para Gastar</div>
        </div>
      </a>
    </div>
  )
}

export default OfferCarouselItem;