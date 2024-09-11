import React from "react";
import Nav from "../../components/common/Nav";

import ProductComponent from "../../components/product/ProductComponent";
import SideMenu from "../../components/product/SideMenu";
import ProductReadComponent from "../../components/product/ProductReadComponent";

const ProductRead = () => {
    return (
        <div>
            <Nav/>
            <div className="flex min-h-screen justify-center">
                <ProductReadComponent/>
            </div>
        </div>
    );
};

export default ProductRead;
