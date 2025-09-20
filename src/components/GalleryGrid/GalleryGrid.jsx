import "./GalleryGrid.css"

export default function GalleryGrid({ images = [] }) {
    const displayImages = images.length > 0 ? images : []

    return (
        <div className="gallery-grid">
            {displayImages.map((image) => (
                <div
                    key={image.id}
                    className={`gallery-item ${image.large ? 'large' : ''}`}
                >
                    <img src={image.src} alt={image.alt} />
                </div>
            ))}
        </div>
    )
}