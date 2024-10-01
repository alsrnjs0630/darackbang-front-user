import axios from "axios";
import {replace, useNavigate} from "react-router-dom";
export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api`


export const loginPost = async (loginParam) => {
        const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

        const form = new FormData()
        form.append('username', loginParam.userEmail)
        form.append('password', loginParam.password)

        const res = await axios.post(`${host}/login`, form, header)

        return res.data
}

export const logoutPost = async (loginParam) => {
        const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

        const res = await axios.post(`${host}/member/logout`, header)

        return res.status
}

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
