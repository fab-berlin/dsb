'use client';

import { useState } from 'react';
import { useDocuments } from '@/store/useDocuments';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

const DocumentsGroup = () => {
  const { documents } = useDocuments();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState<{ src: string }[]>([]);

  const openLightbox = (children: { id: string; detail: string }[], index: number) => {
    const slides = children.map((child) => ({ src: child.detail }));
    setLightboxSlides(slides);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={'h-[calc(100vh-184px-60px)] overflow-auto'}>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <p>{doc.date}</p>
            <p>{doc.title}</p>
            <Swiper
              spaceBetween={24}
              slidesPerView={4}
              loop={false}
            >
              {doc.children.map((child, index) => (
                <SwiperSlide key={child.id}>
                  <div className="relative aspect-3/4 w-full">
                    <Image
                      src={child.detail}
                      alt={''}
                      fill
                      sizes="25vw"
                      onClick={() => openLightbox(doc.children, index)}
                      className="cursor-pointer object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </li>
        ))}
      </ul>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </div>
  );
};

export default DocumentsGroup;
