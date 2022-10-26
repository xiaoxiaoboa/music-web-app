import { lazy } from "react"
import { useRoutes } from "react-router-dom"

const ArtistDetail = lazy(() => import("../pages/ArtistDetail"))
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const MvDetail = lazy(() => import("../pages/MvDetail"))
const SongListDetail = lazy(() => import("../pages/SongListDetail"))
const Album = lazy(() => import("../pages/Album"))
const SongLists = lazy(() => import("../pages/SongLists"))
const Profile = lazy(() => import("../pages/Profile"))
const Search = lazy(() => import("../pages/Search/Search"))

const Routes = () => {
  const element = useRoutes([
    {
      index: true,
      path: "/",
      element: <Home />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "mv",
      element: <MvDetail />
    },
    {
      path: "artist",
      element: <ArtistDetail />
    },
    {
      path: "album",
      element: <Album />
    },
    {
      path: "songlists",
      element: <SongLists />
    },
    {
      path: "songlist",
      element: <SongListDetail />
    },
    {
      path: "profile",
      element: <Profile />
    },
    {
      path: "search",
      element: <Search />
    }
  ])

  return element
}

export default Routes
