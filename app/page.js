import React from "react";
import Image from "next/image";
import Banner from "./components/Banner";
import DualDirectionCarousel from "./components/DualDirectionCarousel";
import StackedCards from "./components/StackedCards";
import Header from "./components/common/Header";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
    <Banner/>

      <div className='flex flex-col items-center justify-center'>
        <DualDirectionCarousel />
      </div>
    <StackedCards/>

    </React.Fragment>
  );
}
