import { useRoutes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"

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
    }
  ])

  return element
}

export default Routes
