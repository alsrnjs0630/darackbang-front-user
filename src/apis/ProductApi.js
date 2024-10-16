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
        console.log("loginState {}", loginState);
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        };
        const res = await axios.get(`${prefix}/list`, {
            params: { page, size, productName, salePrice },
            ...header
        });

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
    // ACCESS_TOKEN이 유효한지 확인합니다.
    if (loginState === "회원" && ACCESS_TOKEN) {
        console.log("loginState {}", loginState);
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        };

        const res = await axios.get(`${prefix}/${id}`, header);
        console.log(res.data);
        return res.data;
    } else {
        try {
            const res = await axios.get(`${prefix}/${id}`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("상품 상세 정보 가져오기 실패:", error);
            throw error;  // 에러를 호출한 곳으로 전달
        }
    }
};