import React, { useEffect, useState } from "react";
import MoviesComingCard from "../../components/card/MoviesComingCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/datas/moviesComingSlice";
import AppLoading from "../../components/status/AppLoading";
import ReactPaginate from "react-paginate";
import Carousel from "../../components/carousel/Carousel";

function AboutPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movieComing.movies);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(8);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    let filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "newest") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.year - b.year);
    }

    setFilteredMovies(filtered);
  }, [movies, searchTerm, sortBy]);

  const pageCount = Math.ceil(filteredMovies.length / perPage);

  const currentMovies = filteredMovies.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSortBy("");
    setFilteredMovies([]);
  };

  // Tarihi en yüksek 8 filmi al
  const topMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 8);

  return (
    <div className="w-full lg:flex md:flex lg:flex-row md:flex-row lg:flex-wrap md:flex-wrap lg:justify-center md:justify-center flex-col lg:gap-10 md:mt-4 sm:mt-4 justify-center">
      {/* Carousel */}
      <Carousel movieData={topMovies} />
      {/* Search and sorting */}
      <div className="flex justify-center  items-center mt-4  w-full opacity-30 ">
        <div className="flex items-center lg:gap-12 ">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-4 py-2 mr-2 shadow-lg shadow-slate-300 "
          />

          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-lg shadow-slate-300 "
          >
            <option className="bg-slate-500" value="">
              Sırala
            </option>
            <option className="bg-slate-500" value="newest">
              Yeni
            </option>
            <option className="bg-slate-500" value="oldest">
              Eski
            </option>
          </select>
          <button
            onClick={handleClearSearch}
            className="border border-gray-300 bg-slate-100 rounded-md px-4 py-2 shadow-lg shadow-slate-300 "
          >
            Temizle
          </button>
        </div>
      </div>
      {/* Movies */}
      <div className="lg:flex lg:flex-row lg:justify-center lg:flex-wrap lg:gap-24 md:mt-4 sm:mt-4 justify-center">
        {currentMovies && currentMovies.length > 0 ? (
          currentMovies.map((movie, index) => (
            <MoviesComingCard key={index} movie={movie} index={index} />
          ))
        ) : (
          <AppLoading />
        )}
      </div>
      {/* Pagination */}
      <div className="w-full bg-gray-900 h-16 flex flex-row justify-center items-center">
        <ReactPaginate
          className="text-lg lg:text-2xl bg-inputs-color p-2 text-white flex font-semibold space-x-10 rounded-md border-2 m-2"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default AboutPage;
