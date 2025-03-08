import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './adding/AddProduct';
import Cart from './basket/Basket';
import Header from './Header';
import ProductsList from './Home';
import LoginPage from './Login';
import useStore from './store';
import LikedProducts from './wishes/Wishlist';

const App = () => {
	const { isLoggedIn } = useStore();

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<ProductsList />} />
				<Route path='/wishes' element={<LikedProducts />} />
				<Route path='/basket' element={<Cart />} />
				<Route path='/login' element={<LoginPage />} />

				<Route
					path='/adding'
					element={isLoggedIn ? <AddProduct /> : <Navigate to='/login' />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
