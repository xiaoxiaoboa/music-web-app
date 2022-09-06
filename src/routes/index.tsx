import { useRoutes } from "react-router-dom"
import ArtistDetail from "../pages/ArtistDetail"
import Home from "../pages/Home"
import Login from "../pages/Login"
import MvDetail from "../pages/MvDetail"
import SongListDetail from "../pages/SongListDetail"

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
