import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";


import React from "react";
import {Link, useLocation} from "react-router-dom";
import Pagination from "../common/Pagination";


const ProductComponent = () => {

    const location = useLocation(); // Get the current route

    const isActive = (path) => location.pathname === path ? 'text-purple-800 underline' : 'text-purple-600'; // Helper to add focus class

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center">

                {/* 네비게이션 바를 그리드 아이템으로 추가 */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
                    <div className="flex space-x-4">
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/')}`}>
                            <Link to="/product?sort=pno,DESC">신상품</Link>
                        </Typography>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/brand')}`}>
                            <Link to="/product?sort=pno,DESC">인기순</Link>
                        </Typography>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/subscribe')}`}>
                            <Link to="/product?sort=pno,DESC">높은가격순</Link>
                        </Typography>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/contact')}`}>
                            <Link to="/product?sort=pno,DESC">낮은가격순</Link>
                        </Typography>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                    {/* 상품 리스트 시작 */}
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                        <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                            <img
                                className="absolute top-0 right-0 h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="product image"
                            />
                            <div
                                className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="mt-4 pb-5">
                            <a href="#">
                                <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                            </a>
                            <div className="mb-5 flex justify-center">
                                <p>
                                    <span className="text-sm font-bold text-gray-900">$179</span>
                                    <span className="text-sm text-gray-400 line-through">$499</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 상품 리스트 끝 */}
                </div>

                {/* Pagination을 아래 중앙에 배치 */}
                <div className="w-full flex items-center justify-center mt-10">
                    <Pagination/>
                </div>
            </div>
        </>
    );
};

export default ProductComponent;
