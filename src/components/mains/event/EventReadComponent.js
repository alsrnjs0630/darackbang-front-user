import {useEffect, useState} from "react";
import {getOne} from "../../../apis/EventApi";
import {useParams} from "react-router-dom";
import {API_SERVER_HOST} from "../../../apis/host";

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
                size: 50000 // fileSize가 필요하다면 API에서 지원해야 함
            }
            setFiles(images);
        })
    }, [id]);

    const eventImageFileSize = (size) => {
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
    };

    return (
        <div className="max-w-6xl mx-auto p-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{eventData.title}</h1>
                <div className="text-sm text-gray-600">
                    <div>상태: {eventData.eventState}</div>
                    <div>시작일: {eventData.startDate}</div>
                    <div>종료일: {eventData.endDate}</div>
                </div>
            </div>

            <hr className="border-gray-300 mb-4" />

            <div className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer py-10 text-center">
                {files && files.preview ? (
                    <div
                        className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-default select-none"
                        style={{ paddingTop: "100%", position: "relative" }}
                    >
                        <img
                            src={files.preview}
                            className="absolute inset-0 object-cover w-full h-full"
                            alt={files.name}
                        />
                    </div>
                ) : (
                    <div className="text-gray-500">이미지가 없습니다.</div>
                )}
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">내용</h2>
                <p>{eventData.contents}</p>
            </div>
        </div>
    );
}

export default EventReadComponent;