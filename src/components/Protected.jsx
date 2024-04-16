import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return Object.keys(currentUser).length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
