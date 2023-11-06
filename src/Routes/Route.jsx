import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Rooms from "../Pages/Rooms/Rooms";
import MyRooms from "../Pages/MyRooms/MyRooms";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/rooms/${params.id}`),
      },
      {
        path: "/my-rooms",
        element: (
          <PrivateRoute>
            <MyRooms />
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5001/booking"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
