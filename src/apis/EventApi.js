import axios from "axios";
import {API_SERVER_HOST} from "./host";

const ACCESS_TOKEN = localStorage.getItem("accessToken");
console.log("토큰 확인:", ACCESS_TOKEN); // named export로 변경

const prefix = `${API_SERVER_HOST}/api/events`;

// 이벤트 목록 출력
export const getList = async (pageParam) => {

    const res = await axios.get(`${prefix}/list`, {
        pageParam
    });
    return res.data;
}