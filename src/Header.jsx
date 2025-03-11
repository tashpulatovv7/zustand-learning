import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='header'>
			<nav>
				<ul>
					<li>
						<Link to='/'>Products</Link>{' '}
					</li>
					<li>
						<Link to='/wishes'>Liked Products</Link>
					</li>
					<li>
						<Link to='/basket'>Cart</Link>
					</li>
					<li>
						<Link to='/adding'>Add Product</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
