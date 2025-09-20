import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import logo from "../../assets/images/logo.png";
import hamburgerIcon from "../../assets/hamburgerIcon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import HoverEffect from "../hover-effect/HoverEffect";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Navbar.css";

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-container">
      {/* Desktop Navigation */}
      <ul className="desktop-nav font-Inter" style={{ fontSize: '14px', gap: '15px' }}>
        <div className="nav-left">
          <li>
            <HoverEffect><Link to="/">{t('nav.home')}</Link></HoverEffect>
          </li>
          <li>
            <HoverEffect><Link to="/packages">{t('nav.package')}</Link></HoverEffect>
          </li>
        </div>
        
        <div className="logo-container">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
            />
          </Link>
        </div>
        
        <div className="nav-right">
          <li>
            <HoverEffect><Link to="/about">{t('nav.about')}</Link></HoverEffect>
          </li>
          <li>
            <HoverEffect><Link to="/contact">{t('nav.contact')}</Link></HoverEffect>
          </li>
          <li style={{ transform: 'scale(0.9)' }}>
            <LanguageSwitcher />
          </li>
        </div>
      </ul>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'menu-open' : ''}`}>
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img 
            src={isMenuOpen ? closeIcon : hamburgerIcon} 
            alt={isMenuOpen ? "Close" : "Menu"} 
            className="hamburger-icon"
          />
        </button>

        {/* Mobile Logo */}
        <div className="mobile-logo">
          <Link to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo-mobile"
            />
          </Link>
        </div>

        {/* Empty div for spacing */}
        <div className="mobile-spacer"></div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-menu-list font-Inter">
              <li>
                <Link to="/" onClick={closeMenu}>{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/packages" onClick={closeMenu}>{t('nav.package')}</Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMenu}>{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu}>{t('nav.contact')}</Link>
              </li>
            </ul>
            
            {/* Language Switcher in Mobile Menu */}
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
