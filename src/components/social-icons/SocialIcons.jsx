import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import HoverEffect from "../hover-effect/HoverEffect";
import TextEffectShadow from "../text-effect-shadow/TextEffectShadow";
import Rectangle from "../rectangle/Rectangle";
import "./SocialIcons.css";

function SocialIcons() {
  const { t } = useTranslation();
  return (
    <div className="container-social-icons">
      <div className="social-icons-list">
        <HoverEffect>
          <a
            href="https://www.instagram.com/indojavatrip/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <FaInstagram />
          </a>
        </HoverEffect>
        <HoverEffect>
          <a
            href="https://www.tiktok.com/@indojavatrip"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <FaTiktok />
          </a>
        </HoverEffect>
        <HoverEffect>
          <a
            href="https://www.facebook.com/indojavatrip"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <FaFacebookF />
          </a>
        </HoverEffect>
        <HoverEffect>
          <a
            href="https://wa.me/6281390070766"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <FaWhatsapp />
          </a>
        </HoverEffect>
        <HoverEffect>
          <a
            href="mailto:indojavatrip@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <MdEmail />
          </a>
        </HoverEffect>
        <HoverEffect>
          <a
            href="https://maps.app.goo.gl/QKSgRisdG2Mw4C8X8"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <MdLocationOn />
          </a>
        </HoverEffect>
      </div>
      <Rectangle orientation="vertical" />
      <TextEffectShadow tag="p" className="verticleText">
        {t('hero.followUs')}
      </TextEffectShadow>
    </div>
  );
}

export default SocialIcons;