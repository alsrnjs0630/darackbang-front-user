import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {getOne} from "../../apis/productApi"

import {API_SERVER_HOST} from "../../apis/host";

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

    return (
        <div>
            <div>
                상품아이디: {product.id}번의 상세정보입니다.
            </div>
            <div>
                상품명: {product.productName}
            </div>
            <div>
                상품가격: {product.salePrice.toLocaleString()}원
            </div>
            <div>
                상품이미지: <br/>
                {/*필요시 섬네일 출력:*/}
                {/*<img src={`${API_SERVER_HOST}/api/products/view/thumbnail_${product.productImages[0]?.productFileName}`}/>*/}
                info
                {infoImages.length > 0 ? (
                    infoImages.map((img) => (
                        <div>
                            <img
                                key={img.id} // id를 key로 사용
                                src={img.preview}
                            /><br/>
                        </div>
                    ))
                ) : (
                    <p>INFO 이미지가 없습니다.</p>
                )}
                desc
                {descImages.length > 0 ? (
                    descImages.map((img) => (
                        <div>
                            <img
                                key={img.id} // id를 key로 사용
                                src={img.preview}
                            /><br/>
                        </div>
                    ))
                ) : (
                    <p>DESC 이미지가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default ProductInfoComponent;