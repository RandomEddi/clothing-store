import React, { FC } from 'react'
import Image from 'next/image'
import Carousel from 'nuka-carousel/lib/carousel'
import { CarouselAppStyles as styles } from 'styles/ui'

interface Props {
  photos: string[]
  settings: { width: number; height: number }
}

export const CarouselApp: FC<Props> = (props) => {
  const { photos, settings } = props
  return (
    <Carousel
      defaultControlsConfig={{
        prevButtonClassName: `${styles.sliderButton} ${styles.prevButton}`,
        nextButtonClassName: `${styles.sliderButton} ${styles.nextButton}`,
        pagingDotsContainerClassName: styles.sliderDots
      }}
      pauseOnHover={false}
      adaptiveHeightAnimation
      wrapAround={photos.length > 1}
    >
      {photos.map((photo, idx) => (
        <Image
          key={idx}
          onDrag={() => false}
          src={photo}
          alt='carousel photo'
          height={settings.height}
          width={settings.width}
        />
      ))}
    </Carousel>
  )
}
