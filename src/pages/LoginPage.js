import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginPost, resetPw, search} from "../apis/MemberApi";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";

const loginInitState = {
    userEmail: '',
    password: ''
}

const searchInitState = {
    userEmail: '',
    birthday: ''
}

const resetPwInitState = {
    userEmail: '',
    password: '',
    passwordCheck: ''
}

const LoginPage = ({loginState, setLoginState}) => {
    const [loginParam, setLoginParam] = useState({...loginInitState})
    const [searchParam, setSearchParam] = useState({...searchInitState})
    const [resetPwParam, setResetPwParam] = useState({...resetPwInitState})
    const [open, setOpen] = React.useState(false);
    const [resetOpen, setResetOpen] = React.useState(false);

    // 비밀번호 찾기 모달창
    const handlesearchOpen = () => {
        setOpen((cur) => !cur);
        // 모달창 닫히면 입력값 초기화
        if (open) {
            setSearchParam({ userEmail: '', birthday: '' });
        }
    }

    // 비밀번호 재설정 모달창
    const handlePasswordResetOpen = () => {
        setResetOpen((cur) => !cur);
        // 모달창 닫히면 입력값 초기화
        if (resetOpen) {
            setResetPwParam({ password: '', passwordCheck: '' });
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...loginParam})
    }

    const handleSearchChange = (e) => {
        searchParam[e.target.name] = e.target.value
        setSearchParam({...searchParam})
    }

    const handleResetPwChange = (e) => {
        resetPwParam[e.target.name] = e.target.value
        setResetPwParam({...resetPwParam})
    }

    const handleClickLogin = () => {
        loginPost(loginParam)
            .then(data => {
                console.log(data)
                if (data.error || data.memberState !== "01") {
                    alert("이메일과 패스워드를 다시 확인하세요")
                } else {
                    alert("로그인 성공!")
                    localStorage.setItem('loginState', "회원"); // 로그인 상태를 localStorage에 저장
                    localStorage.setItem('accessToken', data.token); // 토큰을 localStorage에 저장
                    dispatch({type: 'SET_LOGIN_STATE', payload: '회원'});
                    moveToPath("/")
                    window.location.reload();
                }
            })
            .catch(error => {
                // 에러가 네트워크 문제인지, 서버의 응답 문제인지 확인
                if (error.response || error.request) {
                    // 서버로부터의 응답이 있는 경우 (4xx, 5xx 등의 HTTP 오류)
                    // 네트워크 에러가 발생한 경우
                    console.log("Server responded with an error:", error);
                    alert("로그인에 실패했습니다. 잠시후 다시 시도해주세요.");
                }
            })
    }

    // 비밀번호 찾기 1. 아이디 검색
    const handleClickSearchPw = () => {
        search(searchParam)
            .then(data => {
                console.log(data)

                if (data.RESULT === "SUCCESS") {
                    // resetPwParam의 userEmail을 searchParam.userEmail로 설정
                    setResetPwParam({
                        ...resetPwParam,
                        userEmail: searchParam.userEmail
                    });

                    handlesearchOpen()
                    handlePasswordResetOpen()
                } else if (data.RESULT === "FAIL-BIRTHDAY-UNCORRECTED") {
                    alert("생년월일을 정확하게 입력해주세요.")
                } else {
                    alert("일치하는 회원이 없습니다.")
                }
            })
    }

    // 비밀번호 찾기 2. 비밀번호 재설정
    const handleClickResetPw = () => {
        resetPw(resetPwParam)
            .then(data => {
                console.log(data)

                if(data.RESULT === "SUCCESS") {
                    alert("비밀번호 변경이 완료되었습니다!")
                    handlePasswordResetOpen() // 모달창 닫기
                } else if (data.RESULT === "FAIL") {
                    alert("비밀번호 확인과 비밀번호가 일치하지 않습니다.")
                } else {
                    alert("서버오류로 실패했습니다. 다시 시도해주세요.")
                }
            })
    }

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace: true})
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
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"
                               onClick={handlesearchOpen}>비밀번호를 잊으셨나요?</a>
                        </div>
                        {/* 비밀번호 찾기 모달창 1. 아이디 검색 */}
                        <Dialog
                            size="xs"
                            open={open}
                            handler={handlesearchOpen}
                            className="bg-transparent shadow-none"
                        >
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        비밀번호 재설정
                                    </Typography>
                                    <Typography
                                        className="mb-3 font-normal"
                                        variant="paragraph"
                                        color="gray"
                                    >
                                        회원님의 이메일과 생년월일을 입력하세요.
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        이메일
                                    </Typography>
                                    <Input label="Email" name={"userEmail"} value={searchParam.userEmail} onChange={handleSearchChange} size="lg"/>
                                    <Typography className="-mb-2" variant="h6">
                                        생년월일
                                    </Typography>
                                    <Input label="EX) 20240101" name={"birthday"} value={searchParam.birthday} onChange={handleSearchChange} size="lg"/>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button variant="gradient" onClick={handleClickSearchPw} fullWidth>
                                        아이디 검색
                                    </Button>
                                    <Typography variant="small" className="mt-4 flex justify-center">
                                        아직 회원이 아니신가요?
                                        <Link to={"/member/join"}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="ml-1 font-bold"
                                            >
                                                회원가입
                                            </Typography>
                                        </Link>
                                    </Typography>
                                </CardFooter>
                            </Card>
                        </Dialog>
                        {/* 비밀번호 찾기 모달창 2.비밀번호 재설정 */}
                        <Dialog
                            size="xs"
                            open={resetOpen}
                            handler={handlePasswordResetOpen}
                            className="bg-transparent shadow-none"
                        >
                            <Card className="mx-auto w-full max-w-[24rem]">
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        비밀번호 재설정
                                    </Typography>
                                    <Typography
                                        className="mb-3 font-normal"
                                        variant="paragraph"
                                        color="gray"
                                    >
                                        바꾸실 비밀번호를 입력하세요.
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        새 비밀번호
                                    </Typography>
                                    <Input label="password" name={"password"} value={resetPwParam.password} onChange={handleResetPwChange} size="lg"/>
                                    <Typography className="-mb-2" variant="h6">
                                        비밀번호 확인
                                    </Typography>
                                    <Input label="password" name={"passwordCheck"} value={resetPwParam.passwordCheck} onChange={handleResetPwChange} size="lg"/>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button variant="gradient" onClick={handleClickResetPw} fullWidth>
                                        비밀번호 재설정
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Dialog>
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
                    <Link to={"/member/join"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">회원가입
                        하러가기</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;