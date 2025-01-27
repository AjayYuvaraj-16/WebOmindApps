"use client";
import React, { useRef,useEffect } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const DualDirectionCarousel = () => {
  const bannerTextRef = useRef(null);
  const contentRef = useRef(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      bannerTextRef.current,
      {
        x: -5000,  
        opacity: 0,  
      },
      {
        x: 0,  
        opacity: 1,  
        duration: 5,  
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bannerTextRef.current,
          start: 'top 80%',  
          end: 'top 50%',  
          scrub: 7
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      {
        x: 5000,  
        opacity: 0,  
      },
      {
        x: 0,  
        opacity: 1,  
        duration: 5,  
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',  
          end: 'top 50%',  
          scrub: 7
        },
      }
    );
  }, []);



  const topItems = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5}
  ];

  const bottomItems = [
    { id: 6},
    { id: 7 },
    { id: 8 },
    { id: 9},
    { id: 10}
  ];

  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);

  const goToNextSlide = () => {
    topSwiperRef.current?.swiper.slideNext();
    bottomSwiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="my-10 container">
      <div className="font-bold text-4xl w-2/5 text-black" ref={bannerTextRef}>
        Trusted by the best in business the world, we move money for brands,
        banks and fintechs alike.
      </div>
      <div className="w-full max-w-2xl ml-auto p-4 relative" ref={contentRef}>
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
