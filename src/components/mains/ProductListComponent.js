import {useEffect, useState} from "react";
import useCustomMove from "../hooks/useCustomMove";
import {getList} from "../../apis/ProductApi";
import PageComponent from "../common/PageComponent";

import {API_SERVER_HOST} from "../../apis/host";
import {useSelector} from "react-redux";
import useExeptionHandler from "../../hooks/useExeptionHandler";

const initState = {
    contents: [],
    pageNumbers: [],
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0,
    search:null
}

const ProductListComponent = () => {

    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    // 상단매뉴에서 입력한 값을 가져 오는 부분
    const searchValue = useSelector((state) => state.searchValue);
    // 예외처리 핸들러
    const {exceptionHandle} = useExeptionHandler()

    useEffect(() => {
        const params = {
            page,
            size,
            productName: searchValue || null,  // 상단 상품이름검색값 설정
        };

        getList(params).then(data => {
            // 현재 페이지 정보 추가
            const currentPage = params.page; // 현재 요청한 페이지
            setServerData({
                ...data,
                current: currentPage, // current에 현재 페이지 설정
            });
        }).catch(error => {
                exceptionHandle(error)
        });
    }, [page, size, refresh, searchValue]);


    return (
        <section className="w-full"> {/* 전체 너비로 설정하고 배경색 추가 */}
            <div className="flex justify-center"> {/* 가로 방향으로 가운데 정렬 */}
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {serverData.contents.map((product) => (
                            <div
                                key={product.id}
                                className={`mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500
                                ${product.isSoldout ? 'pointer-events-none' : ''}`} // 부모 div에서 pointer-events-none만 적용
                                onClick={() => moveToRead(product.id)}>
                                <div className="relative">
                                    {product.productImages.length > 0 && (
                                        <img
                                            src={`${API_SERVER_HOST}/api/products/view/thumbnail_${
                                                product.productImages
                                                    .filter(image => image.productType === "INFO")
                                                    .map(image => image.productFileName)[0]
                                            }`}
                                            alt={product.productName}
                                            className={`w-full aspect-square rounded-2xl object-cover ${product.isSoldout ? 'opacity-50' : ''}`} // 섬네일에 opacity-50 적용
                                        />
                                    )}
                                    {product.isSoldout && (
                                        <div>
                                            {/*텍스트가 배경 위에 오도록 z-index 설정*/}
                                            <div
                                                className="absolute inset-0 px-6 flex items-center justify-center text-center text-white text-4xl font-bold"
                                                style={{zIndex: 1, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.15), 1px -1px 4px rgba(0, 0, 0, 0.15), -1px 1px 4px rgba(0, 0, 0, 0.15), -1px -1px 4px rgba(0, 0, 0, 0.15)'}}>
                                                SOLD OUT
                                            </div>
                                            <div className="absolute inset-0 bg-gray-800 opacity-50 rounded-2xl"></div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="mt-5"> {/* 텍스트 부분에 opacity-50 적용 */}
                                    <div className={`flex items-center justify-between ${product.isSoldout ? 'opacity-50' : ''}`}>
                                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600 tracking-tight">
                                            {product.productName}
                                        </h6>
                                        <h6 className="font-semibold text-xl leading-8 text-indigo-600 text-right">
                                            {product.salePrice.toLocaleString()}원
                                        </h6>
                                    </div>
                                    <p className="mt-2 font-normal text-sm leading-6 text-gray-500 tracking-tight">
                                        {product.isSoldout ? '품절된 상품입니다.' : (product.productDetail || "상품 설명이 존재하지 않습니다.")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br/>

            {/* Pagination 컴포넌트 */}
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </section>

    );
}

export default ProductListComponent;