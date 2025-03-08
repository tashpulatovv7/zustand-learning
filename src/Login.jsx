import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './store';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setIsLoggedIn } = useStore();
	const navigate = useNavigate();

	const handleLogin = e => {
		e.preventDefault();

		if (username === 'test' && password === '1111') {
			setIsLoggedIn(true);
			navigate('/');
		} else {
			alert('Invalid credentials');
		}
	};

	return (
		<div className='container'>
			<h1 className='title'>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='input-field'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='input-field'
				/>
				<button type='submit' className='login-button'>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
