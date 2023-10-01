import "./AboutUs.scss";
import BannerImg from "../../assets/images/about-us.jpg";
import AboutUsBanner from "../../assets/images/about-us-banner.jpg";
import Person1 from "../../assets/images/Rectangle 4.png";
import Person2 from "../../assets/images/Rectangle 4-1.png";
import Person3 from "../../assets/images/Rectangle 4-2.png";
import Person4 from "../../assets/images/Rectangle 4-3.png";
import Person5 from "../../assets/images/Rectangle 4-4.png";

export const AboutUs = () => {
  const artists = [Person1, Person2, Person3, Person4, Person5];
  return (
    <div className="about-us-main">
      <div className="header" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="content">
          <div className="left" data-aos="fade-right">
            <h1>Play <span>On!</span></h1>
            <h2>
              Jerseys That Make You <b>Feel Like a Pro</b>.
            </h2>
          </div>
          <div data-aos="fade-left">
            <p>
              We are passionate about football and the culture that surrounds
              it. We believe that every football fan deserves to wear their
              team's colors with pride and style. Our journey began with a
              vision to provide football enthusiasts with access to high-quality
              football jerseys that are not only a symbol of their allegiance
              but also a fashion statement.
            </p>
          </div>
        </div>
      </div>
      <div className="our-story" data-aos="fade-up">
        <h1>Our Speciality</h1>
        <p>
          What sets us apart is our commitment to authenticity, quality, and
          customer satisfaction. Our collection features an extensive range of
          football jerseys from clubs and national teams around the world, all
          crafted with meticulous attention to detail. Whether you're a
          dedicated supporter or a casual fan, you'll find the perfect jersey to
          represent your team and showcase your love for the beautiful game. As
          fellow football lovers, we understand the thrill of wearing your
          favorite player's jersey or donning the iconic colors of your club.
          That's why we strive to offer a seamless shopping experience, ensuring
          that you receive top-notch products that exceed your expectations. Our
          mission is simple: to be your go-to destination for authentic football
          jerseys, providing you with the opportunity to feel like a part of the
          game, on and off the field. We are dedicated to making your shopping
          experience enjoyable and hassle-free, backed by our commitment to
          exceptional customer service. Join us in celebrating the spirit of
          football and the legends who have graced the pitch. Explore our
          collection, embrace your team's heritage, and make a statement with
          every jersey you wear. Thank you for choosing <b>Play On</b> as your
          trusted source for football jerseys. We look forward to being a part
          of your football journey.
        </p>
      </div>
      <div
        style={{ backgroundImage: `url(${AboutUsBanner})` }}
        className="banner-image"
        data-aos="fade-up"
      />
      {/* <div className="team">
        <h1 data-aos="fade-right">Meet The Team</h1>
        <p data-aos="fade-right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus
          neque quis nisi pharetra, eu vestibulum felis lacinia. Cras
          sollicitudin faucibus est nec porttitor.
        </p>
        <div className="team-members" data-aos="fade-left">
          {artists.map((artist) => (
            <div className="artist">
              <img src={artist} alt="artist" />
              <span>Gregg Rosen</span>
              <span>Artist</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
