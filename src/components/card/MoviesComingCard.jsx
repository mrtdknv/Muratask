import React, { useState } from "react";
import "./Card.css";

const MoviesComingCard = ({ movie, index }) => {
  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    favorites.push(movie);

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="card-container shadow-lg shadow-slate-600" key={index}>
      <div className="max-w-sm border min-w-[400px] border-gray-200 rounded-lg shadow m-2 bg-white overflow-hidden transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <img
            className="w-full h-auto object-cover"
            src={movie.imageUrl}
            alt={movie.name}
          />
          <div className="absolute bottom-0 z-1 w-full h-auto p-5 flex flex-col bg-slate-400">
            <div>
              <h4 className="lg:text-3xl mb-2  text-lg font-bold tracking-tight text-black dark:text-black">
                {movie.name}
              </h4>
              <p className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-black">
                Yılı: {movie.year}
              </p>
              <p className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-black">
                Tür: {movie.type}
              </p>
            </div>
            <button
              onClick={handleAddToFavorites}
              className="inline-flex justify-center items-center px-3 py-2 mt-4 text-sm font-bold text-gray-100 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Favoriye Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesComingCard;
