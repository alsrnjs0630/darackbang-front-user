import {
    Input,
    Checkbox,
    Button,
    Typography, Textarea,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {emailCk, joinPost} from "../apis/MemberApi";
import { useDaumPostcodePopup } from "react-daum-postcode";
import useExeptionHandler from "../hooks/useExeptionHandler";

// 회원가입 form 초기값
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

export function SimpleRegistrationForm() {
    // 회원가입 요청 데이터
    const [joinParam, setJoinParam] = useState({...initState})
    // 비밀번호 유효성 검사 메세지
    const [passwordMessage, setPasswordMessage] = useState()
    // 비밀번호 확인
    const [pwCheck, setPwCheck] = useState('')
    // 페이지 이동 함수
    const navigator = useNavigate()
    // 예외처리 핸들러
    const {exceptionHandle} = useExeptionHandler();

    // 다음 우편번호 팝업
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

    // 우편번호 검색 후 등록 메소드
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        // 도로명 주소인 경우 추가 주소를 처리
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // 주소와 우편번호 상태 업데이트
        setJoinParam((prevState) => ({
            ...prevState,
            address: fullAddress,         // 선택된 주소
            postNo: data.zonecode         // 선택된 우편번호
        }));
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    // 경로 이동
    const moveToPath = (path) => {
        navigator({pathname: path}, {replace: true})
    }

    // 우편번호 모달창 오픈 메소드
    const handleSearch = () => {
        console.log("오픈")
        open({onComplete: handleComplete});
    }

    // 회원가입 양식 입력값 업데이트
    const handleChange = (e) => {
        joinParam[e.target.name] = e.target.value
        joinParam["ageGroup"] = calcAgeGroup()
        setJoinParam({...joinParam})
    }

    // 비밀번호 확인 입력값 업데이트
    const handlePwCheckChange = (e) => {
        setPwCheck(e.target.value)

    }

    // 생년월일 유효성 검사는 나중에 추가할지 말지 결정
    // 연령대 계산 메서드
    const calcAgeGroup = (birthday = joinParam["birthDay"]) => {
        if(birthday === null){
            return 0
        } else {
            // birthDay 형식: "yyyyMMdd" (예: "19980630")
            const year = parseInt(birthday.substring(0, 4), 10); // 연도 추출
            const month = parseInt(birthday.substring(4, 6), 10) - 1; // 월 추출 (월은 0부터 시작하므로 -1)
            const day = parseInt(birthday.substring(6, 8), 10); // 일 추출

            const birthDate = new Date(year, month, day); // 생년월일을 Date 객체로 변환
            const today = new Date(); // 현재 날짜

            // 나이 계산
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            // 생일이 지나지 않았다면 나이를 1살 줄임
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            // 연령대 계산 (10단위)
            const ageGroup = Math.floor(age / 10) * 10;

            return ageGroup
        }
    }

    // 회원가입 메소드
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
            .catch(error => {
                exceptionHandle(error)
            })
    }

    // 이메일 중복확인 및 정규식 검사
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

    // 비밀번호 정규식 검사
    const handlePasswordCheck = () => {
        const regPassword =  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        if(!joinParam.password){
            setPasswordMessage("비밀번호를 입력해주세요.")
        } else {
            if(!regPassword.test(joinParam.password)) {
                setPasswordMessage("비밀번호는 영문 8자 이상 숫자 1개 이상 + 특수문자 1개 이상으로 조합해주세요")
            } else {
                setPasswordMessage("사용 가능한 비밀번호입니다.")
            }
        }
    }

    // 이용약관
    const termsText = `
        개인정보 수집 동의(다락방) 
        - - 수집하는 개인정보의 항목 : 이메일, 패스워드, 이름, 성별, 생년월일, 휴대전화번호, 구매거래내역, 적립금 내역
        - 수집 및 이용 목적 : 서비스 이용에 따른 본인 식별/ 가입연령 확인/ 불량 회원의 부정이용 방지/ 공지사항 전달/ 본인 의사 확인 등을 위한 의사소통 경로 확보
        - 보유 및 이용 기간 : 동의철회 시 혹은 회원 탈퇴 시까지
        * 고객님께서는 개인정보 수집 및 이용 동의에 거부할 수 있습니다. 다만, 거부하는 경우, 회원가입이 불가합니다.

        다락방(茶樂房) 서비스 이용약관
        제1조 (목적)
        이 약관은 다락방(茶樂房) 웹사이트(이하 "사이트")에서 제공하는 차(tea) 구독 서비스(이하 "서비스")의 이용 조건 및 절차에 관한 사항을 규정하는 것을 목적으로 합니다.
        제2조 (정의)
        1."다락방"이란 차 구독 서비스를 제공하는 웹사이트 및 이를 운영하는 사업체를 의미합니다.
        2."회원"이란 사이트에 가입하여 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
        3."구독"이란 사용자가 상품을 구매함으로써 자동으로 월 단위로 제공되는 차 서비스에 등록되는 것을 의미합니다.
        4."상품"이란 사이트에서 제공하는 차 및 관련 제품을 의미합니다.
        제3조 (약관의 효력 및 변경)
        1.본 약관은 회원이 사이트에 가입하여 본 약관에 동의한 시점부터 효력을 발생합니다.
        2.다락방은 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 사이트에 게시하여 공지합니다. 변경된 약관은 공지된 시점부터 효력을 발생합니다.
        제4조 (서비스의 제공)
        1.구독 시작일은 사용자가 상품을 구매한 결제일로 지정됩니다.
        2.배송 시작일은 결제일 다음 날부터 시작됩니다.
        3.서비스는 매월 구독 요금이 자동으로 결제되는 방식으로 운영됩니다.
        제5조 (구독 요금 및 결제)
        1.구독 요금은 상품 구매 시 명시된 금액을 기준으로 하며, 매월 자동으로 결제됩니다.
        2.결제 방법은 신용카드와 체크카드만 가능합니다.
        3.결제일은 변경 불가능하며, 결제는 매월 구독 갱신일에 자동으로 이루어집니다.
        제6조 (구독 취소 및 환불)
        1.사용자는 언제든지 구독을 취소할 수 있으며, 취소는 사이트 내에서 직접 진행할 수 있습니다.
        2.이미 결제된 상품에 대해서는 마지막으로 결제된 상품까지는 배송이 이루어진 후에 구독이 취소됩니다.
        3.서비스는 환불이 불가능하며, 배송된 상품에 대해서는 환불이 절대 불가능합니다.
        4.상품 배송 후에는 반품 및 환불이 불가능합니다. 제품의 하자나 오배송의 경우에도 환불은 불가능하며, 교환만 가능합니다.
        제7조 (회원 탈퇴)
        1.회원 탈퇴를 원하는 경우, 사이트에서 탈퇴 신청을 진행할 수 있습니다.
        2.탈퇴 신청 시 이미 결제된 상품에 대해서는 배송 전에는 탈퇴 신청 상태로 전환되며, 배송이 완료된 후에 구독이 취소되고 회원 탈퇴 처리가 이루어집니다.
        제8조 (회원의 의무)
        1.회원은 자신의 개인정보를 정확히 제공해야 하며, 이를 최신 상태로 유지해야 합니다.
        2.회원은 비밀번호의 관리와 사용에 대해 책임을 지며, 비밀번호 유출로 인한 모든 책임은 회원에게 있습니다.
        제9조 (서비스의 중단)
        1.다락방은 시스템 정비, 서비스 개선 등의 이유로 서비스 제공을 일시적으로 중단할 수 있습니다.
        2.서비스 중단에 대한 공지는 사이트에 게시되며, 회원은 이를 확인해야 합니다.
        제10조 (개인정보 보호)
        1.다락방은 회원의 개인정보를 보호하며, 개인정보처리방침에 따라 취급합니다.
        2.회원의 개인정보는 서비스 제공 및 관련된 용도로만 사용되며, 제3자에게 제공되지 않습니다.
        제11조 (책임의 한계)
        1.다락방은 서비스 이용과 관련하여 발생할 수 있는 손해에 대해 책임지지 않습니다.
        2.다락방의 귀책 사유로 인한 손해에 대해서만 법적 책임을 집니다.
        제12조 (준거법 및 분쟁 해결)
        1.본 약관의 해석 및 적용에 있어 대한민국 법을 따릅니다.
        2.서비스 이용과 관련하여 분쟁이 발생할 경우, 서울중앙지방법원을 제1심 법원으로 합니다.
    `;

    return (
        <div className="mx-auto w-full h-screen max-w-3xl p-8 border-2 border-gray-400 rounded-2xl shadow-lg">
            <Typography variant="h5" color="blue-gray" className="text-center mb-6 font-bold">
                다락방 회원가입
            </Typography>

            <div className="grid grid-cols-1 gap-4">
                {/* 이메일 */}
                <div className="grid grid-cols-[80px_auto] gap-4">
                    <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                        이메일 <span className="text-red-500">*</span>
                    </Typography>
                    <div className="grid grid-cols-[250px_auto] gap-2">
                        <Input
                            size="md"
                            name="userEmail"
                            placeholder="아이디 입력"
                            value={joinParam.userEmail}
                            className="w-[250px] !border-gray-300 focus:!border-gray-900"
                            onChange={handleChange}
                        />
                        <Button className="ml-2 w-24 h-10 text-xs" onClick={handleEmailCheck}>
                            중복확인
                        </Button>
                    </div>
                </div>

                {/* 비밀번호 */}
                <div className="grid grid-cols-[80px_250px_auto] gap-4">
                    <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                        비밀번호 <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                        type="password"
                        name="password"
                        size="md"
                        value={joinParam.password}
                        placeholder="비밀번호 입력"
                        onChange={handleChange}
                        onBlur={handlePasswordCheck}
                        className="w-[250px] !border-gray-300 focus:!border-gray-900"
                    />
                    {passwordMessage && (
                        <Typography
                            variant="small"
                            color={passwordMessage.includes("사용 가능한") ? "green" : "red"} // 성공 메시지는 초록색, 실패 메시지는 빨간색
                        >
                            {passwordMessage}
                        </Typography>
                    )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="grid grid-cols-[80px_250px_auto] gap-4">
                    <Typography variant="small" color="blue-gray" className="text-left pr-4">
                        비밀번호 확인 <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                        type="password"
                        size="md"
                        placeholder="비밀번호 확인 입력"
                        onChange={handlePwCheckChange}
                        className="w-full !border-gray-300 focus:!border-gray-900"
                    />
                    {pwCheck && joinParam.password && (
                        joinParam.password === pwCheck
                            ? <Typography variant={"small"} color={"green"}>
                                비밀번호가 일치합니다.
                            </Typography>
                            : <Typography variant={"small"} color={"red"}>
                                비밀번호가 일치하지 않습니다.
                            </Typography>
                    )}
                </div>

                {/* 이름과 성별 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-[80px_250px] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                            이름 <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            size="md"
                            placeholder="이름 입력"
                            name="name"
                            onChange={handleChange}
                            className="w-full !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-[80px_auto] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                            성별
                        </Typography>
                        <select
                            name="gender"
                            onChange={handleChange}
                            value={joinParam.gender}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                        >
                            <option value="M">남자</option>
                            <option value="F">여자</option>
                        </select>
                    </div>
                </div>

                {/* 생년월일과 연령대 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-[80px_250px] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                            생년월일 <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            size="md"
                            placeholder="ex) 19980630"
                            onChange={handleChange}
                            name="birthDay"
                            className="w-full !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-[80px_auto] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                            연령대
                        </Typography>
                        <Input
                            size="md"
                            placeholder="20"
                            onChange={handleChange}
                            name="ageGroup"
                            value={joinParam.ageGroup}
                            className="w-full !border-gray-300 focus:!border-gray-900"
                            disabled={true}
                        />
                    </div>
                </div>

                {/* 휴대폰 번호와 전화번호 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-[80px_250px] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left pr-4">
                            휴대폰 <br/>번호 <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            size="md"
                            placeholder="'-'를 제외하고 입력"
                            name="mobileNo"
                            onChange={handleChange}
                            className="w-full !border-gray-300 focus:!border-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-[80px_auto] gap-4">
                        <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                            전화번호
                        </Typography>
                        <Input
                            size="md"
                            placeholder="'-'를 제외하고 입력"
                            name="phoneNo"
                            onChange={handleChange}
                            className="w-full !border-gray-300 focus:!border-gray-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-[80px_150px] gap-4">
                    <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                        우편번호 <span className="text-red-500">*</span>
                    </Typography>
                    <div className="grid grid-cols-[150px_auto] gap-12">
                        <Input
                            size="md"
                            name="postNo"
                            placeholder="우편번호"
                            value={joinParam.postNo}
                            className="postcodeInput !border-gray-300 focus:!border-gray-900"
                            onChange={handleChange}
                        />
                        <Button className="ml-2 w-20 h-10 text-xs" onClick={handleSearch}>
                            검색
                        </Button>
                    </div>
                </div>

                {/* 도로명주소 */}
                <div className="grid grid-cols-[80px_auto] gap-4">
                    <Typography variant="small" color="blue-gray" className="text-left mt-2 pr-4">
                        주소<span className="text-red-500">*</span>
                    </Typography>
                    <Input
                        size="md"
                        placeholder="도로명주소 입력"
                        name="address"
                        value={joinParam.address}
                        onChange={handleChange}
                        className="w-full !border-gray-300 focus:!border-gray-900"
                    />
                </div>
            </div>

            {/* 이용약관 동의 */}
            <div className="mt-4 justify-center">
                <Textarea
                    className="h-[250px] !border-gray-300 focus:!border-gray-900" // 높이를 300px로 조정
                    value={termsText.replace(/\n/g, '\n')}
                    readOnly
                />
                <Checkbox
                    className={"mx-auto"}
                    label={
                        <Typography variant="small" color="gray" className="items-center font-normal ">
                            <span className="text-red-500">*</span>이용약관에 동의합니다.
                        </Typography>
                    }
                    containerProps={{className: "-ml-2.5"}}
                />
            </div>

            {/* 가입 버튼 */}
            <Button onClick={handleClickJoin}
                    className="mt-4 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-sm">
                회원가입
            </Button>
        </div>
    );
}

const JoinPage = () => {
    return (
        <SimpleRegistrationForm/>
    )
}

export default JoinPage;