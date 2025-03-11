import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const fetchProducts = async (page = 1) => {
	const res = await axios.get(
		`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`
	);
	return res.data;
};

const Products = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', currentPage], 
		queryFn: () => fetchProducts(currentPage), 
		keepPreviousData: true, 
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading products.</div>;

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='products-page'>
			<h1>Products</h1>
			<div className='product-list'>
				{data.products.map(product => (
					<div key={product.id} className='product-card'>
						<img src={product.thumbnail} alt={product.name} />
						<h3>{product.name}</h3>
						<p>{product.price} so'm</p>
					</div>
				))}
			</div>

			<div className='pagination'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span>Page {currentPage}</span>
				<button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
			</div>
		</div>
	);
};

export default Products;
