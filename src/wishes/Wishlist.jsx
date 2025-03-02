import React from 'react';
import useStore from '../store';

const LikedProducts = () => {
	const { likedProducts } = useStore();

	return (
		<div className='container'>
			<h1 className='title'>Like qilingan mahsulotlar</h1>
			{likedProducts.length === 0 ? (
				<p className='no-products'>Hozircha mahsulot yo'q.</p>
			) : (
				<div className='liked-products'>
					{likedProducts.map(product => (
						<div key={product.id} className='product-card'>
							<img src={product.imageUrl} alt={product.name} />
							<h3>{product.name}</h3>
							<p>{product.price} so'm</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LikedProducts;
