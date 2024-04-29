import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const MoviesImdbCard = ({ movie, index }) => {
  const navigate = useNavigate();

  const redirectToDetail = () => {
    navigate(`/homedetail/${movie.name}`);
  };

  return (
    <div className="card-container shadow-lg shadow-slate-600">
      <div className="max-w-sm border  min-w-[400px] border-gray-200 rounded-lg shadow m-2 bg-white overflow-hidden transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          {/* Resim */}
          <img
            className="w-full h-auto object-cover "
            src={`${movie.img}`}
            alt={movie.name}
          />
          {/* Diğer bilgiler */}
          <div className=" absolute bottom-0 z-1 w-full h-auto p-5 flex flex-col bg-slate-400">
            <h4 className=" lg:text-3xl mb-2  text-lg font-bold tracking-tight text-black dark:text-black">
              {movie.name}
            </h4>

            <h6 className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-black">
              {movie.year}
            </h6>
            <h6 className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-black">
              {movie.rate}
            </h6>
            {/* Buton */}

            <button
              onClick={redirectToDetail}
              className="inline-flex justify-center items-center px-3 py-2 mt-4 text-sm font-bold text-gray-100 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Detayına bak
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesImdbCard;
