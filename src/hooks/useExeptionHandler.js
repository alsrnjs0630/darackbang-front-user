import {useNavigate} from "react-router-dom";

const useExeptionHandler = () => {
    const navigate = useNavigate();


    const exceptionHandle = (exception) => {
        console.log("현재 발생 에러: ", exception)

        if(exception.code === 'ERR_NETWORK') {
            alert("서버와의 연결이 불안정합니다. 인터넷 연결을 확인해주세요.")
        } else {
            console.log("에러 상세 내용:", exception.response.data.error)

            const errorMsg = exception.response.data.error
            console.log("에러 코드: ", errorMsg)

            if(errorMsg === "ERROR_LOGIN") {
                alert("로그인에 실패했습니다.")
            }

            if(errorMsg === "ERROR_ACCESSDENIED") {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.")
                localStorage.setItem("loginState", "비회원")
                localStorage.removeItem("accessToken")
                navigate({pathname:"/login"})
            }

            if(errorMsg === "ERROR_USER_NOT_FOUND") {
                alert("유저 정보가 잘못 되었습니다. 다시 로그인해주세요")
                localStorage.setItem("loginState", "비회원")
                localStorage.removeItem("accessToken")
                navigate({pathname:"/login"})
            }
        }
    }
    return {exceptionHandle}
}

export default useExeptionHandler;