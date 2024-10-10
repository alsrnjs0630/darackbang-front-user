import React from "react";
import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getOne} from "../../apis/productApi"

import {API_SERVER_HOST} from "../../apis/host";

import {Button, Carousel} from "@material-tailwind/react";

const initState ={
    id: "",
    pno: "",
    productName: "",
    productDetail: "",
    retailPrice: "",
    salePrice: "",
    type: "",
    caution: "",
    isVisible: true,
    manufacture: "",
    brand: "",
    origin: "",
    material: "",
    category: "",
    saleCompany: "",
    saleCompanyInfo: "",
    isDeleted: false,
    isSoldout: false,
    nutrition: "",
    quantity: "",
    packageQuantity:"",
    expirationDate: "",
    manufactureDate: "",
    isGmo: false,
    volume: "",
    wishCount: "",
    productImages:[],
    createdDate:"",
    updatedDate:"",
}

const ProductInfoComponent = () => {
    const { id } = useParams(); // URL에서 id 가져오기
    console.log(`상품 아이디: ${id}`);

    const [product, setProduct] = useState(initState)
    const [infoImages, setInfoImages] = useState([]);
    const [descImages, setDescImages] = useState([]);
    const [quantity, setQuantity] = useState(1); // 수량을 상태로 관리, 기본값 1

    const [value, setValue] = React.useState(0);

    useEffect(() => {
        getOne(id).then(data => {
            console.log(data);
            setProduct(data);

            const infoImages = data.productImages
                .filter((img) => img.productType === "INFO")
                .map((img) => ({
                    ...img,
                    preview: `${API_SERVER_HOST}/api/products/view/${img.productFileName}`,
                }));

            const descImages = data.productImages
                .filter((img) => img.productType === "DESC")
                .map((img) => ({
                    ...img,
                    preview: `${API_SERVER_HOST}/api/products/view/${img.productFileName}`,
                }));

            setInfoImages(infoImages); // INFO 이미지를 setFiles에 저장
            setDescImages(descImages); // DESC 이미지를 setDescImages에 저장

        }).catch(err => {
            console.error("상품 정보를 가져오는 중 오류 발생:", err);
        });
    }, [id]);

    // 수량 증가 함수
    const handleIncrement = () => {
        if (quantity < product.quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    // 수량 감소 함수
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    // 수량 입력 함수
    const handleChange = (e) => {
        const value = Math.max(0, Math.min(product.quantity, e.target.value)); // 범위를 1에서 product.quantity로 제한
        setQuantity(value); // 상태 업데이트
    };

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 페이지가 로드될 때 맨 위로 스크롤
    }, [location]); // location이 바뀔 때마다 실행

    return (
        <div className="w-[1000px]">

            {/* 상단 영역 */}
            <div className="flex justify-between">

                {/* 슬라이드 형태의 INFO 이미지 */}
                <div className="w-full">
                    {infoImages.length > 0 ? (
                        <Carousel className="rounded-2xl">
                            {infoImages.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.preview}
                                    className="w-full aspect-square rounded-2xl object-cover"
                                    alt={img.productFileName} // alt 속성 추가
                                />
                            ))}
                        </Carousel>
                    ) : (
                        <p>INFO 이미지가 없습니다.</p>
                    )}
                </div>

                {/* 상품명, 가격, 수량, 총 가격, 버튼 */}
                <div className="ml-10 w-full flex flex-col justify-between">
                    <div>
                        <div className="text-3xl font-bold text-indigo-800 tracking-tight">
                            {product.productName}
                        </div>
                        <div className="text-3xl font-bold mt-1.5">
                            {product.salePrice.toLocaleString()}원
                        </div>
                        <div className="text-xl font-bold text-right text-gray-500 mt-10 tracking-tight">총 가격 :</div>
                        <div className="flex justify-between items-center mt-1.5">
                            <form className="max-w-xs mt-1">
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" onClick={handleDecrement} // 수량 감소 함수 연결
                                            id="decrement-button"
                                            data-input-counter-decrement="quantity-input"
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <input type="text" id="quantity-input" value={quantity} // 수량을 상태로 관리
                                           onChange={handleChange} // 입력값 변경 핸들러 추가
                                           className="w-[3rem] bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="999" required/>
                                    <button type="button" onClick={handleIncrement} // 수량 증가 함수 연결
                                            id="increment-button"
                                            data-input-counter-increment="quantity-input"
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div className="font-bold pb-1 text-5xl text-right text-indigo-600">
                                {(quantity * product.salePrice).toLocaleString()}원
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="flex gap-8 justify-center">
                        <Button className="w-[170px] h-[70px] text-2xl rounded-xl">
                            바로구매
                        </Button>
                        <Button className="w-[170px] h-[70px] text-2xl rounded-xl">
                            장바구니
                        </Button>
                    </div>
                </div>
            </div>
            <br/>
            <hr className="border-0 bg-gray-100 h-0.5"/>

            {/* 하단 영역 (DESC 이미지 타입, 상품 정보 제공 고시) */}
            <div className="grid place-items-center">
                <div
                    className="m-10 py-4 w-[200px] text-center text-2xl text-white font-bold tracking-tight bg-indigo-200 rounded-xl">
                    상품 상세정보
                </div>
                <div>
                    {descImages.length > 0 ? (
                        descImages.map((img, index) => (
                            <div>
                                <img
                                    key={img.id} // id를 key로 사용
                                    src={img.preview}/>
                                {/* 마지막 이미지가 아닐 때만 <br/>을 추가 */}
                                {index < descImages.length - 1 && <br/>}
                            </div>
                        ))
                    ) : (
                        <p>DESC 이미지가 없습니다.</p>
                    )}
                </div>
                {/*<div>*/}
                {/*    {descImages.length > 0 ? (*/}
                {/*        descImages.map((img) => (*/}
                {/*            <div>*/}
                {/*                <img*/}
                {/*                    key={img.id} // id를 key로 사용*/}
                {/*                    src={img.preview}*/}
                {/*                /><br/>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*    ) : (*/}
                {/*        <p>DESC 이미지가 없습니다.</p>*/}
                {/*    )}*/}
                {/*</div>*/}
                <div
                    className="m-10 py-4 w-[260px] text-center text-2xl text-white font-bold tracking-tight bg-indigo-200 rounded-xl">
                    상품 정보 제공 고시
                </div>
                <div>
                    <table>
                        <tr>
                            <th>상품명</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductInfoComponent;