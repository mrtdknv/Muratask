import React, { useEffect } from "react";

function ErrorPage() {
  useEffect(() => {
    console.log("object");
  }, []);

  return (
    <div className="justify-center items-center  min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <h1 className=" text-4xl font-semibold text-indigo-600">404</h1>
      <h1 className="mt-4 lg:text-6xl font-bold tracking-tight items-center text-gray-900 sm:text-5xl">
        Sayfaya Ulaşılamıyor...
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        <a className="lg: text-4xl" href="/">
          Anasayfa
        </a>
      </p>
    </div>
  );
}

export default ErrorPage;
