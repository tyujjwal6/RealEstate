// src/components/ImageWithLoader.jsx

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the blur effect css

const ImageWithLoader = ({ src, alt, className }) => (
  <LazyLoadImage
    alt={alt}
    src={src}
    effect="blur" // This will show a blurry placeholder
    className={className}


        threshold={100} 

    // You can also provide a tiny placeholder image for an even better effect
    // placeholderSrc="/path/to/your/tiny-placeholder.jpg"
  />
);

export default ImageWithLoader;
