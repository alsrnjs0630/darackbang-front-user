import React from "react";
import {Link} from "react-router-dom";

const LoginPage = () => {
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
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로 그 인</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">이메일</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">비밀번호를 잊으셨나요?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">로그인
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    아직 회원이 아니신가요?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">회원가입 하러가기</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;