'use client';

import React, { useState } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
    className,
    containerClassName = '',
    alt,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <div className={`relative overflow-hidden ${containerClassName}`}>
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-800" />
            )}
            <img
                ref={imgRef}
                {...props}
                alt={alt}
                className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default ImageWithSkeleton;
