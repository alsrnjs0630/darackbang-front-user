import axios from "axios";
import {API_SERVER_HOST} from "./host";

const ACCESS_TOKEN = localStorage.getItem("accessToken");
console.log("토큰 확인:", ACCESS_TOKEN); // named export로 변경

const prefix = `${API_SERVER_HOST}/api/events`;

// 이벤트 목록 출력
export const getList = async (pageParam) => {
    const {page, size, title, eventState} = pageParam

    try {
        const res = await axios.get(`${prefix}/list`, {
            params: {
                page: page,
                size: size,
                title: title,
                eventState: eventState
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 이벤트 상세 정보 출력
export const getOne = async (id) => {
    try {
        const res = await axios.get(`${prefix}/read/${id}`)

        return res.data
    } catch (error) {
        throw error;
    }
}

// 이벤트 파일명 리스트 가져오기
export const getFileNameList = async () => {
    try{
        const res = await axios.get(`${prefix}/filelist`)
        console.log("파일 데이터 리스트 : ", res.data)

        return res.data;
    } catch (error) {
        throw error;
    }
}