import axios from "axios";
import {API_SERVER_HOST} from "./host";

const ACCESS_TOKEN = localStorage.getItem("accessToken");
const loginState = localStorage.getItem("loginState")
const prefix = `${API_SERVER_HOST}/api/products`;

// 상품 리스트 가져오기
export const getList = async (pageParam) => {
    const { page, size, productName, salePrice } = pageParam;

    // 회원일 때 Authorization 헤더 추가
    if (loginState === "회원") {
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        };
        const res = await axios.get(`${prefix}/list`, {
            params: { page, size, productName, salePrice }
        }, header);
        return res.data;
    } else {
        // 비회원일 때 헤더 없이 요청
        const res = await axios.get(`${prefix}/list`, {
            params: { page, size, productName, salePrice }
        });
        return res.data;
    }
};

// 상품 상세 정보 가져오기
export const getOne = async (id) => {
    const header = {};

    // 로그인 상태에 따라 Authorization 헤더 추가
    if (loginState === "회원") {
        if (!ACCESS_TOKEN || typeof ACCESS_TOKEN !== "string") {
            console.error("유효하지 않은 액세스 토큰입니다.");
            // 필요한 경우 여기서 에러 처리 추가
            return;
        }
        header.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        };
    }

    try {
        const res = await axios.get(`${prefix}/${id}`, header);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("상품 상세 정보 가져오기 실패:", error);
        throw error;  // 에러를 호출한 곳으로 전달
    }
};