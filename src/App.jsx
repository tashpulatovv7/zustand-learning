import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './adding/AddProduct.jsx';
import Cart from './basket/Basket';
import Header from './Header';
import LoginPage from './Login';
import Products from './Products';
import ProtectedRoute from './ProtectedRoute';
import useStore from './store';
import LikedProducts from './wishes/Wishlist';

const App = () => {
	const { login } = useStore();
	const queryClient = new QueryClient();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			login(storedUser);
		}
	}, [login]);

	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/wishes' element={<LikedProducts />} />
				<Route path='/basket' element={<Cart />} />
				<Route path='/login' element={<LoginPage />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/adding' element={<AddProduct />} />
				</Route>
			</Routes>
		</QueryClientProvider>
	);
};

export default App;
