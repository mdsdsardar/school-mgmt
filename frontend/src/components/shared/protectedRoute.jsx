import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loadUser } from "../../slices/auth.slice";
import Loader from "./loader";
import toast from "react-hot-toast";

const ProtectedRoute = ({
  isAdmin = false,
  isTeacher = false,
  isStudent = false,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, loading, userLoaded, user } = useSelector(
    (state) => state.auth,
  );

  // Load user ONLY when entering protected route
  useEffect(() => {
    if (!userLoaded) {
      dispatch(loadUser());
    }
  }, [dispatch, userLoaded]);

  // Still checking auth
  if (loading || !userLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // Not authenticated → redirect silently
  if (!isAuthenticated) {
    toast.error("Access Denied, Please login to access resources!");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Admin-only route protection
  if (isAdmin && user?.role !== "admin") {
    toast.error("Access Denied, You are not an Admin!");
    return <Navigate to="/dashboard" replace />;
  }
  if (isTeacher && user?.role !== "teacher") {
    toast.error("Access Denied, You are not a Teacher!");
    return <Navigate to="/dashboard" replace />;
  }
  if (isStudent && user?.role !== "student") {
    toast.error("Access Denied, You are not a Student!");
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
