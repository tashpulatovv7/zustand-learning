import React from 'react';
import useStore from '../store';
import { FaTrash } from 'react-icons/fa';
import './wishlist.css';

const LikedProducts = () => {
	const { likedProducts, toggleLike } = useStore();

	return (
		<div className='favorites'>
			<h1 className='title'>Like qilingan mahsulotlar</h1>
			{likedProducts.length === 0 ? (
				<p className='no-products'>Hozircha mahsulot yo'q.</p>
			) : (
				<div className='liked-products'>
					{likedProducts.map((product) => (
						<div key={product.id} className='product-card'>
							<img
								src={product.imageUrl || product.thumbnail}
								alt={product.name || product.title}
							/>
							<h3>{product.name || product.title}</h3>
							<p>{product.price} so'm</p>
							<button
								className="remove-button"
								onClick={() => toggleLike(product)}
							>
								<FaTrash /> O'chirish
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LikedProducts;
