import {
    Typography,
    Checkbox, Input, Button,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {logoutPost, mypageInfo} from "../../apis/MemberApi";
import {useNavigate} from "react-router-dom";

const PaymentComponent = () => {
    // 배송지 직접 입력 사용 시 우편번호, 주소 초기 상태
    const addrInitState = {
        postNo: "",
        address: ""
    }

    // 사용 마일리지
    const handleMileage = {
        handleMile: ""
    }

    // 결제 페이지 진입시 회원 정보 갖고 옴 (회원정보 출력, 회원정보 수정 API 사용)
    // 기본배송지 정보, (직접 입력 사용 시 추가 배송지 추가), 마일리지 사용 시 현재 마일리지 - 사용 마일리지 계산 후 저장
    const userInitState = {
        userEmail: '',
        name: '',
        gender: '',
        ageGroup: '',
        birthday: '',
        mobileNo: '',
        phoneNo: '',
        postNo: '',
        address: '',
        shipPostNo: '',
        shippingAddr: '',
        addPostNo: '',
        addShippingAddr: '',
        mileage: '',
        memberState: '',
    }

    // 다음 우편번호 팝업
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

    // 페이지 전환 메소드
    const navigate = useNavigate()

    // 체크박스 상태
    const [checkedValue, setCheckedValue] = useState("custom");
    // 결제 수단 선택 상태
    const [payment, setPayment] = useState(null)
    // 배송지 직접입력 시 주소 값
    const [customAdderess, setCustomAddress] = useState({...addrInitState});
    // 사용자 정보. 기본 배송지 및 보유 적립금에 사용
    // 현재는 기본 배송지 -> 기본 주소 정보 사용. 추후에 기본 배송지 유무 판별 기능 구현
    const [userInfo, setUserInfo] = useState({...userInitState})

    // 컴포넌트 렌더링 시 로그인한 유저 정보 불러옴 -> 마일리지 적용, 기본 배송지 출력
    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const myInfo = await mypageInfo()
                if (myInfo == null) {
                    alert("잘못된 사용자 정보입니다.")
                    navigate("/")
                } else {
                    setUserInfo(myInfo)
                    console.log(myInfo)
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("세션이 만료되었습니다. 다시 로그인 해주세요")
                        logoutPost()
                        localStorage.removeItem('loginState'); // localStorage에서 로그인 상태 제거
                        localStorage.removeItem('accessToken'); // localStorage에서 액세스 토큰 제거
                        navigate("/login")
                        window.location.reload()
                    } else {
                        console.log("error : ", error.response)
                        alert("잘못된 사용자 정보입니다.")
                        navigate("/")
                    }
                }
            }
        }
        fetchMyInfo();
    }, []);

    // 우편번호 API
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
        setCustomAddress((prevState) => ({
            ...prevState,
            address: fullAddress,         // 선택된 주소
            postNo: data.zonecode         // 선택된 우편번호
        }));
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    // 우편번호 API 오픈 메소드
    const handleSearch = () => {
        console.log("오픈")
        open({onComplete: handleComplete});
    }

    // 배송지 입력 체크박스 (기본 배송지 사용, 직접 입력)
    const handleCheckboxChange = (value) => {
        setCheckedValue(value === checkedValue ? null : value); // 동일한 값 클릭 시 선택 해제
    }

    // 결제수단 (카카오페이, 토스페이)
    const handlePayment = (value) => {
        setPayment(value === payment ? null : value);
    }

    // 주문하기 버튼 클릭 시 실행되는 함수 (추후에 배송지 입력 유무 확인 및 유의사항 동의 체크 확인 기능 구현)
    const handlePaymentModal = (payment) => {
        if(payment === null) {
            alert("결제 수단을 선택해주세요.")
            return;
        } else if(payment === "kakao"){
            alert("카카오페이 결제입니다.")
            return;
        } else if(payment === "toss") {
            alert("토스페이 결제입니다.")
            return;
        }
    }

    return (
        <div>
            <div className="w-[1200px] overflow-x-auto">
                <Typography className={"font-bold text-4xl ml-4 mb-2"}>
                    결제 정보
                </Typography>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-2xl text-center rounded-s-lg">
                            상품 정보
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            수량
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            금액
                        </th>
                        <th scope="col" className="pr-6 py-3 text-2xl text-right rounded-e-lg">
                            총 금액
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="py-4 text-right">
                            $2999
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Microsoft Surface Pro
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="y-4 text-right">
                            $1999
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Magic Mouse 2
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="py-4 text-right">
                            $99
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr className="font-semibold text-gray-900">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="py-3 text-right">3</td>
                        <td className="py-3 text-right">21,000</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <br/>
            <hr/>
            <div className={"mt-5 ml-5 grid grid-cols-[2fr_1fr] gap-4"}>
                <div>
                    <div className={"mt-5 flex flex-row"}>
                        <Typography variant="h4" color="blue-gray" className="pr-4">
                            배송지 입력
                        </Typography>
                        <div className="flex items-center">
                            <Checkbox
                                id={"default"}
                                name={"address"}
                                checked={checkedValue === "default"}
                                onChange={() => handleCheckboxChange("default")}/>
                            <label htmlFor={"default"} className="text-base text-blue-500 font-bold">기본 배송지 사용</label>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                id={"custom"}
                                name={"address"}
                                checked={checkedValue === "custom"}
                                onChange={() => handleCheckboxChange("custom")}/>
                            <label htmlFor={"custom"} className="text-base text-pink-500 font-bold">직접 입력</label>
                        </div>
                    </div>
                    <div>
                        <div className={"w-full mt-2 grid grid-cols-2"}>
                            <div className={"w-52"}>
                                <Input
                                    size={"lg"}
                                    className={"w-52"}
                                    labelProps={{
                                        className: "w-52",
                                    }}
                                    value={checkedValue === "default" ? userInfo.name : ""}
                                    label={"받는분"}/>
                            </div>
                            <div className={"w-72 ml-[-170px]"}>
                                <Input
                                    size={"lg"}
                                    className={"w-72"}
                                    label={"휴대폰번호"}
                                    value={checkedValue === "default" ? userInfo.mobileNo : ""}
                                    placeholder={"\"-\"없이 숫자만 입력해주세요"}/>
                            </div>
                        </div>
                        <div className={"w-1/2 mt-3"}>
                            <div className={"w-full grid grid-cols-2"}>
                                <div className={"w-36"}>
                                    <Input
                                        size={"lg"}
                                        className={"w-36"}
                                        label={"우편번호"}
                                        value={checkedValue === "default" ? userInfo.postNo : customAdderess.postNo}
                                        labelProps={{
                                            className: "w-36",
                                        }}
                                        readOnly={true}/>
                                </div>
                                <div className={"w-2/3"}>
                                    {checkedValue === "default" ? <></>
                                        : <Button
                                            className={"w-20 mt-1 ml-[-40px]"}
                                            onClick={handleSearch}>
                                            검색
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div className={"mt-3 w-[507px]"}>
                                <Input
                                    size={"lg"}
                                    className={"w-full"}
                                    value={checkedValue === "default" ? userInfo.address : customAdderess.address}
                                    label={"상세주소"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Typography variant="h4" color="blue-gray" className="mt-5">
                        결제 수단
                    </Typography>
                    <div className={"mt-5 flex flex-col"}>
                        <Button
                            className={"text-blue-gray-900"}
                            variant={payment === "kakao" ? "filled" : "outlined"}
                            color={"yellow"}
                            onClick={() => handlePayment("kakao")}
                        >
                            카카오페이
                        </Button>
                        <Button
                            className={"mt-5"}
                            variant={payment === "toss" ? "filled" : "outlined"}
                            color={"blue"}
                            onClick={() => handlePayment("toss")}
                        >
                            토스페이
                        </Button>
                    </div>
                </div>
            </div>
            <br/>
            <hr/>
            <div>
                <div className={"mt-10 grid grid-cols-4 gap-4"}>
                    <Typography variant="small" color="blue-gray" className="text-center mt-4 pr-4">
                        보유 적립금
                    </Typography>
                    <Input
                        size={"lg"}
                        value={userInfo.mileage}
                        className="!border-gray-300 focus:!border-gray-900"
                        labelProps={{
                            className: "hidden",
                        }}
                        readOnly={true}/>
                    <Typography variant="small" color="blue-gray" className="text-center mt-4 pr-4">
                        사용 할 적립금
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="1000원 이상부터 사용가능"
                        labelProps={{
                            className: "hidden",
                        }}
                        className="w-full !border-gray-300 focus:!border-gray-900"/>
                </div>
            </div>
            <div className={"rounded-2xl shadow-md shadow-gray-200 pt-2 pb-5 mt-10"}>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            주문 금액
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            배송비
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            적립금
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            결제 금액
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                        <th className="px-3 py-3 text-2xl text-center">
                            주문 금액
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            +
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            배송비
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            -
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            적립금
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            =
                        </td>
                        <th className="px-3 py-3 text-2xl text-center ">
                            결제 금액
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Button
                className={"w-full mt-10"}
                color={"green"}
                onClick={() => handlePaymentModal(payment)}
            >
                <span className={"text-2xl"}>주문하기</span>
            </Button>
        </div>
    )
}
export default PaymentComponent;