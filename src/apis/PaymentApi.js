import axios from "axios";
import {API_SERVER_HOST} from "./host";

export const verifyPayment = async (impUid) => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");

    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}` // Token validation
        }
    };

    try {
        console.log('Payment verification request for imp_uid:', impUid); // Check the payment UID log

        // Send a POST request to verify the payment with the imp_uid
        const {data} = await axios.post(`http://localhost:8080/api/payments/verifyIamport/${impUid}`, {}, header);

        console.log('Payment verification response:', data);

        // Check if the imp_uid matches the server response
        if (impUid === data.response.imp_uid) {
            alert('Payment successful');
            return data;
        } else {
            alert('Payment amount mismatch. Payment failed.');
            throw new Error('Payment amount mismatch.');
        }
    } catch (error) {
        console.error('Payment verification failed:', error.response ? error.response.data : error);
        alert('Payment verification failed');
        throw error; // Re-throw to handle further up the chain if needed
    }
};