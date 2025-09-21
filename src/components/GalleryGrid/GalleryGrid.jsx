import "./GalleryGrid.css"
import CloudinaryImage from "../CloudinaryImage"

export default function GalleryGrid({ images = [] }) {
    const displayImages = images.length > 0 ? images : []

    return (
        <div className="gallery-grid">
            {displayImages.map((image) => (
                <div
                    key={image.id}
                    className={`gallery-item ${image.large ? 'large' : ''}`}
                >
                    {/* Menggunakan CloudinaryImage untuk gambar dari Cloudinary */}
                    {image.cloudinaryName ? (
                        <CloudinaryImage 
                            imageName={image.cloudinaryName} 
                            alt={image.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <img src={image.src} alt={image.alt} />
                    )}
                </div>
            ))}
        </div>
    )
}