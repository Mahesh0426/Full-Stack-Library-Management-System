import Carousel from "react-bootstrap/Carousel";
import LMS_CAROUSEL_IMAGE1 from "../assets/LMS_Carousel_Image1.png";
import LMS_CAROUSEL_IMAGE2 from "../assets/LMS_Carousel_Image2.png";
import LMS_CAROUSEL_IMAGE3 from "../assets/LMS_Carousel_Image3.png";
import LMS_CAROUSEL_IMAGE4 from "../assets/LMS_Carousel_Image4.png";

const LibraryCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={LMS_CAROUSEL_IMAGE1}
          alt="Image"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={LMS_CAROUSEL_IMAGE2}
          alt="Image"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={LMS_CAROUSEL_IMAGE3}
          alt="Image"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={LMS_CAROUSEL_IMAGE4}
          alt="Image"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default LibraryCarousel;
