import {
	Typography, Input, IconButton, Menu,
	MenuHandler,
	MenuList,
	MenuItem, Button,
} from "@material-tailwind/react";
import React from "react";

import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Nav = () => {

	const location = useLocation(); // Get the current route

	const isActive = (path) => location.pathname === path ? 'text-purple-800 underline' : 'text-purple-600'; // Helper to add focus class

	return (
		<>
			<nav
				className='h-[10vh] flex flex-row items-center px-3 justify-between top-0 sticky md:mb-4 bg-white z-50'>
				<div className='flex flex-row items-center'>
					<Typography className={`font-bold text-lg font-poppins ${isActive('/')}`}>
						<Link to="/">다락방로고</Link>
					</Typography>
				</div>

				<div className='flex flex-row items-center'>
					<Typography className={`font-bold text-lg font-poppins ${isActive('/brand')}`}>
						<Link to="/brand">브랜드</Link>
					</Typography>
				</div>
				<div className='flex flex-row items-center'>
					<Typography className={`font-bold text-lg font-poppins ${isActive('/subscribe')}`}>
						<Link to="/subscribe">구독</Link>
					</Typography>
				</div>

				<div className='flex flex-row items-center space-x-2'>
					<Menu
						animate={{
							mount: {y: 0},
							unmount: {y: 25},
						}}
					>
						<MenuHandler>
							<Button  variant="text" className={`font-bold text-lg font-poppins  ${isActive('/product')}`}>TEA</Button>
						</MenuHandler>
						<MenuList>
							<Link to="/product?category=T01">
								<MenuItem className={isActive('/product?category=T01')}>잎차</MenuItem>
							</Link>
							<Link to="/product?category=B01">
								<MenuItem className={isActive('/product?category=B01')}>티백</MenuItem>
							</Link>
							<Link to="/product?category=F01">
								<MenuItem className={isActive('/product?category=F01')}>열매</MenuItem>
							</Link>
						</MenuList>
					</Menu>
				</div>
				<div className='flex flex-row items-center'>
					<Typography className={`font-bold text-lg font-poppins ${isActive('/news')}`}>
						<Link to="/news">뉴스</Link>
					</Typography>
				</div>
				<div className='flex flex-row items-center'>
					<Input
						size="lg"
						placeholder="검색"
						className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
					/>
				</div>
				<div className='flex flex-row items-center space-x-2'>
					<Menu
						animate={{
							mount: {y: 0},
							unmount: {y: 25},
						}}
					>
						<MenuHandler>
							<Button  variant="text" className={`font-bold text-lg font-poppins  ${isActive('/login')}`}>로그인</Button>
						</MenuHandler>
						<MenuList>
							<Link to="/login">
								<MenuItem className={isActive('/login')}>로그인</MenuItem>
							</Link>
							<Link to="/register">
								<MenuItem className={isActive('/register')}>회원가입</MenuItem>
							</Link>
						</MenuList>
					</Menu>

					<div className='flex flex-row items-center'>
						<IconButton
							className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
							<i className="fab fa-google text-lg"/>
						</IconButton>
					</div>

					<div className='flex flex-row items-center'>
						<IconButton
							className="rounded bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
							<i className="fab fa-twitter text-lg"/>
						</IconButton>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
