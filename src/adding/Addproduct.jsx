import React, { useState } from 'react';
import useStore from '../store';
import './addproduct.css';

const AddProduct = () => {
	const { addProduct, updateProduct, deleteProduct, products } = useStore();
	const [newProduct, setNewProduct] = useState({ id: null, name: '', price: '', imageUrl: '' });
	const [previewImage, setPreviewImage] = useState(null);
	const [editingProduct, setEditingProduct] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setNewProduct((prev) => ({ ...prev, imageUrl }));
			setPreviewImage(imageUrl);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
			alert('Iltimos, barcha maydonlarni to‘ldiring!');
			return;
		}

		if (editingProduct) {
			updateProduct(newProduct.id, newProduct); 
		} else {
			addProduct({ ...newProduct, id: Date.now() }); 
		}

		setNewProduct({ id: null, name: '', price: '', imageUrl: '' });
		setPreviewImage(null);
		setEditingProduct(false);
	};

	const handleEdit = (product) => {
		setNewProduct(product);
		setPreviewImage(product.imageUrl);
		setEditingProduct(true);
	};

	const handleDelete = (id) => {
		deleteProduct(id);
	};

	return (
		<>
			<div className='container'>
				<h1 className='title'>{editingProduct ? "Mahsulotni tahrirlash" : "Mahsulot qo'shish"}</h1>
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
					<input type='file' accept='image/*' onChange={handleImageUpload} className='file-input' />
					{previewImage && <img src={previewImage} alt='Preview' className='preview-image' />}
					<button type='submit' className='add-button'>
						{editingProduct ? "Yangilash" : "Qo'shish"}
					</button>
				</form>
			</div>
			<h2>Qo'shilgan mahsulotlar</h2>
			<div className='product-listt'>
				{products.length === 0 ? <p>Hozircha mahsulot yo'q.</p> : null}
				{products.map((product) => (
					<div key={product.id} className='product-cardd'>
						<img src={product.imageUrl} alt={product.name} />
						<h3>{product.name}</h3>
						<p>{product.price} so‘m</p>
						<div className="buttons">
							<button className='edit-button' onClick={() => handleEdit(product)}>Tahrirlash</button>
							<button className='delete-button' onClick={() => handleDelete(product.id)}>O'chirish</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AddProduct;
