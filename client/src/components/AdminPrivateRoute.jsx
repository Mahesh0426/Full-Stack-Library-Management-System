import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = (props) => {
  const { children } = props;
  const { user } = useSelector((state) => state.user);

  // if user is not logged in
  if (!user?._id) {
    return <Navigate to="/auth" />;
  }
  //if user is logged in, but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  // if user is logged as admin
  if (user?.role === "admin") {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminPrivateRoute;
