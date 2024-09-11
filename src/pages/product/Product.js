import React from "react";
import Nav from "../../components/common/Nav";

import ProductComponent from "../../components/product/ProductComponent";
import SideMenu from "../../components/product/SideMenu";
import Footer from "../../components/common/Footer";

const Product = () => {
    return (
        <div>
            <Nav />
            <ProductComponent/>
            <Footer />
        </div>
    );
};

export default Product;
