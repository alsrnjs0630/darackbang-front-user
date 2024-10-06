import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api`
const ACCESS_TOKEN = localStorage.getItem("accessToken");
console.log("토큰: ", ACCESS_TOKEN)

// 로그인
export const loginPost = async (loginParam) => {
        const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

        const form = new FormData()
        form.append('username', loginParam.userEmail)
        form.append('password', loginParam.password)

        const res = await axios.post(`${host}/login`, form, header)

        return res.data
}

// 로그아웃
export const logoutPost = async (loginParam) => {
        const header = {
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ACCESS_TOKEN}`,
                }
        }

        const res = await axios.post(`${host}/member/logout`, header)

        return res.status
}

// 회원가입
export const joinPost = async (joinParam) => {
        const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

        const form = new FormData()
        form.append('userEmail', joinParam.userEmail)
        form.append('password', joinParam.password)
        form.append('name', joinParam.name)
        form.append('gender', joinParam.gender)
        form.append('birthday', joinParam.birthDay)
        form.append('ageGroup', joinParam.ageGroup)
        form.append('mobileNo', joinParam.mobileNo)
        form.append('phoneNo', joinParam.phoneNo)
        form.append('postNo', joinParam.postNo)
        form.append('address', joinParam.address)

        const res = await axios.post(`${host}/member/join`, form, header)

        return res.data
}

// 비밀번호 찾기
export const search = async (searchParam) => {
        const form = new FormData()
        form.append('userEmail', searchParam.userEmail)
        form.append('birthday', searchParam.birthday)

        const res = await axios.post(`${host}/member/searchpw`, form)

        return res.data
}

// 비밀번호 재설정
export const resetPw = async (resetPwParam) => {
        const form = new FormData()
        form.append('userEmail', resetPwParam.userEmail)
        form.append('password', resetPwParam.password)
        form.append('passwordCheck', resetPwParam.passwordCheck)

        const res = await axios.post(`${host}/member/resetpw`, form)

        return res.data
}

// 아이디 중복 검사
export const emailCk = async (emailCkParam) => {
        const form = new FormData()
        form.append('userEmail', emailCkParam.userEmail)

        const res = await axios.post(`${host}/member/emailcheck`, form)

        return res.data
}

// 마이페이지 회원정보 출력
export const mypageInfo = async () =>{
        const header = {
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ACCESS_TOKEN}`,
                }
        }

        const res = await axios.get(`${host}/member/info`, header)

        return res.data
}
