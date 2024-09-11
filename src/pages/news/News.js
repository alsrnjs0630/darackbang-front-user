import Nav from "../../components/common/Nav";

import React from "react";
import NewsComponent from "../../components/news/NewsComponent";
import Footer from "../../components/common/Footer";

const News = () => {
    return (
        <div>
            <Nav/>
            <NewsComponent/>
            <Footer/>
        </div>
    );
};

export default News;
