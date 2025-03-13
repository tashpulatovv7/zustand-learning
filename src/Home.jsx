import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import useStore from './store';
import "./index.css"


const ProductsList = () => {
	const { products, toggleLike, addToCart, likedProducts } = useStore((state) => ({
		products: state.products,
		toggleLike: state.toggleLike,
		addToCart: state.addToCart,
		likedProducts: state.likedProducts,
	}));

	const isLiked = (productId) => likedProducts.some((p) => p.id === productId);

	return (
		<div className='container'>
			<h1 className='title'>Mahsulotlar</h1>
			<div className='product-list'>
				{products.length > 0 ? (
					products.map((product) => (
						<div key={product.id} className='product-card'>
							<img src={product.thumbnail} alt={product.title} />
							<h3>{product.title}</h3>
							<p>{product.price} so'm</p>

							<div className='buttons'>
							
								<button
									className={`like-button ${isLiked(product.id) ? 'liked' : ''}`}
									onClick={() => toggleLike(product)}
								>
									<FaHeart />
								</button>

								<button className='buy-button' onClick={() => addToCart(product)}>
									<FaShoppingCart /> Sotib olish
								</button>
							</div>
						</div>
					))
				) : (
					<p>Mahsulotlar mavjud emas.</p>
				)}
			</div>
		</div>
	);
};

export default ProductsList;
