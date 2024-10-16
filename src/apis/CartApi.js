import axios from "axios";
import {API_SERVER_HOST} from "./host";  // 토큰 값을 출력해서 유효한지 확인

const ACCESS_TOKEN = localStorage.getItem("accessToken");
console.log("토큰 확인:", ACCESS_TOKEN); // named export로 변경

const prefix = `${API_SERVER_HOST}/api/carts`;

// 장바구니에 상품 추가하기
export const addToCart = async (cartItem) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // 이 토큰이 올바른지 확인
        }
    };

    console.log('장바구니 추가 요청:', cartItem); // cartItem 로그 확인

    try {
        const res = await axios.post(`${prefix}/add`, cartItem, header);
        console.log('장바구니 아이템 추가됨:', res.data);
        return res.data; // 서버에서 반환된 데이터
    } catch (error) {
        console.error("장바구니 아이템 추가 실패:", error.response ? error.response.data : error);
        throw error; // 오류를 다시 던져서 상위에서 처리
    }
};

// 장바구니 아이템 리스트 가져오기
export const getCartList = async () => {
    const header = {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`  // 이 토큰이 올바른지 확인
        }
    };
    try {
        const res = await axios.get(`${prefix}/list`, header);  // header가 누락되지 않게 확인
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);  // 자세한 오류 메시지 출력
        throw error;  // 오류를 다시 던져서 상위에서 처리
    }
}

// 특정 장바구니 아이템 가져오기
export const getOne = async (id) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`  // 이 토큰이 올바른지 확인
        }
    };
    try {
        const res = await axios.get(`${prefix}/cart/${id}`, header);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        throw error;
    }
};

// 특정 장바구니 아이템 삭제하기
export const deleteCartItem = async (cartItemId) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // 이 토큰이 올바른지 확인
        }
    };
    const res = await axios.delete(`${prefix}/itemdelete/${cartItemId}`, header);
    return res.data;
};