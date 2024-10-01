import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {loginPost} from "../apis/MemberApi";

const initState = {
    userEmail: '',
    password: ''
}

const LoginPage = ({loginState,setLoginState}) => {
    const [loginParam, setLoginParam] = useState({...initState})
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...loginParam})
    }

    const handleClickLogin = () => {
        loginPost(loginParam)
            .then(data => {
                console.log(data)

                if(data.error) {
                    alert("이메일과 패스워드를 다시 확인하세요")
                } else{
                    alert("로그인 성공!")
                    localStorage.setItem('loginState', "회원"); // 로그인 상태를 localStorage에 저장
                    dispatch({ type: 'SET_LOGIN_STATE', payload: '회원' });
                    moveToPath("/")
                }
            })
    }

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace:true})
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/" className="mr-4 cursor-pointer py-1.5">
                    <img
                        src='/images/darackbang_logo.png'
                        alt="다락방"
                        className="h-60 w-60 mx-auto"
                    />
                </Link>
            </div>
            <div
                className="w-full rounded-lg shadow-lg dark:border-gray-900 mx-auto sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900 p-8">
                <h2 className="mb-5 mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로 그
                    인</h2>

                {/* 이메일 입력 필드 */}
                <div className="mb-6 px-6 py-4"> {/* 패딩을 추가했습니다. */}
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">이메일</label>
                    <div className="mt-2">
                        <input id="email" name="userEmail" type="text" value={loginParam.userEmail} required
                               onChange={handleChange}
                               className="block w-full rounded-md border-0 py-1.5 pl-3 pr-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="mb-6 px-6 py-4"> {/* 패딩을 추가했습니다. */}
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">비밀번호를 잊으셨나요?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" value={loginParam.password}
                               autoComplete="current-password"
                               required onChange={handleChange}
                               className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <div className="px-6 py-4"> {/* 패딩을 추가했습니다. */}
                    <button type="submit"
                            onClick={handleClickLogin}
                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        로그인
                    </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500 pb-5">
                    아직 회원이 아니신가요?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">회원가입 하러가기</a>
                </p>
            </div>


        </div>
    )
}

export default LoginPage;