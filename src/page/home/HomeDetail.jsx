import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviesByName } from "../../redux/datas/moviesImdbSlice";
import Jumbatron from "../../components/jumbatron/Jumbatron";

function HomeDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    setLoading(true);
    const result = await dispatch(getMoviesByName(params.name)).unwrap();
    if (!result) {
      navigate(`/error`);
    }

    setMovie(result);
    setLoading(false);
  }

  const handleWatchMovie = () => {
    window.open(
      `${movie.url}`,
      "_blank" // açılacak pencerenin hedefi
    );
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return <Jumbatron movie={movie} />;
}

export default HomeDetail;
