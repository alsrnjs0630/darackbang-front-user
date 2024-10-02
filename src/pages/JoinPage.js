import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {emailCk, joinPost, loginPost} from "../apis/MemberApi";

const initState = {
    userEmail: '',
    password: '',
    name: '',
    gender: 'M',
    birthDay: '',
    ageGroup: '',
    mobileNo: '',
    phoneNo: '',
    postNo: '',
    address: ''
}

const emailCheckInitState = {
    userEmail: ''
}

export function SimpleRegistrationForm() {
    const [joinParam, setJoinParam] = useState({...initState})
    const [emailCkParam, setEmailCkParam] = useState({...emailCheckInitState})
    const navigator = useNavigate()

    const moveToPath = (path) => {
        navigator({pathname: path}, {replace: true})
    }

    const handleChange = (e) => {
        joinParam[e.target.name] = e.target.value
        setJoinParam({...joinParam})
    }

    const handleClickJoin = () => {
        joinPost(joinParam)
            .then(data => {
                console.log(data)

                if (data.RESULT === "SUCCESS") {
                    alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
                    moveToPath("/login");
                } else {
                    alert("입력하신 내용을 다시 한 번 확인해주세요.");
                }
            })
    }

    const handleEmailCheck = () => {
        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!joinParam.userEmail) {
            // 이메일이 null이거나 빈 문자열일 경우 경고
            alert("사용하실 이메일을 입력해주세요");
        } else {
            if (!regEmail.test(joinParam.userEmail)) {
                // 이메일 형식이 맞지 않을 경우 경고
                alert("이메일 형식에 맞게 정확히 입력해주세요. (예)darackbang@test.com");
            } else {
                // 이메일 형식이 맞으면 바로 이메일 체크 요청
                emailCk({ userEmail: joinParam.userEmail })
                    .then(data => {
                        console.log(data);
                        console.log(joinParam.userEmail);

                        if (data.RESULT === "EXIST") {
                            alert("이미 존재하는 이메일입니다.");
                        } else {
                            alert("사용가능한 이메일입니다.");
                        }
                    });
            }
        }
    };


    return (
        <Card className="mx-auto w-full max-w-lg p-8 border-2 border-gray-400 shadow-lg">
            <div className="mx-auto">
                <Typography variant="h5" color="blue-gray" className="text-center mb-4 font-bold">
                    회원가입
                </Typography>
                <form className="w-full">
                    {/* 아이디 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            이메일
                        </Typography>
                        <Input
                            size="md"
                            name={"userEmail"}
                            placeholder="아이디 입력"
                            value={joinParam.userEmail}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900"
                            onChange={handleChange} required
                        />
                        <Button className="ml-2 w-24 h-9 text-xs" onClick={handleEmailCheck}>중복확인</Button>
                    </div>

                    {/* 비밀번호 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            비밀번호
                        </Typography>
                        <Input
                            type="password"
                            name={"password"}
                            size="md"
                            value={joinParam.password}
                            placeholder="비밀번호 입력"
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900" required
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="mb-4 flex items-center">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="w-1/4 text-right pr-4"
                            style={{lineHeight: '1.2'}}
                        >
                            비밀번호 <br/> 확인
                        </Typography>
                        <Input
                            type="password"
                            size="md"
                            placeholder="비밀번호 확인 입력"
                            className="w-3/4 !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    {/* 이름 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            이름
                        </Typography>
                        <Input
                            size="md"
                            placeholder="이름 입력"
                            name={"name"}
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900" required
                        />
                    </div>

                    {/* 성별 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            성별
                        </Typography>
                        <select name={"gender"} onChange={handleChange} value={joinParam.gender}
                                className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm">
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>

                    {/* 생년월일 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            생년월일
                        </Typography>
                        <Input
                            size="md"
                            placeholder="ex) 19980630"
                            onChange={handleChange}
                            name={"birthDay"}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900" required
                        />
                    </div>

                    {/* 연령대 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            연령대
                        </Typography>
                        <Input
                            size="md"
                            placeholder="20대"
                            onChange={handleChange}
                            name={"ageGroup"}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900" required
                        />
                    </div>

                    {/* 휴대폰번호 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            휴대폰번호
                        </Typography>
                        <Input
                            size="md"
                            placeholder="'-'를 제외하고 입력"
                            name={"mobileNo"}
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900" required
                        />
                    </div>

                    {/* 전화번호 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            전화번호
                        </Typography>
                        <Input
                            size="md"
                            placeholder="'-'를 제외하고 입력"
                            name={"phoneNo"}
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    {/* 우편번호 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            우편번호
                        </Typography>
                        <div className="w-3/4 flex items-center">
                            <Input
                                size="md"
                                placeholder="우편번호 입력"
                                name={"postNo"}
                                className="w-full !border-gray-300 focus:!border-gray-900"
                                onChange={handleChange}
                            />
                            <Button className="ml-2 w-24 h-9 text-xs">검색</Button>
                        </div>
                    </div>

                    {/* 도로명주소 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            도로명주소
                        </Typography>
                        <Input
                            size="md"
                            placeholder="도로명주소 입력"
                            name={"address"}
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    {/* 상세주소 */}
                    <div className="mb-4 flex items-center">
                        <Typography variant="small" color="blue-gray" className="w-1/4 text-right pr-4">
                            상세주소
                        </Typography>
                        <Input
                            size="md"
                            placeholder="상세주소 입력"
                            onChange={handleChange}
                            className="w-3/4 !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    {/* 이용약관 동의 */}
                    <div className="mb-4 flex items-center justify-center">
                        <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    이용약관에 동의합니다.
                                </Typography>
                            }
                            containerProps={{className: "-ml-2.5"}}
                        />
                    </div>

                    {/* 가입 버튼 */}
                    <Button
                        onClick={handleClickJoin}
                        className="mt-4 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-sm">
                        회원가입
                    </Button>
                </form>
            </div>
        </Card>
    );
}

const JoinPage = () => {
    return (
        <SimpleRegistrationForm/>
    )
}

export default JoinPage;