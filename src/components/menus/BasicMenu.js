import React, {useEffect, useState} from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton
} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {FaShoppingCart, FaUserCircle} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {logoutPost} from "../../apis/MemberApi";

export function StickyNavbar() {
    const loginState = useSelector(state => state.loginState)
    const dispatch = useDispatch();

    // 컴포넌트가 마운트될 때 로그인 상태 초기화
    useEffect(() => {
        const storedLoginState = localStorage.getItem('loginState'); // localStorage에서 로그인 상태 가져오기
        if (storedLoginState) {
            dispatch({ type: 'SET_LOGIN_STATE', payload: storedLoginState }); // Redux 스토어에 상태 설정
        } else {
            dispatch({ type: 'SET_LOGIN_STATE', payload: '비회원' }); // 초기 상태 설정
        }
    }, [dispatch]);

    const handleLogoutClick = () => {
        logoutPost()
            .then(status => {
                console.log(status)

                if (status === 200) {
                    alert("로그아웃 되었습니다.")
                    localStorage.removeItem('loginState'); // localStorage에서 로그인 상태 제거
                    dispatch({ type: 'SET_LOGIN_STATE', payload: '비회원' });
                } else {
                    alert("예상하지 못한 오류가 발생했습니다. 다시 시도해주세요.")
                }
            })
    }

    const navList = (
        <ul className="flex ml-10 flex-row items-center gap-6"> {/* 수평 정렬과 간격을 위한 클래스 추가 */}
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-base"
            >
                <Link to={"#"} className="flex items-center">
                    브랜드
                </Link>
            </Typography>
            <form className="max-w-7xl mx-auto">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">검색</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="상품 이름" required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-600 focus:bg-gray-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-200">검색
                    </button>
                </div>
            </form>
        </ul>
    );

    return (
        <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-y-scroll overflow-x-hidden">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex mt-4 items-center justify-start text-blue-gray-900"> {/* justify-start로 왼쪽 정렬 */}
                    <Link href="/" className="mr-4 cursor-pointer py-1.5">
                        <img
                            src='/images/darackbang_logo.png'
                            alt="다락방"
                            className="h-48 w-48"
                        />
                    </Link>
                    <div className="flex items-center gap-4">{navList}</div>
                    {/* navList를 포함하는 div */}
                    <div className="flex items-center gap-x-1 ml-auto"> {/* Login, Logout 버튼 오른쪽 정렬 */}
                        <div className="flex">
                            {loginState === "비회원" ? (
                                <>
                                    <Link to={"/login"}>
                                        <Button
                                            variant="text"
                                            size="sm"
                                            className="lg:inline-block bg-gray-200 mr-1.5"
                                        >
                                            <span className={"text-base font-bold"}>로그인</span>
                                        </Button>
                                    </Link>
                                    <Link to={"/member/join"}>
                                        <Button
                                            variant="gradient"
                                            size="sm"
                                            className="lg:inline-block"
                                        >
                                            <span className={"text-base"}>회원가입</span>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="lg:inline-block"
                                    onClick={handleLogoutClick}
                                >
                                    <span className={"text-base"}>로그아웃</span>
                                </Button>
                            )}
                        </div>
                        <IconButton>
                            <FaShoppingCart className={"size-5"}/>
                        </IconButton>
                        <IconButton>
                            <FaUserCircle className={"size-5"}/>
                        </IconButton>
                    </div>
                </div>
            </Navbar>
        </div>
    );
}

const BasicMenu = () => {
    return (
        <StickyNavbar/>
    );
}

export default BasicMenu;
