import { Navigate, Outlet } from "react-router-dom";
import useStore from "./store";

const ProtectedRoute = () => {
	const { isLoggedIn } = useStore();
	return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
