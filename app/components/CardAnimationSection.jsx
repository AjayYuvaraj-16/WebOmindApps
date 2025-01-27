'use client';
import React, { useEffect,useRef } from 'react'
import { gsap } from 'gsap';

const CardAnimationSection = ({animateData}) => {

  const bannerTextRef = useRef(null);
  const bannerTextRef1 = useRef(null);
const subTextRef = useRef(null);
const bannerTextRefAnimate = useRef(null);
  useEffect(() => {


    if (typeof window !== "undefined") { 
      gsap.fromTo(
        bannerTextRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          delay: 1,
        }
      );
      gsap.fromTo(
        bannerTextRef1.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          delay: 1,
        }
      );
      gsap.fromTo(
        subTextRef.current,
        { y: "-100%", opacity: 0 },
        {
          y: "0",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          delay: 1,
        }
      );
      gsap.fromTo(
        bannerTextRefAnimate.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          delay: 4,
        }
      );
      
    }


    gsap.fromTo(
      ['#innerTittle', '#innerSubTittle', '#innerText', '#AnimateCardButton'],
      { opacity: 0, y: 250 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out", delay: 2 }
    );

  }, []);

  return (
      <div className='flex justify-between items-center h-[650] py-10 my-10'>
        <div id="next-section" className="relative w-full h-[400px] mt-8 flex justify-center items-center py-6">
        </div>
        <div id='cutom-append' className='relative w-full h-[400px] mt-8 flex justify-center items-center'>
        {
        animateData?.map((data, index) => (
          <div className='customDiv' key={index} ref={bannerTextRefAnimate}>
            <h2 id='innerTittle' className="text-4xl font-semibold text-black mb-4" ref={bannerTextRef}>{data.title}</h2>
             <p id='innerSubTittle' className="text-3xl text-black mb-4" ref={bannerTextRef1}>{data.subTitle}</p>
             <p id='innerText' className='text-xl text-[#a2a2a3] mb-6' ref={subTextRef}>{data.text}</p>

             <div className="flex gap-4">
                <button id='AnimateCardButton' className="px-6 py-3 bg-[#c7ef31] text-black  font-medium rounded-full">
                {data.buttonText}
                </button>              
            </div>
          </div>
   ))}
        </div>
    </div>

  )
}

export default CardAnimationSection;