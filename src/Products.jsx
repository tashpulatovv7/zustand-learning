import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useStore from './store';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import "./index.css"


const fetchProducts = async (page = 1) => {
	const res = await axios.get(
		`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`
	);
	return res.data.products;
};

const Products = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { setProducts, toggleLike, addToCart, likedProducts } = useStore();
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', currentPage],
		queryFn: () => fetchProducts(currentPage),
		keepPreviousData: true,
	});

	useEffect(() => {
		if (data) {
			setProducts(data);
		}
	}, [data, setProducts]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading products.</div>;

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="products-page">
			<h1>Products</h1>
			<div className="product-list">
				{data.map((product) => (
					<div key={product.id} className="product-card">
						<img
							src={product.thumbnail}
							alt={product.title}
							style={{ width: '150px', height: '150px' }}
						/>
						<h3>{product.title}</h3>
						<p>{product.price} so'm</p>

						<div className="buttons">
							<button
								className={`like-button ${likedProducts.some((p) => p.id === product.id) ? 'liked' : ''}`}
								onClick={() => toggleLike(product)}
							>
								<FaHeart />
							</button>

							<button className="buy-button" onClick={() => addToCart(product)}>
								<FaShoppingCart /> Sotib olish
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="pagination">
				<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
					Previous
				</button>
				<span>Page {currentPage}</span>
				<button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
			</div>
		</div>
	);
};

export default Products;
