import axios from "axios";
import {API_SERVER_HOST} from "./host";

const ACCESS_TOKEN = localStorage.getItem("accessToken");
const loginState = localStorage.getItem("loginState")
const prefix = `${API_SERVER_HOST}/api/products`;
/**
 * 리스트
 * @param pageParam
 * @returns {Promise<any>}
 */
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

/**
 * 일기
 * @param pno
 * @returns {Promise<any>}
 */
export const getOne = async (id) => {
    if (loginState === "회원") {
        // 회원일 때 Authorization 헤더 추가
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
        // 비회원일 때 헤더 없이 요청
        const res = await axios.get(`${prefix}/${id}`);
        console.log(res.data);
        return res.data;
    }
};

/**
 * 일기
 * @param pno
 * @returns {Promise<any>}
 */
export const create = async (formData) => {
    const res = await axios.post(`${prefix}`,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    console.log(res.data);
    return res.data;
}