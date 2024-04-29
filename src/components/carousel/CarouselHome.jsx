import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselHome = ({ movieData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topMovies, setTopMovies] = useState([]);
  const [sortBy, setSortBy] = useState("rate"); // Default olarak rate'e göre sırala

  useEffect(() => {
    // İlk 8 resmi sortBy değerine göre sırala ve setTopMovies ile güncelle
    const sortedMovies = [...movieData]
      .sort((a, b) => {
        if (sortBy === "rate") {
          return b.rate - a.rate;
        } else if (sortBy === "year") {
          return b.year - a.year;
        }
        return 0;
      })
      .slice(0, 8);
    setTopMovies(sortedMovies);
  }, [movieData, sortBy]);

  const goToPrevSlide = () => {
    const newIndex =
      currentIndex === 0 ? topMovies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex =
      currentIndex === topMovies.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!topMovies || topMovies.length === 0) {
    return <div>No movies to display</div>;
  }

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {topMovies.map((movie, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "block" : "hidden"
            } duration-700 ease-in-out`}
          >
            <img
              src={movie.img}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        <FaChevronLeft className="text-white text-2xl" />
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        <FaChevronRight className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default CarouselHome;
