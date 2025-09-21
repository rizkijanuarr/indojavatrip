import { useState, useMemo, useEffect, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import "./PackageStyleSection.css"
import HeaderSection from "../../components/HeaderSection/HeaderSection"
import CardPackage from "../../components/CardPackage/CardPackage"
import { packagesData } from "../../data/packages"

export default function PackageSection() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const filterRef = useRef(null)

    // Filter states with checkboxes
    const [filters, setFilters] = useState({
        hari: [],
        provinsi: [],
        harga: [],
        rating: [],
        badge: []
    })

    // Flatten all packages from different categories and durations
    const getAllPackages = () => {
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

        return allPackages;
    };

    const allPackages = getAllPackages();

    // Read URL parameters and set initial filter
    useEffect(() => {
        const filterParam = searchParams.get('filter');
        if (filterParam) {
            // Auto-check the filter based on URL parameter
            if (filterParam === 'East Java' || filterParam === 'Rinjani') {
                setFilters(prev => ({
                    ...prev,
                    provinsi: [filterParam]
                }));
                setIsFilterOpen(true); // Open filter dropdown to show the applied filter
            }
            // Check if it's a duration filter (2D/1N, 3D/2N, etc.)
            else if (filterParam.includes('D/') && filterParam.includes('N')) {
                setFilters(prev => ({
                    ...prev,
                    hari: [filterParam]
                }));
                setIsFilterOpen(true); // Open filter dropdown to show the applied filter
            }
        }
    }, [searchParams]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter and search logic
    const filteredPackages = useMemo(() => {
        let filtered = allPackages;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(pkg =>
                pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        // Filter by Hari (Duration)
        if (filters.hari.length > 0) {
            filtered = filtered.filter(pkg => filters.hari.includes(pkg.durasiHari));
        }

        // Filter by Provinsi (Province/Destination)
        if (filters.provinsi.length > 0) {
            filtered = filtered.filter(pkg => {
                if (filters.provinsi.includes("East Java") && pkg.id <= 16) return true;
                if (filters.provinsi.includes("Rinjani") && pkg.id > 16) return true;
                return false;
            });
        }

        // Filter by Harga (Price Range)
        if (filters.harga.length > 0) {
            filtered = filtered.filter(pkg => {
                const price = parseInt(pkg.price.replace(/[^\d]/g, ''));
                return filters.harga.some(range => {
                    switch (range) {
                        case "< 1jt": return price < 1000000;
                        case "1-2jt": return price >= 1000000 && price <= 2000000;
                        case "2-3jt": return price >= 2000000 && price <= 3000000;
                        case "> 3jt": return price > 3000000;
                        default: return false;
                    }
                });
            });
        }

        // Filter by Rating
        if (filters.rating.length > 0) {
            filtered = filtered.filter(pkg => {
                const rating = parseFloat(pkg.rating);
                return filters.rating.some(range => {
                    switch (range) {
                        case "4.0+": return rating >= 4.0;
                        case "4.5+": return rating >= 4.5;
                        case "4.8+": return rating >= 4.8;
                        case "5.0": return rating === 5.0;
                        default: return false;
                    }
                });
            });
        }

        // Filter by Badge
        if (filters.badge.length > 0) {
            filtered = filtered.filter(pkg => {
                return filters.badge.some(badgeType => {
                    switch (badgeType) {
                        case "NEW": return pkg.hasBadge && pkg.badge === "NEW";
                        case "BESTSELLER": return pkg.hasBadge && pkg.badge === "BESTSELLER";
                        case "Regular": return !pkg.hasBadge || !pkg.badge;
                        default: return false;
                    }
                });
            });
        }

        return filtered;
    }, [allPackages, searchTerm, filters]);

    const handlePackageClick = (packageData) => {
        // Navigate to package detail page with package ID
        navigate(`/package-detail/${packageData.id}`);
    };

    const filterCategories = {
        hari: {
            title: t('packages.filterCategories.hari'),
            options: ["2D/1N", "3D/2N", "4D/3N", "5D/4N", "6D/5N"]
        },
        provinsi: {
            title: t('packages.filterCategories.provinsi'),
            options: ["East Java", "Rinjani"]
        },
        harga: {
            title: t('packages.filterCategories.harga'),
            options: ["< 1jt", "1-2jt", "2-3jt", "> 3jt"]
        },
        rating: {
            title: t('packages.filterCategories.rating'),
            options: ["4.0+", "4.5+", "4.8+", "5.0"]
        },
        badge: {
            title: t('packages.filterCategories.badge'),
            options: ["NEW", "BESTSELLER", "Regular"]
        }
    };

    const handleFilterChange = (category, option) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(option)
                ? prev[category].filter(item => item !== option)
                : [...prev[category], option]
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            hari: [],
            provinsi: [],
            harga: [],
            rating: [],
            badge: []
        });
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).reduce((total, filterArray) => total + filterArray.length, 0);
    };

    return (
        <section className="packages-section">
            <HeaderSection
                title={t('packages.title')}
            />

            <div className="container">
                <div className="packages-content">
                    {/* Filter and Search Section */}
                    <div className="filter-search-section">
                        {/* Filter Dropdown */}
                        <div className="filter-dropdown" ref={filterRef}>
                            <button
                                className="filter-button"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                {t('packages.filter')}
                                {getActiveFiltersCount() > 0 && (
                                    <span className="filter-count">{getActiveFiltersCount()}</span>
                                )}
                                <span className={`filter-arrow ${isFilterOpen ? 'open' : ''}`}>▼</span>
                            </button>
                            {isFilterOpen && (
                                <div className="filter-options-advanced">
                                    <div className="filter-header">
                                        <span>{t('packages.filterOptions')}</span>
                                        {getActiveFiltersCount() > 0 && (
                                            <button className="clear-filters" onClick={clearAllFilters}>
                                                {t('packages.clearAll')}
                                            </button>
                                        )}
                                    </div>

                                    {Object.entries(filterCategories).map(([categoryKey, category]) => (
                                        <div key={categoryKey} className="filter-category">
                                            <div className="filter-category-title">
                                                {category.title}
                                            </div>
                                            <div className="filter-category-options">
                                                {category.options.map(option => (
                                                    <label key={option} className="filter-checkbox-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters[categoryKey].includes(option)}
                                                            onChange={() => handleFilterChange(categoryKey, option)}
                                                            className="filter-checkbox"
                                                        />
                                                        <span className="filter-checkbox-text">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder={t('packages.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="results-count">
                        {t('packages.showingResults')} {filteredPackages.length} {t('packages.ofResults')} {allPackages.length} {t('packages.packagesText')}
                    </div>

                    {/* All Packages */}
                    {filteredPackages.length > 0 ? (
                        <div className="packages-grid">
                            {filteredPackages.map((pkg) => (
                                <CardPackage
                                    key={pkg.id}
                                    id={pkg.id}
                                    title={pkg.title}
                                    titleKey={pkg.titleKey}
                                    description={pkg.description}
                                    descriptionKey={pkg.descriptionKey}
                                    cloudinaryName={pkg.cloudinaryName}
                                    price={pkg.price}
                                    days={pkg.durasiHari}
                                    daysKey={pkg.durasiHariKey}
                                    badge={pkg.hasBadge ? pkg.badge : null}
                                    badgeKey={pkg.hasBadge && pkg.badgeKey ? pkg.badgeKey : null}
                                    rating={pkg.rating}
                                    ratingText={pkg.ratingText}
                                    ratingTextKey={pkg.ratingTextKey}
                                    buttonTextKey="package.bookNow"
                                    onButtonClick={handlePackageClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>{t('packages.noResults')}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}