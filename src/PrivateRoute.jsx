import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useStore from './store';

const PrivateRoute = ({ element, ...rest }) => {
	const { isLoggedIn } = useStore();

	return <Route {...rest} element={isLoggedIn ? element : <Navigate to='/login' />} />;
};

export default PrivateRoute;
