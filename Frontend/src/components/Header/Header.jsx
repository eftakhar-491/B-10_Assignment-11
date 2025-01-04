import React from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import bg from "../../assets/bg.png";
import Lottie from "lottie-react";
import world from "../../assets/lottie/world.json";

export default function Header() {
  return (
    <>
      <header
        style={{ backgroundImage: ` url(${bg})` }}
        className=" h-screen w-full bg-cover bg-center bg-no-repeat"
      >
        <div className="w-[340px] md:w-[600px] mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* <Lottie animationData={heroLottie} loop={true}></Lottie> */}
          <Lottie animationData={world} loop={true}></Lottie>
        </div>
        <div className="backdrop-blur-lg bg-[#3FAEBB]/5  h-screen">
          <Nav />
          <Hero />
        </div>
      </header>
    </>
  );
}
