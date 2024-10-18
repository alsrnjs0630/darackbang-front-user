import {useNavigate} from "react-router-dom";

const useExeptionHandler = () => {
    const navigate = useNavigate();


    const exceptionHandle = (exeption) => {
        console.log("현재 발생 에러: ", exeption)

        if(exeption.code() === 'ERR_NETWORK') {
            alert("서버와의 연결이 불안정합니다. 인터넷 연결을 확인해주세요.")
            localStorage.setItem("loginState", "비회원")
            localStorage.removeItem("accessToken")
            navigate({pathname : "/"})
        } else {
            console.log("에러 상세 내용:", exeption.error.data.error)

            const errorMsg = exeption.response.data.error

            if(errorMsg === "ERROR_LOGIN") {
                alert("로그인에 실패했습니다.")
            }

            if(errorMsg === "ERROR_ACCESSDENIED") {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.")
                localStorage.setItem("loginState", "비회원")
                localStorage.removeItem("accessToken")
                navigate({pathname:"/login"})
            }
        }
    }
    return {exceptionHandle}
}

export default useExeptionHandler;