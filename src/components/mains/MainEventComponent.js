import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Carousel} from "@material-tailwind/react";
import {getFileNameList} from "../../apis/EventApi";
import {API_SERVER_HOST} from "../../apis/host";

const MainEventComponent = () => {
    const location = useLocation();
    const [fileList, setFileList] = useState({
        fileName: ""
    })

    useEffect(() => {
        window.scrollTo(0, 0);  // 페이지가 로드될 때 맨 위로 스크롤

        getFileNameList().then(data => {
            setFileList(data)
            console.log("data")
        })

    }, [location.key]);         // key가 바뀔 때마다 실행

    return (
        <div className={"w-[1000px] h-[400px] mb-[60px]"}>
            <Carousel
                className="rounded-xl"
                autoplay
                autoplayDelay={3000}
                loop
                navigation={({setActiveIndex, activeIndex, length}) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {fileList.length > 0 ? (
                    // 파일 이름 리스트를 이용해 이미지 렌더링
                    fileList.map((fileName, index) => (
                        <img
                            key={index}
                            src={`${API_SERVER_HOST}/api/events/view/${fileName || "default.png"}`}
                            alt={`image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    ))
                ) : (
                    // 파일 리스트가 없을 경우 기본 이미지 3장을 배열로 Carousel 구성
                    ['/images/darackbang_event1.jpg', '/images/darackbang_event2.jpg', '/images/darackbang_event3.jpg'].map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`default image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    ))
                )}
            </Carousel>
        </div>
    );
};

export default MainEventComponent;