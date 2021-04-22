import React from "react";
import PropTypes from "prop-types";

const Navigation = ({ slidesAmount, currentSlide, handleClick }) => {
  const navigationDots = [];

  for (let i = 0; i < slidesAmount; i++) {
    navigationDots.push(<button onClick={() => handleClick(i)} />);
  }

  return (
    <>
      {navigationDots.map((dot, index) => {
        return (
          <div
            className={index === currentSlide ? "active" : undefined}
            key={index}
          >
            {dot}
          </div>
        );
      })}
    </>
  );
};

Navigation.propTypes = {
  slidesAmount: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Navigation;
