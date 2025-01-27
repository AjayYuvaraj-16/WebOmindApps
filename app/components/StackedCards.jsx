'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardAnimationSection from './CardAnimationSection';
import Image from 'next/image';


const StackedCards = () => {

  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const [movedCardIndex, setMovedCardIndex] = useState(null);

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
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
      });

      // gsap.to(cardsRef.current, {
      //   rotateY:(i) => (cardsRef.current[i]?.dataset.hasMoved === 'true' ? null: 15),
      //   rotate:(i) => (cardsRef.current[i]?.dataset.hasMoved === 'true' ? null: 2),
      //   x: (i) => (cardsRef.current[i]?.dataset.hasMoved === 'true' ? null : parseFloat(cardsRef.current[i]?.dataset.xOffset || 0)),
      //   y: (i) =>(cardsRef.current[i]?.dataset.hasMoved === 'true' ? null : parseFloat(cardsRef.current[i]?.dataset.yOffset || 0)),      
      //   opacity: 1,
      //   duration: 0.7,
      //   stagger: 0.2,
      //   ease: "power2.out",
      // });

    }

    updateStackPositions();

    const cardToMoveIndex = 3;
    const cardToMove = cardsRef.current[cardToMoveIndex];
    const nextSection = document.querySelector("#next-section");
console.log(cardToMove,">>CArdToMove")

    if (cardToMove && nextSection) {
      ScrollTrigger.create({
        trigger: nextSection,
        start: "top center",
        end: "bottom 20%",
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

                gsap.to(cardToMove.querySelector('.text'),{
                  
                  opacity: 0,
                  duration: 2,
                  ease: 'power2.out',
                  color:"#000",
                  display:"block",
                  onComplete:()=>{
                    const appendEle = document.querySelector("#cutom-append");
                    if (appendEle) {
                      appendEle.appendChild(cardToMove.querySelector('.text'));
                    } else {
                      console.error("Element with ID 'cutom-append' not found.");
                    }
                  }
                });       

              updateStackPositions();

              setTimeout(() => {

                const replaceImage = "/images/payment.webp";

                const newText = 'This is the new text for the moved card.';

                gsap.to( cardToMove, {
                  duration: 2,
                  ease: "power2.out",
                  onComplete:()=>{
                    const imgElement = document.createElement('img');
                    imgElement.src = replaceImage;
                    imgElement.alt = "Replaced Card Image";
                    imgElement.style.height = "100%";
                    imgElement.style.objectFit = "cover";
                    imgElement.style.borderRadius = "0.5rem";
                    imgElement.className = "replaced-card-image";


                    cardToMove.innerHTML = "" ;
                    // cardToMove.appendChild(imgElement); 
              
                    cardToMove.parentNode.replaceChild(imgElement, cardToMove);

                    const textElement = document.createElement('p');
                    textElement.textContent = newText;
                    textElement.style.bottom = "10px";
                    textElement.style.left = "10px";
                    textElement.style.color = "#000";
                    textElement.style.padding = "5px 10px";
                    textElement.style.borderRadius = "0.5rem";
                    textElement.style.fontSize = "1rem";
                    textElement.style.zIndex = "2";

                    const appendTarget = document.querySelector("#cutom-append");
                   
                    if (appendTarget) {
                      appendTarget.appendChild(textElement);
                    } else {
                      console.error("Element with ID 'cutom-append' not found.");
                    }
                    
              
                    gsap.fromTo(
                      [imgElement, textElement],
                      { opacity: 0,y:250,duration:2, ease: "power2.out" },
                      {y:0,opacity: 1, duration: 1, ease: "power2.out" }
                    );

                  }
                }
                )
              },2000)
              
            },
          });
        },
      });
      
      
    }

  }, []);

  const handleMouseEnter = (index) => {
    const hoveredCard = cardsRef.current[index];

    if (hoveredCard && hoveredCard.dataset.hasMoved === "true") return;
      // Animate the hovered card
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
    { id: 1, src: '/images/payment.webp', color: '#f0f0f0',text:"Collect online payments, make payouts, onboard customers, and offer embedded finance solutions through an intuitive dashboard and easy-to-integrate APIs." },
    { id: 2, src: '/images/qr-image.webp', color: '#e0f7fa',text:"Collect online payments, make payouts, onboard customers, and offer embedded finance solutions through an intuitive dashboard" },
    { id: 3, src: '/images/payment.webp', color: '#c8e6c9',text:"Collect online payments, make payouts, onboard customers, and offer embedded finance solutions" },
    { id: 4, src: '/images/qr-image.webp', color: '#ffe0b2',text:"Collect online payments, make payouts, onboard customers, and offer Ajay" },
    { id: 5, src: '/images/payment.webp', color: '#ffccbc',text:"Collect online payments, make payouts, onboard customers" },
    { id: 6, src: '/images/qr-image.webp', color: '#d1c4e9',text:"Collect online payments, make payouts, onboard customers, and offer embedded finance solutions through an intuitive dashboard and easy-to-integrate APIs." },
    { id: 7, src: '/images/payment.webp', color: '#ffcc80',text:"Collect online payments, make payouts, onboard customers, and offer embedded finance solutions through an intuitive dashboard and easy-to-integrate APIs." },
  ];

  return (
    <div>
    <div className="relative w-full h-[700px] flex justify-end items-center px-8" ref={containerRef}>
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
    <CardAnimationSection/>
</div>
  );
};

export default StackedCards;