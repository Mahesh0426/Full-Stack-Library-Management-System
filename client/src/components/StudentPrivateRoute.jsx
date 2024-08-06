/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const StudentPrivateRoute = (props) => {
  const { children } = props;

  const location = useLocation();

  const { user } = useSelector((state) => state.user);

  if (!user?._id) {
    return <Navigate to="/auth" state={{ from: { location } }} />;
  }

  return children;
};

export default StudentPrivateRoute;
