import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image as ChakraImage, Skeleton } from '@chakra-ui/react';

const PLACEHOLDER_IMAGE = '/placeholder.jpg';
const CACHE_KEY_PREFIX = 'project_image_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const ProjectImage = React.memo(({ imageUrl, size = 'medium', alt }) => {
  const [displayUrl, setDisplayUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getDimensions = useCallback(() => {
    switch (size) {
      case 'small':
        return { paddingBottom: '40%', maxHeight: '200px' };
      case 'large':
        return { paddingBottom: '56.25%', maxHeight: '400px' };
      default: // medium
        return { paddingBottom: '56.25%', maxHeight: '300px' };
    }
  }, [size]);

  const loadAndCacheImage = useCallback(async () => {
    if (hasError) return;

    const cacheKey = `${CACHE_KEY_PREFIX}${imageUrl}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const { url, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setDisplayUrl(url);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Cache parsing error:', e);
      }
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image URL');
      
      const data = await response.json();
      if (!data.url) throw new Error('Invalid image URL response');

      // Pre-load the image
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          localStorage.setItem(cacheKey, JSON.stringify({
            url: data.url,
            timestamp: Date.now()
          }));
          setDisplayUrl(data.url);
          setIsLoading(false);
          resolve();
        };
        img.onerror = () => {
          setHasError(true);
          setDisplayUrl(PLACEHOLDER_IMAGE);
          setIsLoading(false);
          reject(new Error('Image load failed'));
        };
        img.src = data.url;
      });
    } catch (error) {
      console.error('Error loading image:', error);
      setHasError(true);
      setDisplayUrl(PLACEHOLDER_IMAGE);
      setIsLoading(false);
    }
  }, [imageUrl, hasError]);

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      await loadAndCacheImage();
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [loadAndCacheImage]);

  const dimensions = getDimensions();

  return (
    <Box
      position="relative"
      width="100%"
      paddingBottom={dimensions.paddingBottom}
      overflow="hidden"
    >
      {isLoading ? (
        <Skeleton
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
        />
      ) : (
        <ChakraImage
          src={displayUrl}
          alt={alt}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          maxH={dimensions.maxHeight}
        />
      )}
    </Box>
  );
});

ProjectImage.displayName = 'ProjectImage';

export default ProjectImage; 