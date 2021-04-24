import { useEffect, useState } from 'react'

interface IImage {
  imageRef: Element
  imageSrc?: string
}

export const useLazyImage = (
  { imageRef, imageSrc }: IImage,
  { root = null, rootMargin = '0px', threshold = 0 }: IntersectionObserverInit
) => {
  const [lazyImageSrc, setLazyImageSrc] = useState<string | undefined>()

  useEffect(() => {
    let observer: IntersectionObserver

    if (imageRef && imageSrc !== lazyImageSrc && IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
              setLazyImageSrc(imageSrc)
              observer.unobserve(imageRef)
            }
          })
        },
        {
          root,
          threshold,
          rootMargin,
        }
      )
      observer.observe(imageRef)
    } else if (imageSrc && !IntersectionObserver) {
      // Old browsers fallback
      setLazyImageSrc(imageSrc)
    }

    return () => {
      if (imageRef && observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, imageSrc, lazyImageSrc, root, rootMargin, threshold])

  return { lazyImageSrc, setLazyImageSrc }
}
