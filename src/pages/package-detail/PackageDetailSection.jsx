import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./PackageDetailStyleSection.css"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import MyButton from "../../components/MyButton/MyButton"
import CloudinaryImage from "../../components/CloudinaryImage"
import { packagesData } from "../../data/packages"
import { ShimmerThumbnail } from "react-shimmer-effects"

export default function PackageDetailSection() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [packageData, setPackageData] = useState(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [expandedDays, setExpandedDays] = useState({})
    const [mainImageLoaded, setMainImageLoaded] = useState(false)
    const [thumbnailsLoaded, setThumbnailsLoaded] = useState({})
    const [imageLoadStartTime, setImageLoadStartTime] = useState(null)

    // Real Cloudinary images - defined at top level
    const galleryImages = [
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449773/WTP01559_ywboqq.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449766/WTP01723_csb3an.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449766/2023_11_06_12_43_IMG_8141_ne5afk.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449765/ADS04437_a7lqfc.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449763/DSC02048_jcycfl.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449763/2023_08_30_05_34_IMG_0662_hkuoej.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449760/2023_08_30_06_55_IMG_2972_n3uqmg.webp",
        "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449756/2023_08_30_05_33_IMG_3021_zek0og.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449752/2024_03_31_11_19_IMG_1351_t05vua.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449752/ADS04838_coln0r.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449748/WTP01738_em48pt.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449748/2024_03_31_11_19_IMG_1352_nmxpcj.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449745/2023_11_14_20_37_IMG_9218_joeuaj.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449743/2023_11_14_20_37_IMG_8591_mbsuq3.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449742/2024_03_25_22_39_IMG_2061_g7yhka.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449741/ADS04836_coeajc.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449741/2023_08_30_05_34_IMG_2995_fkonwg.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449740/2023_10_14_06_52_IMG_9786_qnimfw.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449739/2023_11_11_07_50_IMG_8071_nonxel.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449739/2024_08_28_05_26_IMG_0121_f4dy7r.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760449737/2023_06_03_14_10_IMG_1104_s3phvy.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760452615/WTP07932_f0dayc.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760452607/WTP05408-2_gbarsu.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760452612/WTP05178_p28tyl.webp",
        // "https://res.cloudinary.com/dpoklkm4t/image/upload/v1760453066/WTP08214_cuywiw.webp"
    ];

    const toggleDay = (dayIndex) => {
        setExpandedDays(prev => ({
            ...prev,
            [dayIndex]: !prev[dayIndex]
        }))
    }

    // Find package by ID
    useEffect(() => {
        const findPackageById = (targetId) => {
            const allPackages = [];

            // Get East Java packages
            if (packagesData.EAST_JAVA) {
                Object.keys(packagesData.EAST_JAVA).forEach(duration => {
                    if (Array.isArray(packagesData.EAST_JAVA[duration])) {
                        allPackages.push(...packagesData.EAST_JAVA[duration]);
                    }
                });
            }

            // Get Rinjani packages
            if (packagesData.RINJANI) {
                Object.keys(packagesData.RINJANI).forEach(duration => {
                    if (Array.isArray(packagesData.RINJANI[duration])) {
                        allPackages.push(...packagesData.RINJANI[duration]);
                    }
                });
            }

            return allPackages.find(pkg => pkg.id === parseInt(targetId));
        };

        if (id) {
            const foundPackage = findPackageById(id);
            if (foundPackage) {
                setPackageData(foundPackage);
            }
        }
    }, [id]);

    // Parallax effect for entire images section with boundary
    useEffect(() => {
        if (!packageData) return;

        const handleScroll = () => {
            const imagesSection = document.querySelector('.package-images-section')
            const bookingSection = document.querySelector('.booking-section')

            if (imagesSection && bookingSection) {
                const scrolled = window.pageYOffset
                const bookingSectionTop = bookingSection.offsetTop

                // Hanya apply parallax jika scroll masih di atas booking section
                if (scrolled < bookingSectionTop - window.innerHeight / 2) {
                    const parallaxSpeed = 0.3
                    const yPos = Math.max(0, scrolled * parallaxSpeed)
                    imagesSection.style.transform = `translateY(${yPos}px)`
                } else {
                    // Reset transform ketika sudah sampai booking section
                    imagesSection.style.transform = 'translateY(0px)'
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [packageData])

    // Log gallery images and start timing
    useEffect(() => {
        console.log("📷 Gallery Images loaded:", galleryImages.length, "images");
        setImageLoadStartTime(Date.now());
    }, []);

    // Reset loading state when active image changes
    useEffect(() => {
        setMainImageLoaded(false);
        setImageLoadStartTime(Date.now());
        console.log(`🔄 Switching to image ${activeImageIndex + 1}/${galleryImages.length}`);
    }, [activeImageIndex]);

    const handleMainImageLoad = () => {
        if (imageLoadStartTime) {
            const loadTime = Date.now() - imageLoadStartTime;
            console.log(`✅ Main image loaded in ${loadTime}ms (${(loadTime / 1000).toFixed(2)}s)`);
            console.log(`📸 Image URL: ${galleryImages[activeImageIndex]}`);
        }
        setMainImageLoaded(true);
    };

    const handleMainImageError = () => {
        if (imageLoadStartTime) {
            const loadTime = Date.now() - imageLoadStartTime;
            console.error(`❌ Failed to load main image after ${loadTime}ms`);
            console.error(`📸 Failed URL: ${galleryImages[activeImageIndex]}`);
        }
        setMainImageLoaded(true);
    };

    const handleThumbnailLoad = (index) => {
        setThumbnailsLoaded(prev => ({
            ...prev,
            [index]: true
        }));
        console.log(`✅ Thumbnail ${index + 1} loaded`);
    };

    const handleThumbnailError = (index) => {
        console.error(`❌ Failed to load thumbnail ${index + 1}`);
        setThumbnailsLoaded(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const handleBackToPackages = () => {
        navigate('/packages');
    };

    const handleBookNow = () => {
        if (!packageData) return;
        const message = `Hi, saya tertarik dengan paket ${packageData.titleKey ? t(packageData.titleKey) : packageData.title}, bisa info lebih lanjut Kak ?`;
        const whatsappUrl = `https://wa.me/6281390070766?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!packageData) {
        return (
            <section className="package-detail-section">
                <HeaderSection title={t('packageDetail.title')} />
                <div className="container">
                    <div className="package-detail-content">
                        <div className="package-not-found">
                            <h2>{t('packageDetail.notFound.title')}</h2>
                            <p>{t('packageDetail.notFound.message')}</p>
                            <MyButton onClick={() => navigate('/packages')}>
                                {t('packageDetail.notFound.backButton')}
                            </MyButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="package-detail-section">
            <HeaderSection title={t('packageDetail.title')} />

            <div className="container">
                <div className="package-detail-content">
                    {/* Back Button */}
                    <div className="back-button-container">
                        <button className="back-button" onClick={handleBackToPackages}>
                            ← {t('packageDetail.backButton')}
                        </button>
                    </div>

                    {/* Package Detail Grid */}
                    <div className="package-detail-grid">
                        {/* Left Column - Images */}
                        <div className="package-images-section">
                            {/* Main Image */}
                            <div className="main-image-container">
                                {!mainImageLoaded && (
                                    <ShimmerThumbnail
                                        height={500}
                                        width="100%"
                                        className="shimmer-main-image"
                                        rounded
                                    />
                                )}
                                <img
                                    src={galleryImages[activeImageIndex]}
                                    alt={packageData.titleKey ? t(packageData.titleKey) : packageData.title}
                                    className="main-image"
                                    style={{ display: mainImageLoaded ? 'block' : 'none' }}
                                    onLoad={handleMainImageLoad}
                                    onError={handleMainImageError}
                                />
                                {packageData.hasBadge && packageData.badge && mainImageLoaded && (
                                    <div className="package-badge">
                                        {packageData.badgeKey ? t(packageData.badgeKey) : packageData.badge}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            <div className="thumbnail-images">
                                {galleryImages.map((image, index) => (
                                    <div key={index} className="thumbnail-wrapper">
                                        {!thumbnailsLoaded[index] && (
                                            <ShimmerThumbnail
                                                height={75}
                                                width={75}
                                                className="shimmer-thumbnail"
                                                rounded
                                            />
                                        )}
                                        <img
                                            src={image}
                                            alt={`${packageData.titleKey ? t(packageData.titleKey) : packageData.title} ${index + 1}`}
                                            className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                                            style={{ display: thumbnailsLoaded[index] ? 'block' : 'none' }}
                                            onClick={() => setActiveImageIndex(index)}
                                            onLoad={() => handleThumbnailLoad(index)}
                                            onError={() => handleThumbnailError(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Package Info */}
                        <div className="package-info-section">
                            {/* Package Header */}
                            <div className="package-header">
                                <div className="package-rating">
                                    <span className="star">★</span>
                                    <span className="rating-text">
                                        {packageData.rating} ({packageData.ratingTextKey ? t(packageData.ratingTextKey) : packageData.ratingText})
                                    </span>
                                </div>
                                <h1 className="package-title">
                                    {packageData.titleKey ? t(packageData.titleKey) : packageData.title}
                                </h1>
                                <p className="package-description">
                                    {packageData.descriptionKey ? t(packageData.descriptionKey) : packageData.description}
                                </p>
                            </div>

                            {/* Package Details */}
                            <div className="package-details">
                                <div className="detail-item">
                                    <span className="detail-label">{t('packageDetail.duration')}:</span>
                                    <span className="detail-value duration">
                                        {packageData.durasiHariKey ? t(packageData.durasiHariKey) : packageData.durasiHari}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">{t('packageDetail.person')} :</span>
                                    <span className="detail-value price">{packageData.price}</span>
                                </div>
                            </div>

                            {/* Package Highlights */}
                            <div className="package-highlights">
                                <h3>{t('packageDetail.highlights')}</h3>
                                <div className="highlights-grid">
                                    {packageData.include && packageData.include.length > 0 ? (
                                        packageData.include.slice(0, 6).map((item, index) => {

                                            // Try to get translation, fall back to original item
                                            let translatedItem = item;
                                            if (packageData.includeKey) {
                                                const translationKey = `${packageData.includeKey}.${index}`;
                                                try {
                                                    const translation = t(translationKey);
                                                    // Check if translation actually worked (not returning the key)
                                                    if (translation && translation !== translationKey) {
                                                        translatedItem = translation;
                                                    }
                                                } catch (error) {
                                                    translatedItem = item; // fallback to original
                                                }
                                            }
                                            return (
                                                <div key={index} className="highlight-item">
                                                    <span className="highlight-icon">✓</span>
                                                    <span className="highlight-text">{translatedItem}</span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="no-data">{t('packageDetail.noHighlights')}</p>
                                    )}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="package-itinerary">
                                <h3>{t('packageDetail.itinerary')}</h3>
                                <div className="itinerary-timeline">
                                    {packageData.itinerary && Object.keys(packageData.itinerary).length > 0 ? (
                                        Object.entries(packageData.itinerary).map(([day, activities], index) => (
                                            <div key={day} className="itinerary-item">
                                                <div
                                                    className="itinerary-day"
                                                    onClick={() => toggleDay(index)}
                                                >
                                                    <span className="day-number">{t('packageDetail.day')} {index + 1}</span>
                                                    <span className={`arrow-icon ${expandedDays[index] ? 'expanded' : ''}`}>
                                                        ↓
                                                    </span>
                                                </div>
                                                <div className={`itinerary-content ${expandedDays[index] ? 'expanded' : ''}`}>
                                                    <div className="itinerary-activities">
                                                        {activities && activities.map((activity, actIndex) => {
                                                            const translatedActivity = packageData.itineraryKey
                                                                ? t(`${packageData.itineraryKey}.${day}.${actIndex}`)
                                                                : activity;
                                                            return (
                                                                <div key={actIndex} className="activity-item">
                                                                    {translatedActivity}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-data">{t('packageDetail.noItinerary')}</p>
                                    )}
                                </div>
                            </div>

                            {/* What's Included */}
                            <div className="package-includes">
                                <div className="includes-section">
                                    <h4>{t('packageDetail.included')}</h4>
                                    <div className="includes-grid">
                                        {packageData.include && packageData.include.length > 0 ? (
                                            packageData.include.map((item, index) => {
                                                // Try to get translation, fall back to original item
                                                let translatedItem = item;
                                                if (packageData.includeKey) {
                                                    try {
                                                        translatedItem = t(`${packageData.includeKey}.${index}`);
                                                    } catch (error) {
                                                        translatedItem = item; // fallback to original
                                                    }
                                                }
                                                return (
                                                    <div key={index} className="include-item included">
                                                        <span className="include-icon">✓</span>
                                                        <span className="include-text">{translatedItem}</span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="no-data">{t('packageDetail.noIncluded')}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="excludes-section">
                                    <h4>{t('packageDetail.excluded')}</h4>
                                    <div className="includes-grid">
                                        {packageData.exclude && packageData.exclude.length > 0 ? (
                                            packageData.exclude.map((item, index) => {
                                                // Try to get translation, fall back to original item
                                                let translatedItem = item;
                                                if (packageData.excludeKey) {
                                                    try {
                                                        translatedItem = t(`${packageData.excludeKey}.${index}`);
                                                    } catch (error) {
                                                        translatedItem = item; // fallback to original
                                                    }
                                                }
                                                return (
                                                    <div key={index} className="include-item excluded">
                                                        <span className="include-icon">✗</span>
                                                        <span className="include-text">{translatedItem}</span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="no-data">{t('packageDetail.noExcluded')}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Booking Section */}
                            <div className="booking-section">
                                <div className="price-summary">
                                    <span className="total-label">{t('packageDetail.person')} :</span>
                                    <span className="total-price">{packageData.price}</span>
                                </div>

                                <MyButton
                                    variant="primary"
                                    color="#ff6600"
                                    onClick={handleBookNow}
                                    className="book-now-button"
                                >
                                    {t('packageDetail.bookNow')}
                                </MyButton>
                                <p className="booking-note">
                                    {t('packageDetail.bookingNote')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="additional-info">
                        <div className="info-grid">
                            <div className="info-card">
                                <h4>{t('packageDetail.importantNotes')}</h4>
                                <div className="important-notes-grid">
                                    <div className="note-item">
                                        <div className="note-icon">👟</div>
                                        <div className="note-text">
                                            <h5>{t('packageDetail.notes.shoes')}</h5>
                                        </div>
                                    </div>
                                    <div className="note-item">
                                        <div className="note-icon">☀️</div>
                                        <div className="note-text">
                                            <h5>{t('packageDetail.notes.protection')}</h5>
                                        </div>
                                    </div>
                                    <div className="note-item">
                                        <div className="note-icon">📱</div>
                                        <div className="note-text">
                                            <h5>{t('packageDetail.notes.camera')}</h5>
                                        </div>
                                    </div>
                                    <div className="note-item">
                                        <div className="note-icon">👨‍🏫</div>
                                        <div className="note-text">
                                            <h5>{t('packageDetail.notes.guide')}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-card">
                                <h4>{t('packageDetail.meetingPoint')}</h4>
                                <p className="meeting-description">{t('packageDetail.meetingDescription')}</p>
                                <div className="meeting-details">
                                    <div className="meeting-item">
                                        <strong>{t('packageDetail.time')}:</strong> {t('packageDetail.pickupTime')}
                                    </div>
                                    <div className="meeting-item">
                                        <strong>{t('packageDetail.contact')}:</strong>
                                        <a
                                            href="https://wa.me/6281390070766"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#25d366',
                                                textDecoration: 'none',
                                                marginLeft: '5px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            +62 813-9007-0766 (WhatsApp)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
