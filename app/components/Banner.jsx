"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Banner = () => {
  const bannerTextRef = useRef(null);
  const bannerTextRef1 = useRef(null);
  const bannerImageRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline();

      console.log(bannerTextRef);

      tl.fromTo(
        bannerTextRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" }
      )

      .fromTo(
        paragraphRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
      )
      .fromTo(
        buttonRef1.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
      )
      .fromTo(
        buttonRef2.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
      )
      .fromTo(
        bannerTextRef1.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" },
      )
      

    gsap.fromTo(
        bannerImageRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" }
      )
      gsap.fromTo(
            bannerImageRef.current,
            { rotate:5 , scaleX:-1 , rotateY: 30, opacity: 1 }, 
            {
              rotateY: -20,
              duration: 3,             
              ease: "linear",           
              opacity: 1
            },
            "-=1.0"
          );
      
    }
  }, []);


  return (
    <section className="relative w-full  grid grid-cols-12 items-center justify-between px-10">
      <div className="col-span-5 items-center text-left animate">
        <div className="custom">
        <h1
          ref={bannerTextRef}
          className="text-fff text-6xl text-black font-bold tracking-wide  mb-4"
        >
         Reimagine <span className="font-bold block text-6xl text-black">'Business as usual'</span>
        </h1>
        <p ref={paragraphRef} className="text-lg text-gray-600 mb-6">
          Join millions of businesses across the globe to change the way you accept payments both online and in-person, lead the change in issuing cards and credit, and totally revamp the way you touch your customer’s lives.
        </p>
        <div className="flex gap-4">
          <button ref={buttonRef1} className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700">
            Explore Capabilities
          </button>
          <button ref={buttonRef2} className="px-6 py-3 bg-gray-200 text-black rounded-xl font-medium hover:bg-gray-300">
            Talk to us
          </button>
        </div>
        </div>
      </div>

      <div className="col-span-5 flex items-center justify-center">
        <img
          ref={bannerImageRef}
          src="https://templatekit.jegtheme.com/digipay/wp-content/uploads/sites/385/2023/06/digipay-app-my-planning-ADPM2QY.png"
          alt="Banner"
          className="w-[250] h-auto object-cover rounded-lg shadow-lg transform"
        />
      </div>

      <div className="col-span-2 flex items-center">
      <h1
          ref={bannerTextRef1}
          className="text-fff text-3xl text-black font-bold tracking-wide  mb-4"
        >
         One <span className="font-bold block text-3xl text-black">'transaction at at time'</span>
        </h1>
      </div>
    </section>
  );
};

export default Banner;
