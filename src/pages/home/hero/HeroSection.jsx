"use client"

import { useState } from "react"
import { useTranslation } from 'react-i18next'
import SocialIcons from "../../../components/social-icons/SocialIcons"

import Rectangle from "../../../components/rectangle/Rectangle"
import IndicatorSlider from "../../../components/indicator-slider/IndicatorSlider"
import OverlayBackground from "../../../components/overlay-background/OverlayBackground"
import "./HeroStyleSection.css"
import TextEffectShadow from "../../../components/text-effect-shadow/TextEffectShadow"

const youtubeVideos = [
  "https://www.youtube.com/embed/EUlZ_Omb538?autoplay=1&mute=1&controls=0&loop=1&playlist=EUlZ_Omb538",
]

export default function HeroSection() {
  const { t } = useTranslation();

  // Section - State Management
  const [slideIndex, setSlideIndex] = useState(1)

  // Section - Event Handlers
  const moveDot = (index) => {
    setSlideIndex(index)
  }

  return (
    <div className="container-slider">

      {/* Section - Background Overlay Full */}
      <OverlayBackground opacity={0.5} />

      {/* Section - Video Player Youtube */}
      <div className="video-container">
        <iframe
          src={youtubeVideos[slideIndex - 1]}
          title={`YouTube video ${slideIndex}`}
          className="video-iframe"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Section - Text Display |  Bottom Left */}
      <div className="text-section">
        <Rectangle orientation="horizontal" />

        <TextEffectShadow
          tag="p"
          className="text-[12px] font-Inter"
        >
          {slideIndex === 1 ? "Indonesia" : slideIndex === 2 ? "Nepal" : slideIndex === 3 ? "Thailand" : "Malaysia"}
        </TextEffectShadow>
      </div>

      {/* Section - Controls & Navigation | Bottom Right */}
      <div className="controls-section">
        <SocialIcons />

        <IndicatorSlider
          totalSlides={youtubeVideos.length}
          activeIndex={slideIndex}
          onDotClick={moveDot}
        />
      </div>

      {/* Section - Scroll Down Indicator | Bottom Center */}
      <div className="scroll-indicator">
        <div className="circular-text">
          <span className="letter" style={{ "--i": 0 }}>S</span>
          <span className="letter" style={{ "--i": 1 }}>C</span>
          <span className="letter" style={{ "--i": 2 }}>R</span>
          <span className="letter" style={{ "--i": 3 }}>O</span>
          <span className="letter" style={{ "--i": 4 }}>L</span>
          <span className="letter" style={{ "--i": 5 }}>L</span>
          <span className="letter" style={{ "--i": 6 }}>•</span>
          <span className="letter" style={{ "--i": 7 }}>D</span>
          <span className="letter" style={{ "--i": 8 }}>O</span>
          <span className="letter" style={{ "--i": 9 }}>W</span>
          <span className="letter" style={{ "--i": 10 }}>N</span>
          <span className="letter" style={{ "--i": 11 }}>•</span>
        </div>
        <div className="scroll-icon">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </div>
  )
}