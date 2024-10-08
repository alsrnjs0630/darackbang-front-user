import {Link} from "react-router-dom";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import useCustomMove from "../hooks/useCustomMove";
import {getList} from "../../apis/productApi";
import {getOne} from "../../apis/productApi";
import PageComponent from "../common/PageComponent";

import {API_SERVER_HOST} from "../../apis/host";

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

export function DefaultPagination() {
    const [active, setActive] = useState(1);

    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        });

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex justify-center items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)}>1</IconButton>
                <IconButton {...getItemProps(2)}>2</IconButton>
                <IconButton {...getItemProps(3)}>3</IconButton>
                <IconButton {...getItemProps(4)}>4</IconButton>
                <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

const ProductComponent = ({id}) => {

    const {page, size, refresh, moveToList, moveToRead, moveToCreate} = useCustomMove()

    const [serverData, setServerData] = useState(initState)
    const [files, setFiles] = useState([])
    const [product, setProduct] = useState(initState)

    // State to track which search field (productName or salePrice) is selected
    const [searchType, setSearchType] = useState("productName"); // Default to productName
    const [searchValue, setSearchValue] = useState(""); // Value entered in the input field

    useEffect(() => {
        const params = {
            page,
            size,
            productName: searchType === "productName" ? searchValue : null,
            salePrice: searchType === "salePrice" ? searchValue : null,
        };

        getList(params).then(data => {
            setServerData(data);
        }).catch(error => {
            // handle exception here if needed
        });
    }, [page, size, refresh, searchValue, searchType]);

    return (
        <section className="w-full"> {/* 전체 너비로 설정하고 배경색 추가 */}
            <div className="flex justify-center"> {/* 가로 방향으로 가운데 정렬 */}
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {serverData.contents.map((product) => (
                            <div
                                key={product.id}
                                className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                                onClick={() => moveToRead(product.id)}
                            >
                                <div className="">
                                    {product.productImages.length > 0 && (
                                        <img
                                            src={`${API_SERVER_HOST}/admin/products/view/thumbnail_${
                                                product.productImages
                                                    .filter(image => image.productType === "INFO") // productType이 INFO인 이미지 필터링
                                                    .map(image => image.productFileName)[0] // 첫 번째 이미지 파일명 가져오기
                                            }`}
                                            alt={product.productName}
                                            className="w-full aspect-square rounded-2xl object-cover"
                                        />
                                    )}
                                </div>
                                <div className="mt-5">
                                    <div className="flex items-center justify-between">
                                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                            {product.productName}
                                        </h6>
                                        <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                                            {product.salePrice}원
                                        </h6>
                                    </div>
                                    <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                                        {/* 추가 설명이 있다면 여기에 넣으면 돼 */}
                                        {product.description || "No description available"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br/>
            <DefaultPagination/>
        </section>

    );
}

export default ProductComponent;
