import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import MoviesImdbCard from "../../components/card/MoviesImdbCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/datas/moviesImdbSlice";
import AppLoading from "../../components/status/AppLoading";
import ReactPaginate from "react-paginate";
import CarouselHome from "../../components/carousel/CarouselHome";

function Home() {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.moviesImdb.movies);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(8);
  const [filteredMovies, setFilteredMovies] = useState(allMovies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(allMovies);
  }, [allMovies, currentPage]);

  const pageCount = Math.ceil(filteredMovies.length / perPage);

  const currentMovies = filteredMovies.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // İlk 8 filmin rate değerine göre sırala
  const topMovies = [...currentMovies]
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 8);

  return (
    <div className="w-full lg:flex md:flex lg:flex-row md:flex-row lg:flex-wrap md:flex-wrap lg:justify-center md:justify-center flex-col lg:gap-10 md:mt-4 sm:mt-4 justify-center">
      <>
        <CarouselHome movieData={topMovies} />
        <div className="lg:flex lg:flex-row lg:justify-center lg:flex-wrap lg:gap-24 md:mt-4 sm:mt-4 justify-center">
          {currentMovies && currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <LazyLoad key={index}>
                <MoviesImdbCard movie={movie} index={index} />
              </LazyLoad>
            ))
          ) : (
            <AppLoading />
          )}
        </div>
        <div className="w-full bg-gray-900 h-16 flex flex-row justify-center items-center">
          <ReactPaginate
            className="text-lg mt-10 lg:text-2xl bg-inputs-color p-2 text-white flex font-semibold space-x-10 rounded-md border-2 m-2"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    </div>
  );
}

export default Home;
