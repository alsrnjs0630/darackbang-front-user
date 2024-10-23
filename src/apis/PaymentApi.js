import axios from "axios";
import {API_SERVER_HOST} from "./host";
const ACCESS_TOKEN = localStorage.getItem("accessToken");
const prefix = `${API_SERVER_HOST}/api/payments`;

export const verifyPayment = async (impUid, cartItemIds) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // Token validation
        }
    };

    console.log("요청 정보: ",impUid, cartItemIds, ACCESS_TOKEN)
    try {
        console.log('Payment verification request for imp_uid:', impUid); // Check the payment UID log
        // Send a POST request to verify the payment with the imp_uid
        const res = await axios.post(`${prefix}/verifyIamport/${impUid}`,cartItemIds, header);
        console.log("결과: ", res)
        // Check if the imp_uid matches the server response
       return res.data
    } catch (error) {
        alert('Payment verification failed');
        console.log("에러: ", error)
        throw error; // 필요에 따라 상위로 재던짐
    }
};

export const buynowPayment = async (impUid, productId, quantity) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // Token validation
        }
    };

    console.log("요청 정보: ",impUid, productId, quantity, ACCESS_TOKEN)
    try {
        console.log('Payment verification request for imp_uid:', impUid); // Check the payment UID log

        // Send a POST request to verify the payment with the imp_uid
        const res = await axios.post(`${prefix}/buynow/${impUid}/${productId}/${quantity}`, {}, header);
        console.log("결과: ", res)
        // Check if the imp_uid matches the server response
        return res.data
    } catch (error) {
        alert('Payment verification failed');
        console.log("에러: ", error)
        throw error; // 필요에 따라 상위로 재던짐
    }
};