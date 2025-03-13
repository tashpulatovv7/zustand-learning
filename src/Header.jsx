import React from 'react';
import { Link } from 'react-router-dom';
import useStore from './store';
import "./index.css"

const Header = () => {
	const { isLoggedIn, logout } = useStore();

	return (
		<header className='header'>
			<nav>
				<ul>
					<li><Link to='/'>Products</Link></li>
					<li><Link to='/wishes'>Liked Products</Link></li>
					<li><Link to='/basket'>Cart</Link></li>
					{isLoggedIn && <li><Link to='/adding'>Add Product</Link></li>}
					<li>
						{isLoggedIn ? (
							<button onClick={logout}>Logout</button>
						) : (
							<Link to='/login'>Login</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
