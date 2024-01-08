import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import { ProductItem } from "../ProductItem/ProductItem";
import "./BestSelling.scss";
// import { fetchPopularProducts } from "../../utils/APIs";
import { useQuery } from "@tanstack/react-query";
import { useStateValue } from "../../StateProvider";
import { products, responsiveSettings } from "../../pages/Home/Home";
import { useKeenSlider } from "keen-slider/react";

export const BestSelling = () => {
  const [{ favorites }] = useStateValue();

  const animation = { duration: 5000, easing: (t) => t };
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 500px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(min-width: 650px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 760px)": {
        slides: { perView: 3.5, spacing: 5 },
      },
      "(min-width: 850px)": {
        slides: { perView: 4, spacing: 5 },
      },
      "(min-width: 1060px)": {
        slides: { perView: 5, spacing: 10 },
      },
      "(min-width: 1300px)": {
        slides: { perView: 6, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    loop: true,
    mode: "free",
    renderMode: "performance",
    // drag: false,
    created(s) {
      s.moveToIdx(2, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation);
    },
  });


  return (
    <section className="best-selling">
      <h2 data-aos="fade-down">Best Selling</h2>
      <div className="slider keen-slider" ref={sliderRef} data-aos="fade-left">
        {products.map((item) => {
          return <ProductItem item={item} />;
        })}
        {/*
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
        */}
      </div>
    </section>
  );
};
