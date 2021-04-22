import React, { useState } from "react";
import Navigation from "./Navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SwitchInfiniteMode from "./SwitchInfiniteMode";
import PropTypes from "prop-types";
import "./carousel.css";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInfinite, setInfinite] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const slidesAmount = slides.length;
  const lastSlide = slidesAmount - 1;

  let isBtnPrevDisabled = !isInfinite && currentSlide === 0;
  let isBtnNextDisabled = !isInfinite && currentSlide === lastSlide;

  const prevSlide = () => {
    if (isBtnPrevDisabled) {
      return;
    } else {
      setCurrentSlide(currentSlide === 0 ? lastSlide : currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (isBtnNextDisabled) {
      return;
    } else {
      setCurrentSlide(currentSlide === lastSlide ? 0 : currentSlide + 1);
    }
  };

  const handleTouchStart = (e) => {
    const firstTouch = e.touches[0];
    setTouchStart({
      x: firstTouch.clientX,
      y: firstTouch.clientY,
    });
  };

  const handleTouchMove = (e) => {
    if (!touchStart.x || !touchStart.y) return false;

    let xDiff = e.touches[0].clientX - touchStart.x;
    let yDiff = e.touches[0].clientY - touchStart.y;

    const yCoordBound = yDiff < 5 && yDiff > -5;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      (xDiff > 0 && yCoordBound) && prevSlide();
      (xDiff < 0 && yCoordBound) && nextSlide();
    }

    setTouchStart({
      x: null,
      y: null,
    });
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <IoIosArrowBack
        className={isBtnPrevDisabled ? "arrow disable" : "arrow"}
        onClick={prevSlide}
      />

      <div
        className="box"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {slides.map((slide, index) => {
          return (
            <img
              className={index === currentSlide ? "slide active" : "slide"}
              src={slide.source}
              key={index}
              alt="Here could be an amazing image! :)"
            />
          );
        })}
      </div>

      <div className="navigation">
        <Navigation
          slidesAmount={slidesAmount}
          currentSlide={currentSlide}
          handleClick={setCurrentSlide}
        />
        <SwitchInfiniteMode
          handleClick={() => setInfinite(!isInfinite)}
        />
      </div>

      <IoIosArrowForward
        className={isBtnNextDisabled ? "arrow disable" : "arrow"}
        onClick={nextSlide}
      />
    </div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Carousel;
