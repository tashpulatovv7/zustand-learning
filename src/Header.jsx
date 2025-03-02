import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
					<li>
						<Link to='/adding'>Mahsulot qo'shish</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
