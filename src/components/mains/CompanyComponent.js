import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const CompanyComponent = () => {
    const location = useLocation();

    const sectionTitleClass = "text-lg font-bold";
    const sectionContentClass = "text-base pt-3";

    useEffect(() => {
        window.scrollTo(0, 0);  // 페이지가 로드될 때 맨 위로 스크롤
    }, [location.key]);         // key가 바뀔 때마다 실행

    return (
        <div className="w-[1000px]">
            <h5 className="mb-10 font-bold text-indigo-600">다락방(茶樂房) 회사정보</h5>
            <div className="text-gray-800">
                <div className={sectionContentClass}>
                    •&nbsp;&nbsp;상호명: (주)다락방<br/>
                    •&nbsp;&nbsp;대표자명: 황재인<br/>
                    •&nbsp;&nbsp;사업장 주소: 서울 금천구 가산디지털2로 101 B동 309호<br/>
                    •&nbsp;&nbsp;대표전화: 1588-1234<br/>
                    •&nbsp;&nbsp;이메일: support@darackbang.com<br/>
                    •&nbsp;&nbsp;사업자 등록번호: 123-45-67890<br/><br/>
                </div>
                <div>
                    <img
                        src='/images/darackbang_company.png'
                        alt="다락방 회사정보이미지"
                        className="rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanyComponent;