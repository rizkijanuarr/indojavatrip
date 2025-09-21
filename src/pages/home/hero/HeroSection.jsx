"use client"

import { useState } from "react"
import { useTranslation } from 'react-i18next'
import SocialIcons from "../../../components/social-icons/SocialIcons"

import Rectangle from "../../../components/rectangle/Rectangle"
import IndicatorSlider from "../../../components/indicator-slider/IndicatorSlider"
import OverlayBackground from "../../../components/overlay-background/OverlayBackground"
import "./HeroStyleSection.css"
import TextEffectShadow from "../../../components/text-effect-shadow/TextEffectShadow"
import MyButton from "../../../components/MyButton/MyButton"

// Video dari Cloudinary - lebih reliable untuk production
const cloudinaryVideos = [
  "https://res.cloudinary.com/dpoklkm4t/video/upload/f_auto,q_auto,h_360/v1758429933/Postcard_From_Bromo_Indonesia___Cinematic_Travel_Video_4K_offvq1.mp4",
]

export default function HeroSection() {
  const { t } = useTranslation();

  // Section - State Management
  const [slideIndex, setSlideIndex] = useState(1)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [loadStartTime, setLoadStartTime] = useState(null)

  // Section - Event Handlers
  const moveDot = (index) => {
    setSlideIndex(index)
  }

  const handleExploreClick = () => {
    window.open('https://wa.me/6281390070766', '_blank')
  }

  return (
    <div className="container-slider" style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden' 
    }}>

      {/* Section - Background Overlay Full */}
      <OverlayBackground opacity={0.5} />

      {/* Section - Video Player Cloudinary */}
      <div className="video-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        {!videoError ? (
          <video
            src={cloudinaryVideos[slideIndex - 1]}
            autoPlay
            muted
            loop
            playsInline
            onLoadStart={() => {
              const startTime = performance.now()
              setLoadStartTime(startTime)
              console.log('Video loading started...')
            }}
            onError={() => {
              console.log('Video error occurred')
              setVideoError(true)
            }}
            onLoadedData={() => {
              const endTime = performance.now()
              const duration = endTime - loadStartTime
              console.log(`Video loaded successfully in ${duration.toFixed(2)}ms (${(duration / 1000).toFixed(3)} seconds)`)
              setVideoLoaded(true)
            }}
            style={{
              width: '100% !important',
              height: '100% !important',
              objectFit: 'cover',
              display: 'block',
              minWidth: '100%',
              minHeight: '100%'
            }}
          />
        ) : (
          <div className="video-fallback" style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #1a1a1a, #333)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="fallback-content" style={{
              color: 'white',
              textAlign: 'center'
            }}>
              <h3>Video Unavailable</h3>
              <p>Unable to load video content</p>
              <button 
                onClick={() => setVideoError(false)}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid white',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}
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

      {/* Section - Center Text & Button */}
      <div className="center-content">
        <h1>
          {t('hero.subtitle')}
        </h1>
        
        <button className="hero-button" onClick={handleExploreClick}>
          {t('package.jelajahi')}
        </button>
      </div>

      {/* Section - Controls & Navigation | Bottom Right */}
      <div className="controls-section">
        <SocialIcons />

        <IndicatorSlider
          totalSlides={cloudinaryVideos.length}
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