import {useEffect, useState} from "react";
import {getOne} from "../../../apis/EventApi";
import {useParams} from "react-router-dom";
import {API_SERVER_HOST} from "../../../apis/host";
import {Chip} from "@material-tailwind/react";

const EventReadComponent = () => {
    const {id} = useParams(); // URL에서 id 가져오기
    const [files, setFiles] = useState();
    const [eventData, setEventData] = useState({
        title: "",
        contents: "",
        fileName: "",
        eventState: "",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        getOne(id).then(data => {
            console.log("이벤트 데이터: ", data)
            setEventData(data)
            const images = {
                preview: `${API_SERVER_HOST}/api/events/view/${data.fileName || "default.png"}`,
                name: data.fileName || "default.png",
                size: 50000
            }
            setFiles(images);
        })
    }, [id]);

    return (
        <div className="w-[1000px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-indigo-600 tracking-tight">
                    {eventData.title}
                </h1>
                <div className="text-sm text-gray-600">
                    <div className="flex items-center">
                        진행상태:&nbsp;
                        <Chip
                            size="sm"
                            style={{width: '63px', textAlign: 'center'}}
                            variant="ghost"
                            value={
                                eventData.eventState === "01"
                                    ? "진행준비"
                                    : eventData.eventState === "02"
                                        ? "진행중"
                                        : "마감"}
                            color={
                                eventData.eventState === "02"
                                    ? "green"
                                    : eventData.eventState === "01"
                                        ? "amber"
                                        : "red"
                            }
                        />
                    </div>
                    <div>시작일: {eventData.startDate}</div>
                    <div>종료일: {eventData.endDate}</div>
                </div>
            </div>

            <hr className="border-gray-300 mb-4" />

            <div className="relative flex flex-col mt-5 text-gray-400 text-center">
                {files && files.preview ? (
                    <div className="flex flex-col items-center overflow-hidden text-center">
                        <img
                            src={files.preview}
                            className="inset-0 object-cover"
                            alt={files.name}
                        />
                    </div>
                ) : (
                    <div className="text-gray-500">이미지가 없습니다.</div>
                )}
            </div>

            <div className="mt-5 text-base text-gray-800 whitespace-pre-wrap">
                {eventData.contents}
            </div>
        </div>
    );
}

export default EventReadComponent;