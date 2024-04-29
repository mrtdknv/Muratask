import homeLayout from "../layout/HomeLayout";
import home from "../page/home/Home";
import errorPage from "../page/error/ErrorPage";
import AboutPage from "../page/about/AboutPage";
import HomeDetail from "../page/home/HomeDetail";
import FavoritesPage from "../page/favorites/FavoritesPage";

var routes = [
  {
    path: "/",
    layout: homeLayout,
    component: home,
  },
  {
    path: "/homedetail/:name",
    layout: homeLayout,
    component: HomeDetail,
  },
  {
    path: "/*",
    layout: homeLayout,
    component: errorPage,
  },
  {
    path: "/moviecoming",
    layout: homeLayout,
    component: AboutPage,
  },
  {
    path: "/favorites",
    layout: homeLayout,
    component: FavoritesPage,
  },
];

export default routes;
