import React, { useState } from 'react';
import useStore from '../store';

const AddProduct = () => {
	const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });
	const { addProduct } = useStore();

	const handleChange = e => {
		const { name, value } = e.target;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		addProduct(newProduct);
		setNewProduct({ name: '', price: '', imageUrl: '' });
	};

	return (
		<div className='container'>
			<h1 className='title'>Mahsulot qo'shish</h1>
			<form className='add-product-form' onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					value={newProduct.name}
					onChange={handleChange}
					placeholder='Mahsulot nomi'
					className='input-field'
				/>
				<input
					type='number'
					name='price'
					value={newProduct.price}
					onChange={handleChange}
					placeholder='Narx'
					className='input-field'
				/>
				<input
					type='text'
					name='imageUrl'
					value={newProduct.imageUrl}
					onChange={handleChange}
					placeholder='Rasm URL'
					className='input-field'
				/>
				<button type='submit' className='add-button'>
					Qo'shish
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
