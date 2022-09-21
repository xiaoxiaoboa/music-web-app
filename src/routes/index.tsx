import {lazy} from 'react'
import { useRoutes } from "react-router-dom"

const ArtistDetail = lazy(() => import("../pages/ArtistDetail"))
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const MvDetail = lazy(() => import("../pages/MvDetail"))
const SongListDetail = lazy(() => import("../pages/SongListDetail"))

// import ArtistDetail from "../pages/ArtistDetail"
// import Home from "../pages/Home"
// import Login from "../pages/Login"
// import MvDetail from "../pages/MvDetail"
// import SongListDetail from "../pages/SongListDetail"

const Routes = () => {
  const element = useRoutes([
    {
      index: true,
      path: "/",
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/songlistdetail',
      element: <SongListDetail />
    },
    {
      path: '/mvdetail',
      element: <MvDetail />
    },
    {
      path: '/artistdetail',
      element: <ArtistDetail />
    }
  ])

  return element
}

export default Routes
