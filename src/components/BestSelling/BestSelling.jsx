import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import { ProductItem } from "../ProductItem/ProductItem";
import "./BestSelling.scss";
import { fetchPopularProducts } from "../../apiCall";
import { useQuery } from "@tanstack/react-query";
import { useStateValue } from "../../StateProvider";
import { products, responsiveSettings } from "../../pages/Home/Home";

export const BestSelling = () => {
  const [{ favorites }] = useStateValue();

  // slider settings
  // const responsiveSettings = [
  //   {
  //     breakpoint: 1190,
  //     settings: {
  //       slidesToShow: 5,
  //       slidesToScroll: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 990,
  //     settings: {
  //       slidesToShow: 4,
  //       slidesToScroll: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 520,
  //     settings: {
  //       slidesToShow: 3,
  //       slidesToScroll: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 250,
  //     settings: {
  //       slidesToShow: 2.25,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ];

  // get list of popular products
  const { isLoading: popularProductsLoading, data: popularProducts } = useQuery(
    ["popular-products"],
    fetchPopularProducts,
    {
      onError: (err) => {
        // handle err
      },
    }
  );
  
  return (
    <section className="best-selling">
      <h2 data-aos="fade-down">Best Selling</h2>
      <div className="slider" data-aos="fade-up">
        {/* {!popularProductsLoading ? ( */}
          <Slide
            slidesToScroll={2}
            slidesToShow={5}
            indicators={false}
            transitionDuration={300}
            responsive={responsiveSettings}
            prevArrow={<IoIosArrowBack className="slick-prev" />}
            nextArrow={<IoIosArrowForward className="slick-next" />}
            autoplay={true}
            canSwipe={true}
          >
            {products.map((item) => {
              return <ProductItem item={item}/>;
            })}
          </Slide>
        {/* ) : (
          <Slide
            slidesToScroll={2}
            slidesToShow={5}
            indicators={false}
            transitionDuration={700}
            responsive={responsiveSettings}
            prevArrow={<IoIosArrowBack className="slick-prev" />}
            nextArrow={<IoIosArrowForward className="slick-next" />}
            autoplay={true}
            canSwipe={true}
          >
            <div class="loading-card"></div>
            <div class="loading-card"></div>
            <div class="loading-card"></div>
            <div class="loading-card"></div>
            <div class="loading-card"></div>
          </Slide>
        )} */}
      </div>
    </section>
  );
};
