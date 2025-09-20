import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./Footer.css"
import logo from "../../assets/images/logo.png"
import SocialIcons from "../social-icons/SocialIcons"
import HoverEffect from "../hover-effect/HoverEffect"
import { footerData } from "../../data/footerData"
import { packagesData } from "../../data/packages"

export default function Footer() {
    const { t } = useTranslation();
    
    // Generate categories from packagesData
    const getCategories = () => {
        const categories = [];
        let id = 1;
        
        // Get categories from packagesData
        Object.keys(packagesData).forEach(destination => {
            // Create readable destination names using translation
            const destinationNames = {
                'EAST_JAVA': t('footer.destinations.eastJava'),
                'CENTRAL_JAVA': t('footer.destinations.centralJava'), 
                'LOMBOK_CITY': t('footer.destinations.lombokCity'),
                'RINJANI': t('footer.destinations.rinjani'),
                'EAST_CENTER': t('footer.destinations.eastCenter')
            };
            
            const readableName = destinationNames[destination] || destination;
            
            // Set href based on destination
            let href = `/packages`;
            if (destination === 'EAST_JAVA') {
                href = `/packages?filter=East Java`;
            } else if (destination === 'RINJANI') {
                href = `/packages?filter=Rinjani`;
            }
            
            categories.push({
                id: id++,
                title: readableName,
                href: href
            });
        });
        
        return categories;
    };

    // Generate packages duration from packagesData
    const getPackagesDuration = () => {
        const durations = new Set();
        
        // Get durations from EAST_JAVA packages
        if (packagesData.EAST_JAVA) {
            Object.keys(packagesData.EAST_JAVA).forEach(duration => {
                if (Array.isArray(packagesData.EAST_JAVA[duration])) {
                    durations.add(duration);
                }
            });
        }

        // Get durations from RINJANI packages
        if (packagesData.RINJANI) {
            Object.keys(packagesData.RINJANI).forEach(duration => {
                if (Array.isArray(packagesData.RINJANI[duration])) {
                    durations.add(duration);
                }
            });
        }

        // Convert to array and sort
        const sortedDurations = Array.from(durations).sort();
        
        return sortedDurations.map((duration, index) => ({
            id: index + 1,
            title: duration,
            href: `/packages?filter=${duration}`
        }));
    };

    const dynamicCategories = getCategories();
    const dynamicPackages = getPackagesDuration();
    return (
        <footer className="footer-package-section">
            <div className="container">
                <div className="footer-content">

                    <div className="footer-column logo-column">
                        <div className="footer-logo">
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-[224px] h-[61px] mt-[-20px]"
                                />
                            </Link>
                        </div>
                        <div className="footer-description">
                            <p>{t('footer.description')}</p>
                        </div>
                        <div className="footer-social-icons">
                            <SocialIcons />
                        </div>
                    </div>

                    {/* Navigation Columns Container */}
                    <div className="contain-footer-column">
                        {/* Quick Links Column */}
                        <div className="footer-column">
                            <div className="footer-title">
                                <h4>{t('footer.quickLinks')}</h4>
                            </div>
                            <div className="footer-links">
                                {footerData.pages.map((page) => (
                                    <HoverEffect key={page.id}>
                                        <Link to={page.href}>{t(page.titleKey)}</Link>
                                    </HoverEffect>
                                ))}
                            </div>
                        </div>

                        {/* Category Column */}
                        <div className="footer-column">
                            <div className="footer-title">
                                <h4>{t('footer.categories')}</h4>
                            </div>
                            <div className="footer-links">
                                {dynamicCategories.map((category) => (
                                    <HoverEffect key={category.id}>
                                        <Link to={category.href}>{category.title}</Link>
                                    </HoverEffect>
                                ))}
                            </div>
                        </div>

                        {/* Package Column */}
                        <div className="footer-column">
                            <div className="footer-title">
                                <h4>{t('footer.packages')}</h4>
                            </div>
                            <div className="footer-links">
                                {dynamicPackages.map((packageItem) => (
                                    <HoverEffect key={packageItem.id}>
                                        <Link to={packageItem.href}>{packageItem.title}</Link>
                                    </HoverEffect>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Brand */}
                <div className="footer-bottom">
                    <h2 className="footer-brand">INDOJAVATRIP</h2>
                </div>
            </div>
        </footer>
    )
}