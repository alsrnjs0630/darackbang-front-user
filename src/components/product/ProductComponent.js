import React from "react";
import SideMenu from "./SideMenu";
import ProductListComponent from "./ProductListComponent";

const ProductComponent = () => {
    return (
        <div className="relative flex w-full min-h-screen">
            {/* SideMenu를 좌측 고정 */}
            <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 bg-white flex-shrink-0">
                <SideMenu/>
            </div>

            {/* Product List 중앙 정렬 */}
            <div className="absolute inset-0 flex justify-center items-center" style={{top: '1100px'}}>
                <ProductListComponent/>
            </div>
        </div>
    );
};


export default ProductComponent;
