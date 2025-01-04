import React from "react";
import Header from "../components/Header/Header";
import Featured from "../components/Featured";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-[1600px] mx-auto ">
        <Header />
        <Featured />
        <Gallery />
        <Reviews />
        <Footer />
      </div>
    </>
  );
}
