import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const EventComponent = () => {
    const location = useLocation();

    const sectionTitleClass = "text-lg font-bold";
    const sectionContentClass = "text-base pl-4 pt-3";

    useEffect(() => {
        window.scrollTo(0, 0);  // 페이지가 로드될 때 맨 위로 스크롤
    }, [location.key]);         // key가 바뀔 때마다 실행

    return (
        <div className="w-[1000px]">
            <h5 className="mb-10 font-bold text-indigo-600">이벤트!</h5>
        </div>
    );
};

export default EventComponent;