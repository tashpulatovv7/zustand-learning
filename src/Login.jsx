import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

const loginUser = async credentials => {
	const mockUser = {
		email: 'test@gmail.com',
		password: 'pass1111',
	};

	if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
		return { success: true, message: 'Login successful!' };
	} else {
		throw new Error('Invalid email or password');
	}
};

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: data => {
			console.log('Login successful:', data);
		},
		onError: error => {
			console.log('Login failed:', error);
		},
	});

	const handleSubmit = e => {
		e.preventDefault();
		mutation.mutate({ email, password });
	};

	return (
		<div className='login-page'>
			<div className='login-container'>
				<h1>Login</h1>
				<form onSubmit={handleSubmit} className='login-form'>
					<div className='input-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							placeholder='Enter your email'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
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
