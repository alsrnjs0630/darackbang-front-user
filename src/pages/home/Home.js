import React from "react";
import Nav from "../../components/common/Nav";

import FirstSection from "../../components/FirstSection";
import SecondSection from "../../components/SecondSection";
import Footer from "../../components/common/Footer";
import Testimonial from "../../components/Testimonial";
import Faq from "../../components/Faq";
import SlideShow from "../../components/home/SlideShow";
import PopularProduct from "../../components/product/PopularProduct";
import Hero from "../../components/Hero";

const Home = () => {
	return (
		<div>
			<Nav/>
			<SlideShow/>
			<PopularProduct/>
			<Footer/>
		</div>
	);
};

export default Home;
