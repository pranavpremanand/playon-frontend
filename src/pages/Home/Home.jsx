import "./Home.scss";
import BannerImg from "../../assets/images/home-banner.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import { ProductCard } from "./components/ProductCard/ProductCard";
import GridImg1 from "../../assets/images/grid1.jpeg";
import GridImg2 from "../../assets/images/grid2.jpeg";
import { Accordion } from "./components/Accordion/Accordion";
import { BestSelling } from "../../components/BestSelling/BestSelling";
import { useQuery } from "@tanstack/react-query";
import { useStateValue } from "../../StateProvider";
import { useState } from "react";
import pdt1 from "../../assets/products/argentina.webp";
import pdt2 from "../../assets/products/atletico-madrid.webp";
import pdt3 from "../../assets/products/barcelona-away.webp";
import pdt4 from "../../assets/products/barcelona.webp";
import pdt5 from "../../assets/products/liverpool.webp";
import pdt6 from "../../assets/products/man-city.webp";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { ImQuotesRight, ImQuotesLeft } from "react-icons/im";
import { useKeenSlider } from "keen-slider/react";

const qaContent = [
  "What can I sell?",
  "How much money can I make?",
  "How much time will I need to invest?",
  "How do I price my service?",
];

export const products = [
  pdt1,
  pdt2,
  pdt3,
  pdt4,
  pdt5,
  pdt6,
  pdt1,
  pdt2,
  pdt3,
  pdt4,
  pdt5,
  pdt6,
];

// slider settings
export const responsiveSettings = [
  {
    breakpoint: 1190,
    settings: {
      slidesToShow: 6,
      // slidesToShow: 5,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 990,
    settings: {
      slidesToShow: 5,
      // slidesToShow: 4,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 750,
    settings: {
      slidesToShow: 4,
      // slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 610,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 410,
    settings: {
      slidesToShow: 2.25,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 100,
    settings: {
      slidesToShow: 2.25,
      slidesToScroll: 1,
    },
  },
];

export const Home = () => {
  const [{ favorites }] = useStateValue();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);


  const animation = { duration: 5000, easing: (t) => t };

  const [sliderRef] = useKeenSlider(
    {
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
    }
  );

  return (
    <div className="home-container">
      <div className="banner" data-aos="fade-up">
        <div
          className="banner-img"
          style={{
            backgroundImage: `url(https://wallpapercave.com/wp/wp11948351.jpg)`,
          }}
          alt=""
        />
        <div className="img-overlay"></div>
        <div className="banner-text">
          <h1>Every legend has a beginning</h1>
          <h4>The only thing that matters is that you keep going.</h4>
          <button className="btn-primary">Shop now</button>
        </div>
      </div>
      <div className="home-welcome-descr">
        <p>
          <ImQuotesLeft className="quote-icon" />
          Join us in celebrating the spirit of football and the legends who have
          graced the pitch. Explore our collection, embrace your team's
          heritage, and make a statement with every jersey you wear.
          <ImQuotesRight className="quote-icon" />
        </p>
      </div>
      <h1 data-aos="fade-down" className="slider-header">
        Fans' Favorites
      </h1>
      <div className="slider keen-slider" ref={sliderRef} data-aos="fade-left">
        {products.map((item, i) => {
          return <ProductItem item={item} key={i} />;
        })}
        
          {/* <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div>
          <div class="loading-card keen-slider__slide"></div> */}
       
      </div>
      <section className="about">
        <div className="about-the-company" data-aos="fade-up">
          <h2>About the company</h2>
          <h1>Uncover the Journey to Greatness.</h1>
        </div>
        <div className="right-side" data-aos="fade-up">
          <p>
            We are passionate about football and the culture that surrounds it.
            We believe that every football fan deserves to wear their team's
            colors with pride and style. Our journey began with a vision to
            provide football enthusiasts with access to high-quality football
            jerseys that are not only a symbol of their allegiance but also a
            fashion statement.
            <br />
            <br />
            What sets us apart is our commitment to authenticity, quality, and
            customer satisfaction. Our collection features an extensive range of
            football jerseys from clubs and national teams around the world, all
            crafted with meticulous attention to detail. Whether you're a
            dedicated supporter or a casual fan, you'll find the perfect jersey
            to represent your team and showcase your love for the beautiful
            game.
            <br />
            <br />
            Join us in celebrating the spirit of football and the legends who
            have graced the pitch. Explore our collection, embrace your team's
            heritage, and make a statement with every jersey you wear.
          </p>
          <div className="link-div">
            <span>know more about us</span>
            &rarr;
          </div>
        </div>
      </section>

      <BestSelling />

      <section className="grid-2-sections" data-aos="fade-down">
        <div className="grid-box">
          <img src={GridImg1} alt="" className="main-grid-img" />
          <div className="information">
            <h1>Free Shipping</h1>
            <h2>
              We believe that great products should come with great convenience.
            </h2>
            <div className="description">
              <p>
                We're thrilled to offer you FREE SHIPPING on all orders. Whether
                you're treating yourself or shopping for loved ones, we've got
                you covered. No minimum purchase required—simply shop your
                favorites, and we'll take care of the shipping costs. It's our
                way of saying thank you for choosing us and being a part of our
                community.
              </p>
              {/* <div className="link-div">
                <span>Shop now</span>
                &rarr;
              </div> */}
            </div>
          </div>
        </div>
        <div className="grid-box">
          <div className="information">
            <h1>100% Best Quality</h1>
            <h2>Experience Excellence with Our Best Quality Products</h2>
            <div className="description">
              <p>
                Quality isn't just a promise; it's our commitment to you. We
                take pride in curating a selection of products that stand head
                and shoulders above the rest. When you shop with us, you're
                choosing nothing but the best.Explore our best quality products
                today and elevate your lifestyle with Play On. Excellence is
                just a click away.
              </p>
              {/* <div className="link-div">
                <span>know more about freelancer</span>
                &rarr;
              </div> */}
            </div>
          </div>
          <img src={GridImg2} alt="" className="main-grid-img" />
        </div>
      </section>

      {/* <section className="questions-section">
        <div className="left-side" data-aos="fade-down">
          <h1>Frequently Asked Questions</h1>
          <h2>
            Check out the FAQ sections if you have a specific query regarding a
            particular form of art.
          </h2>
        </div>
        <div className="questions" data-aos="fade-up">
          {qaContent.map((question) => {
            return <Accordion content={question} />;
          })}
        </div>
      </section> */}
    </div>
  );
};
