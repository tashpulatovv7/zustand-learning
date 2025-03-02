import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './adding/Addproduct';
import Cart from './basket/Basket';
import Header from './Header';
import ProductsList from './Home';
import LikedProducts from './wishes/Wishlist';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<ProductsList />} />
				<Route path='/wishes' element={<LikedProducts />} />
				<Route path='/basket' element={<Cart />} />
				<Route path='/adding' element={<AddProduct />} />
			</Routes>
		</Router>
	);
};

export default App;
