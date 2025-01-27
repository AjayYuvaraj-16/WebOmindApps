"use client";
import React, { useRef } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Autoplay } from "swiper/modules";

const DualDirectionCarousel = () => {
  const topItems = [
    { id: 1, image: "/api/placeholder/200/150", title: "Item 1" },
    { id: 2, image: "/api/placeholder/200/150", title: "Item 2" },
    { id: 3, image: "/api/placeholder/200/150", title: "Item 3" },
    { id: 4, image: "/api/placeholder/200/150", title: "Item 4" },
    { id: 5, image: "/api/placeholder/200/150", title: "Item 5" },
  ];

  const bottomItems = [
    { id: 6, image: "/api/placeholder/200/150", title: "Item 6" },
    { id: 7, image: "/api/placeholder/200/150", title: "Item 7" },
    { id: 8, image: "/api/placeholder/200/150", title: "Item 8" },
    { id: 9, image: "/api/placeholder/200/150", title: "Item 9" },
    { id: 10, image: "/api/placeholder/200/150", title: "Item 10" },
  ];

  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);

  const goToNextSlide = () => {
    topSwiperRef.current?.swiper.slideNext();
    bottomSwiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="my-10 container">
      <div className="font-bold text-4xl w-2/5 text-black">
        Trusted by the best in business the world, we move money for brands,
        banks and fintechs alike.
      </div>
      <div className="w-full max-w-2xl ml-auto p-4 relative">
        <div className="slider-container">
          <Swiper ref={topSwiperRef} slidesPerView={4} loop={true}>
            {topItems.map((item) => (
              <SwiperSlide key={item?.id}>
                <div className="flex-shrink-0 w-36 h-28 mr-4">
                  <div className="bg-gray-100 rounded-2xl h-full hover:bg-[darkslategrey] hover:text-white flex items-center justify-center">
                    <span>ZUDIO</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mb-4"></div>

          <Swiper ref={bottomSwiperRef}  slidesPerView={4} loop={true}>
            {bottomItems?.map((item) => (
              <SwiperSlide key={item?.id}>
                <div className="flex-shrink-0 w-36 h-28 mr-4">
                  <div className="bg-gray-100 rounded-2xl h-full hover:bg-[darkslategrey] hover:text-white flex items-center justify-center">
                    <span>ZUDIO</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={goToNextSlide}
          className="bg-[#ffdf20] rounded-full p-2 shadow-md hover:bg-white/75 transition-colors"
        >
          <ChevronRightRoundedIcon
            className="text-black"
            sx={{ fontSize: "30px" }}
          />
        </button>
      </div>
      </div>
      {/* Centered Arrow */}
    </div>
  );
};

export default DualDirectionCarousel;
