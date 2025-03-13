import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import API from './utils/API';
import useStore from './store';

const loginUser = async (credentials) => {
	try {
		const response = await API.post('/auth/login', credentials);
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Login failed');
	}
};

const LoginPage = () => {
	const [username, setUsername] = useState('emilys');
	const [password, setPassword] = useState('emilyspass');
	const navigate = useNavigate(); 
	const { login } = useStore(); 

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			login(data); 
			navigate('/'); 
		},
		onError: (error) => {
			console.log('Login failed:', error.message);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate({ username, password });
	};

	return (
		<div className='login-page'>
			<div className='login-container'>
				<h1>Login</h1>
				<form onSubmit={handleSubmit} className='login-form'>
					<div className='input-group'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							placeholder='Enter your username'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder='Enter your password'
						/>
					</div>
					<button
						type='submit'
						className='login-btn'
						disabled={mutation.isLoading}
					>
						{mutation.isLoading ? 'Logging in...' : 'Login'}
					</button>
					{mutation.isError && (
						<div className='error-message'>
							Error: {mutation.error.message}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
