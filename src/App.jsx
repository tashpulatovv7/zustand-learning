import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './adding/AddProduct';
import Cart from './basket/Basket';
import Header from './Header';
import LoginPage from './Login';
import Products from './Products';
import useStore from './store';
import LikedProducts from './wishes/Wishlist';

const App = () => {
	const { isLoggedIn } = useStore();
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Products />} />
					<Route path='/wishes' element={<LikedProducts />} />
					<Route path='/basket' element={<Cart />} />
					<Route path='/login' element={<LoginPage />} />
					<Route
						path='/adding'
						element={isLoggedIn ? <AddProduct /> : <Navigate to='/login' />}
					/>
				</Routes>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
