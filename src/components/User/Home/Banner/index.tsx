"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useGetBannerHome } from "@/services/api";

const BannerHome: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // INTEGRASI
  const { data } = useGetBannerHome();
  // INTEGRASI

  // Update slide aktif setiap kali carousel berubah
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Pasang listener untuk pembaruan slide
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Pastikan state sinkron dengan slide aktif saat pertama kali dimuat
  }, [emblaApi, onSelect]);

  // Handle click to open modal
  const openModal = (src: string) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  // Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="relative h-full w-full">
        {/* Carousel Container */}
        <div className="h-full" ref={emblaRef}>
          <div className="flex md:h-[650px] h-[180px]">
            {data?.data?.map((src, index) => (
              <div key={index} className="min-w-full rounded-xl overflow-hidden">
                <Image
                  src={src?.image}
                  alt={`Banner ${index + 1}`}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(src?.image)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {data?.data?.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${index === selectedIndex
              ? "bg-secondary" // Warna untuk dot aktif
              : "bg-white" // Warna untuk dot tidak aktif
              }`}
          ></button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && modalImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Hentikan propagasi klik di elemen modal
            className="relative max-w-4xl w-full p-4"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 bg-primary rounded-full w-5 h-5 right-2 flex items-center justify-center text-white"
            >
              &times;
            </button>
            <Image
              src={modalImage}
              alt="Preview"
              width={1280}
              height={720}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default BannerHome;
