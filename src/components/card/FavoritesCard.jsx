import React from "react";

const FavoritesCard = ({ movie }) => {
  // movie prop'u içindeki imageUrl, name, year ve type özelliklerini kontrol et
  if (!movie || !movie.imageUrl || !movie.name || !movie.year || !movie.type) {
    return null; // Eğer eksik özellikler varsa, bileşeni render etme ve hata almayı önle
  }

  function handleOnDelete() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    // Silinecek filmin index'ini bul
    const index = favorites.findIndex((item) => item.id === movie.id);
    // Eğer bulunduysa, favorilerden kaldır
    if (index !== -1) {
      favorites.splice(index, 1);
      // Güncellenmiş favorileri localStorage'a geri kaydet
      localStorage.setItem("favorites", JSON.stringify(favorites));
      // Sayfayı yenile
      window.location.reload();
    }
  }

  return (
    <div className="card-container shadow-lg shadow-slate-600">
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
              onClick={handleOnDelete}
              className="inline-flex justify-center items-center px-3 py-2 mt-4 text-sm font-bold bg-red-700 text-gray-100 bg-red-700-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Favoriden Kaldır
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
