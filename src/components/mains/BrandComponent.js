import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const BrandComponent = () => {
    const location = useLocation();

    const sectionTitleClass = "text-lg font-bold";
    const sectionContentClass = "text-base pl-5 pt-3";

    useEffect(() => {
        window.scrollTo(0, 0);  // 페이지가 로드될 때 맨 위로 스크롤
    }, [location.key]);         // key가 바뀔 때마다 실행

    return (
        <div className="w-[1000px] mb-5">
            <h5 className="mb-10 font-bold text-indigo-600">다락방(茶樂房) 브랜드 소개</h5>
            <div className="text-gray-800">
                <div className="text-2xl font-bold text-center text-brown-300">
                    <br/>
                    “다양한 브랜드의 차를 한 곳에서!”<br/><br/><br/>
                </div>
                <div>
                    <div>
                        <img
                            src='/images/darackbang_brand1.png'
                            alt="다락방 브랜드이미지1"
                        /><br/>
                    </div>
                    <div className={sectionTitleClass}>
                        •&nbsp;&nbsp;다양한 차 제공
                    </div>
                    <div className={sectionContentClass}>
                        다락방은 차 애호가 여러분을 위해 다양한 업체의 인기 상품을 한곳에 모아 판매합니다.
                        세계 각국에서 사랑받는 다양한 차를 만나보세요.
                        귀하의 입맛에 맞는 차를 선택할 수 있도록, 우리는 판매량이 가장 높은 상품을 정성껏 선별했습니다.
                        우리의 목표는 여러분이 최상의 차를 쉽게 발견하고 즐길 수 있도록 돕는 것입니다.
                        주기적으로 새롭게 추가되는 다양한 차들로, 매번 새로운 경험을 제공할 것입니다.<br/><br/><br/>
                    </div>
                </div>
                <div>
                    <div>
                        <img
                            src='/images/darackbang_brand2.png'
                            alt="다락방 브랜드이미지2"
                        /><br/>
                    </div>
                    <div className={sectionTitleClass}>
                        •&nbsp;&nbsp;간편결제로 편리한 구매
                    </div>
                    <div className={sectionContentClass}>
                        고객님들의 편리한 쇼핑을 위해 다락방은 포트원 QR코드 결제를 통한 간편 결제 시스템을 도입했습니다.
                        QR코드를 스캔하기만 하면 안전하고 빠르게 결제를 완료할 수 있어,
                        복잡한 결제 과정 없이도 쉽고 간편하게 원하는 차를 구매할 수 있습니다.
                        이제는 쇼핑이 더 이상 번거롭지 않습니다!
                        다양한 차를 간편하게 구매하고, 여유로운 차 생활을 즐기세요.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandComponent;