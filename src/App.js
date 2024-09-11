import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Subscribe from "./pages/Subscribe";
import Brand from "./pages/Brand";
import Product from "./pages/product/Product";
import ProductRead from "./pages/product/ProductRead";
import News from "./pages/news/News";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/subscribe' element={<Subscribe />} />
				<Route path='/brand' element={<Brand />} />
				<Route path='/product' element={<Product />} />
				<Route path='/news' element={<News />} />
				<Route path='/product/read' element={<ProductRead />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
