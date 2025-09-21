import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Inisialisasi Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dpoklkm4t"
  }
});

const CloudinaryImage = ({ imageName, alt = "Image", ...props }) => {
  // Buat image object dari Cloudinary
  const myImage = cld.image(imageName);
  
  return (
    <AdvancedImage 
      cldImg={myImage} 
      alt={alt}
      {...props}
    />
  );
};

export default CloudinaryImage;