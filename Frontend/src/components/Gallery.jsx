import React from "react";

export default function Gallery() {
  return (
    <>
      <section className="mt-14 w-11/12 lg:w-4/5 mx-auto">
        <div>
          <h1 className="text-xl md:text-4xl font-Cinzel text-center">
            --- Gallery Artifacts ---{" "}
          </h1>
          <p className="text-sm font-Roboto text-center max-w-[600px] mx-auto">
            Step into the gallery to marvel at a curated selection of artifacts
            from diverse eras and cultures. Each piece is a window into the rich
            tapestry of human history{" "}
          </p>
        </div>
        <div className="">
          <div className="image-grid">
            <div className="image-row">
              <div className="image image-01"></div>
              <div className="image image-02"></div>
              <div className="image image-03"></div>
            </div>

            <div className="image-row">
              <div className="image image-04"></div>
              <div className="image image-05"></div>
              <div className="image image-06"></div>
              <div className="image image-07"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
