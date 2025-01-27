'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardAnimationSection from './CardAnimationSection';



const StackedCards = () => {
  const bannerTextRef = useRef(null);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const [movedCardIndex, setMovedCardIndex] = useState(null);
  

  const animationSectionData = [
    { id: 1, src: '/images/qr-image.webp', title:"Online Payments",subTitle:"Online payments,minus the friction",text:"Collect online payments,make payouts,onboard customers and offer embedded finance solutions through an intutive dashboard qnd easy-to-integrate API's",buttonText:"Make Payments"},
    
  ]


  useEffect(() => {

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
  }

  ,[]);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth; 
    const totalCards = cardsRef.current.length; 
    const cardWidth = 400; 
    const totalSpacing = containerWidth - cardWidth; 
    const xOffset = totalSpacing / (totalCards - 1); 


    const updateStackPositions = () => { 

      let remainingCards = cardsRef.current.filter(card => card.dataset.hasMoved !== 'true');
      remainingCards.forEach((card, index) => {
        card.dataset.xOffset = index * -xOffset;
        card.dataset.yOffset = index * 30;
      });


      gsap.to(remainingCards, {
        rotateY: 40,
        rotate: 2,
        x: (i) => parseFloat(remainingCards[i].dataset.xOffset || 0),
        y: (i) => parseFloat(remainingCards[i].dataset.yOffset || 0),
        opacity: 1,
        zIndex:1,
        duration: 5,
        stagger: 0.2,
        scrollTrigger: {
                 trigger: containerRef.current,
                start: 'top 80%',  
                end: 'top 50%',  
                scrub: 7
              },
        ease: 'power2.out',
      });

    }

    updateStackPositions();

    const timeout = setTimeout(() => {

    const cardToMoveIndex = 3;
    const cardToMove = cardsRef.current[cardToMoveIndex];
    const nextSection = document.querySelector("#next-section");

    if (cardToMove && nextSection) {
      ScrollTrigger.create({
        trigger: nextSection,
        start: "top 80%", 
        end: "bottom 50%",
        duration: 1.5,
        once:true,
        ease: 'power1.inOut',
        onEnter: () => {
          const sectionRect = nextSection.getBoundingClientRect();
          const cardRect = cardToMove.getBoundingClientRect();

          const xOffset = Math.max(
            sectionRect.left - cardRect.left - cardWidth / 2,
            -containerWidth / 2
          );
          const yOffset = Math.min(
            sectionRect.top - cardRect.top + 130,
            window.innerHeight - cardRect.height
          );
      
          console.log(xOffset);
          console.log(yOffset);

          gsap.to(cardToMove, {
            x: xOffset, 
            y: yOffset,
            scale: 1,
            duration: 2.5,
            zIndex:10,
            rotateY: 10,
            rotate: 2,
            stagger: 0.2,
            ease: "power2.out",
            onComplete: () => {
              nextSection.appendChild(cardToMove);
      
              cardToMove.dataset.hasMoved = "true";
              setMovedCardIndex(cardToMoveIndex);

              gsap.set(cardToMove, {               
               rotateY: 0,
               rotate: 0,
               x: 50, 
               y: 0, 
              stagger: 0,
              scale:1,
              zIndex:1
            });    

              updateStackPositions();

              

                const replaceImage = "/images/payment.webp";



                gsap.to([cardToMove,'#innerTittle', '#innerSubTittle', '#innerText', '#AnimateCardButton'], {
                  duration: 2,
                  ease: "power2.out",
                  delay:2,
                  opacity: 0,
                  y: 100,
                  color:"#000",
                  onComplete:()=>{


                                const imgElement = document.createElement('img');
                                imgElement.src = replaceImage;
                                imgElement.alt = "Replaced Card Image";
                                imgElement.style.height = "100%";
                                imgElement.style.objectFit = "cover";
                                imgElement.style.borderRadius = "0.5rem";
                                imgElement.className = "replaced-card-image";


                                   cardToMove.innerHTML = "" ;


                                    cardToMove.parentNode.replaceChild(imgElement, cardToMove);

                                        animationSectionData?.map((data) => {
                                          const titleElement = document.getElementById('innerTittle');
                                          titleElement.textContent = data.title;
                                        
                                          const subTitleElement = document.getElementById('innerSubTittle');
                                          subTitleElement.textContent = data.subTitle;
                                        
                                          const textElement = document.getElementById('innerText');
                                          textElement.textContent = data.text;
                                        
                                          const buttonTextElement = document.getElementById('AnimateCardButton');
                                          buttonTextElement.textContent = data.buttonText; 
                                        
                                          buttonTextElement.onclick = () => {
                                            console.log("Button clicked!");
                                          };
                                          gsap.fromTo(
                                            [imgElement, '#innerTittle', '#innerSubTittle', '#innerText', '#AnimateCardButton'],
                                            { opacity: 0,y:250,duration:3,delay:2, ease: "power2.out" },
                                            {y:0,opacity: 1, duration: 3, ease: "power2.out" }
                                          );

                                        });
                                        
                                        
                    

                   

                  }
                }
                )
              
            },
          });
        },
      });
      
      
    }
    }, 1000);
    ScrollTrigger.refresh();
    return () => clearTimeout(timeout);

  }, []);

  const handleMouseEnter = (index) => {
    const hoveredCard = cardsRef.current[index];

    if (hoveredCard && hoveredCard.dataset.hasMoved === "true") return;
      if (hoveredCard) {
      gsap.to(hoveredCard, {
        rotate: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      cardsRef.current.forEach((card, i) => {
        if (card.dataset.hasMoved === "true") return;
        if (i !== index){
          if (i < index) {

            gsap.to(card, {
              x: parseFloat(card.dataset.xOffset) + 60,
              y: parseFloat(card.dataset.yOffset),
              opacity: 0.9,
              duration: 0.5,
              ease: 'power2.out'
            })
  
           } else if(i > index){
  
            gsap.to(card, {
              x: parseFloat(card.dataset.xOffset) - 70,
              y: parseFloat(card.dataset.yOffset),
              opacity: 0.9,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        }
      });
    }
  };

  const handleMouseLeave = (index) => {
    const hoveredCard = cardsRef.current[index];
if (hoveredCard && hoveredCard.dataset.hasMoved === "true") return;

    if (hoveredCard) {
      gsap.to(hoveredCard, {
        scale: 1, 
        rotate: 2,
        rotateY: 30,
        opacity:1,
        duration: 0.5,
        ease: 'power2.out',
      });

      cardsRef.current.forEach((card) => {
        if (hoveredCard && hoveredCard.dataset.hasMoved === "true") return;
        if (card.dataset.hasMoved !== "true") {
        gsap.to(card, {
          x: parseFloat(card.dataset.xOffset),
          y: parseFloat(card.dataset.yOffset),
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
      });
    }
  };

  const cards = [
    { id: 1, src: '/images/payment.webp', },
    { id: 2, src: '/images/qr-image.webp'},
    { id: 3, src: '/images/payment.webp'},
    { id: 4, src: '/images/qr-image.webp'},
    { id: 5, src: '/images/payment.webp'},
    { id: 6, src: '/images/qr-image.webp'},
    { id: 7, src: '/images/payment.webp'}
  ];




  return (
    <div className='my-10 container'>
        <div className="font-bold text-7xl w-2/5 text-black" ref={bannerTextRef}>
        Commerce,<span className="font-bold text-7xl  text-black block">made complelling</span>
      </div>
    <div className="relative w-full h-[600px] flex justify-end items-center px-8" ref={containerRef}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[index] = el)}
          className="absolute min-h-[15rem] w-[19rem] h-[auto] rounded-lg shadow-lg flex items-center justify-center"
          style={{
            opacity:0,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
           <img  src={card.src} className='custom min-h-[28rem]'  style={{objectFit:'cover'}}/>
        </div>
      ))}
    </div>
    <CardAnimationSection animateData={animationSectionData} />
</div>
  );
};

export default StackedCards;