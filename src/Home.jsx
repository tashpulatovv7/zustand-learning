import React from 'react';
import { Link } from 'react-router-dom';
import useStore from './store';

const ProductsList = () => {
	const { products, addToLiked, addToCart } = useStore();

	return (
		<div className='container'>
			<h1 className='title'>Mahsulotlar</h1>
			<div className='product-list'>
				{products.map(product => (
					<div key={product.id} className='product-card'>
						<img src={product.imageUrl} alt={product.name} />
						<h3>{product.name}</h3>
						<p>{product.price} so'm</p>
						<button
							className='like-button'
							onClick={() => addToLiked(product)}
						>
							Like
						</button>
						<Link to='/cart'>
							<button
								className='buy-button'
								onClick={() => addToCart(product)}
							>
								Sotib olish
							</button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductsList;
