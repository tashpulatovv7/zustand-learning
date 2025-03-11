import React from 'react';
import { Link } from 'react-router-dom';
import useStore from './store';

const Header = () => {
	const { isLoggedIn } = useStore();

	return (
		<header className='header'>
			<nav>
				<ul>
					<li>
						<Link to='/'>Mahsulotlar</Link>
					</li>
					<li>
						<Link to='/wishes'>Like qilingan</Link>
					</li>
					<li>
						<Link to='/basket'>Savatcha</Link>
					</li>

					{isLoggedIn && (
						<li>
							<Link to='/adding'>Mahsulot qo'shish</Link>
						</li>
					)}

					{!isLoggedIn && (
						<li>
							<Link to='/login'>Login</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
