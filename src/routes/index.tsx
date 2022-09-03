import { useRoutes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
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
    }
  ])

  return element
}

export default Routes
