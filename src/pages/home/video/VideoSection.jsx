import "./VideoStyleSection.css"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import HeaderSection from "../../../components/HeaderSection/HeaderSection"
import PlayIcon from "../../../assets/images/play.svg"

const cloudinaryVideos = [
    "https://res.cloudinary.com/dpoklkm4t/video/upload/f_auto,q_auto,h_720/v1758429933/Postcard_From_Bromo_Indonesia___Cinematic_Travel_Video_4K_offvq1.mp4",
];

export default function VideoSection() {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        console.log('Play button clicked');
        const video = document.querySelector('.video-container-section video');
        console.log('Video element found:', video);
        if (video) {
            console.log('Video current state:', {
                paused: video.paused,
                currentTime: video.currentTime,
                readyState: video.readyState,
                src: video.src
            });
            video.play().then(() => {
                console.log('Video play successful');
                setIsPlaying(true);
            }).catch(error => {
                console.error('Video play failed:', error);
            });
        } else {
            console.error('Video element not found');
        }
    };

    const handleVideoClick = () => {
        const video = document.querySelector('.video-container-section video');
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <section className="video-section">
            <HeaderSection
                title={t('video.title')}
                subtitle={t('video.subtitle')}
            />

            <div className="container">
                <div className="video-container-section">
                    <video 
                        onClick={handleVideoClick}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    >
                        <source src={cloudinaryVideos[0]} type="video/mp4" />
                        {t('video.fallback')}
                    </video>
                    
                    <div className={`video-overlay ${isPlaying ? 'hidden' : ''}`}>
                        <div className="play-button" onClick={handlePlayClick}>
                            <img src={PlayIcon} alt="Play" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
