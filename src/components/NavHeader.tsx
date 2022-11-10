import LogoBlack from '../assets/images/logo-black.svg';

const NavHeader = () => {
  return (
    <div className="navbar wf-section">
      <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-container w-nav">
        <div className="container-regular">
          <div className="navbar-wrapper">
            <a href="/" className="navbar-brand w-nav-brand">
              <img src={LogoBlack} loading="lazy" alt="" className="doss-logo-black" />
            </a>
            <div className="menu-button w-nav-button">
              <div className="hide--display w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavHeader;