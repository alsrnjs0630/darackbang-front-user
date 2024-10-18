import axios from "axios";
import {API_SERVER_HOST} from "./host";
const ACCESS_TOKEN = localStorage.getItem("accessToken");
const prefix = `${API_SERVER_HOST}/api/payments`;

export const verifyPayment = async (impUid) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // Token validation
        }
    };

    try {
        console.log('Payment verification request for imp_uid:', impUid); // Check the payment UID log
        // Send a POST request to verify the payment with the imp_uid
        const res = await axios.post(`${prefix}/verifyIamport/${impUid}`,{}, header);

        // Check if the imp_uid matches the server response
        if (res.data.response.status === "paid") {
            return res.data;
        } else {
            alert('Payment amount mismatch. Payment failed.');
            throw new Error('Payment amount mismatch.');
        }
    } catch (error) {
        alert('Payment verification failed');
        throw error; // 필요에 따라 상위로 재던짐
    }
};