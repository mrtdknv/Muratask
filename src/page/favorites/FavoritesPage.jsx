import React, { useEffect, useState } from "react";
import FavoritesCard from "../../components/card/FavoritesCard";
import ReactPaginate from "react-paginate";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(8);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const pageCount = Math.ceil(favorites.length / perPage);

  const currentFavorites = favorites.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="lg:flex lg:flex-row lg:justify-center lg:flex-wrap lg:gap-24 md:mt-4 sm:mt-4 justify-center">
        {currentFavorites.map((favorite, index) => (
          <FavoritesCard key={index} movie={favorite} />
        ))}
      </div>
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
};

export default FavoritesPage;
