import {
    Typography,
    Checkbox, Input, Button,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {logoutPost, mypageInfo} from "../../apis/MemberApi";
import {useNavigate, useLocation} from "react-router-dom";
import {API_SERVER_HOST} from "../../apis/host";
import {v4 as uuidv4} from 'uuid';
import {verifyPayment} from "../../apis/PaymentApi";

const PaymentComponent = () => {
    const uniqueCustomerId = uuidv4();
    const uniqueMerchantId = uuidv4();

    useEffect(() => {
        // Dynamically load jQuery
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        };

        const loadIamportScript = async () => {
            try {
                await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
                await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js');
                window.IMP.init('imp74857035'); // Initialize Iamport
            } catch (error) {
                console.error('Error loading scripts:', error);
            }
        };

        loadIamportScript();
    }, []);

    // 배송지 직접 입력 사용 시 우편번호, 주소 초기 상태
    const addrInitState = {
        name: "",
        mobileNo: "",
        postNo: "",
        address: ""
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

    // 장바구니 데이터 수신
    const location = useLocation();
    const {checkedItems, totalPrice} = location.state || {
        checkedItems: {},
        totalPrice: ''
    }

    const shippingCost = totalPrice >= 30000 ? 0 : 3000; // 배송비 계산

    // checkedItems를 배열로 변환
    const checkedItemsArray = Object.values(checkedItems);

    // 페이지 전환 메소드
    const navigate = useNavigate()

    // 체크박스 상태
    const [checkedValue, setCheckedValue] = useState("default");
    // 결제 수단 선택 상태
    const [payment, setPayment] = useState(null)
    // 배송지 직접입력 시 주소 값
    const [customInput, setCustomInput] = useState({...addrInitState});
    // 최종 주문 배송지 -> 결제 메소드 요청 정보에 들어가는 주소값
    const [orderAddress, setOrderAddress] = useState({...addrInitState});
    // 사용자 정보. 기본 배송지 및 보유 적립금에 사용
    // 현재는 기본 배송지 -> 기본 주소 정보 사용. 추후에 기본 배송지 유무 판별 기능 구현
    const [userInfo, setUserInfo] = useState({...userInitState})

    // 사용 마일리지 상태
    const [mileage, setMileage] = useState(0);
    const [result, setResult] = useState(0);

    // 컴포넌트 렌더링 시 로그인한 유저 정보 불러옴 -> 마일리지 적용, 기본 배송지 출력
    useEffect(() => {
        // 유저 정보 가져오는 함수
        const fetchMyInfo = async () => {
            try {
                const myInfo = await mypageInfo()
                if (myInfo == null) {
                    alert("잘못된 사용자 정보입니다.")
                    navigate("/")
                } else {
                    setUserInfo(myInfo)
                    console.log(myInfo)
                    setOrderAddress({
                        name: myInfo.name,
                        mobileNo: myInfo.mobileNo,
                        postNo: myInfo.postNo,
                        address: myInfo.address,
                    });
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

    useEffect(() => {
        if (checkedValue === "default") {
            setOrderAddress((prevState) => ({
                ...prevState,
                name: userInfo.name,
                mobileNo: userInfo.mobileNo,
                postNo: userInfo.postNo,
                address: userInfo.address
            }))
        } else if (checkedValue === "custom") {
            setOrderAddress((prevState) => ({
                ...prevState,
                name: customInput.name,
                mobileNo: customInput.mobileNo,
                postNo: customInput.postNo,
                address: customInput.address
            }))
        }
    }, [checkedValue, customInput]);

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
        setCustomInput((prevState) => ({
            ...prevState,
            address: fullAddress,         // 선택된 주소
            postNo: data.zonecode         // 선택된 우편번호
        }));
        console.log("주소", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
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

    // 직접입력("custom")시 입력하는 이름, 휴대폰 번호
    const handleChangeCustom = (e, field) => {
        setCustomInput((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }))
    }

    // 결제수단 (카카오페이, 토스페이)
    const handlePayment = (value) => {
        setPayment(value === payment ? null : value);
    }

    // 마일리지 입력값 처리
    const handleMileageChange = (e) => {
        const inputValue = e.target.value; // 입력된 값

        // 입력값이 비어있으면 0으로 설정
        if (isNaN(inputValue)) {
            // 숫자가 아닌 경우 아무것도 하지 않음 (이 경우에는 setMileage를 호출하지 않음)
            return;
        } else if (inputValue > userInfo.mileage) {
            setMileage(userInfo.mileage)
            return;
        } else {
            setMileage(inputValue); // 그렇지 않으면 입력값으로 설정
        }
    };

    const handleCheckMileage = (mileage) => {
        if (mileage === "" || mileage === null) {
            setMileage(0)
        } else if (mileage > (totalPrice + shippingCost)) {
            alert("적립금은 결제 금액을 초과하여 사용할 수 없습니다."); // 알림창 띄우기
            setMileage(0)
        } else if (mileage < 1000 && mileage > 0) {
            alert("적립금은 1000원 이상부터 사용 가능합니다.")
        } else {
            setResult(Number(mileage))
        }
    }

    const handleMileageFocus = () => {
        if (mileage === 0) {
            setMileage("");
        }
    };

    const createProductIds = (items) => {
        return Object.values(items).map((product) => product.id);
    };

    const createSingleProductName = (items) => {
        const totalCount = Object.keys(items).length;
        const firstProduct = Object.values(items)[0].productName;
        return totalCount > 1 ? `${firstProduct} 외 ${totalCount - 1}건` : firstProduct;
    };

    const requestPayment = (payment) => {
        if (!window.IMP) {
            alert('Payment module not loaded');
            return;
        }
        const calculatedPrice = (totalPrice + shippingCost) - mileage;


        // Generate Product IDs and Product Names
        const cartItemIds = createProductIds(checkedItems);
        const productNames = createSingleProductName(checkedItems);

        console.log("상품명:", productNames)
        console.log("장바구니아이템ID:", cartItemIds)

        console.log("페이먼트 유저정보 이름 ", userInfo.name)
        console.log("페이먼트 유저정보 전화번호", userInfo.mobileNo)
        console.log("페이먼트 유저정보 주소", userInfo.address)
        console.log("페이먼트 유저정보 우편번호", userInfo.addPostNo)
        console.log("페이먼트 유저정보 이메일", userInfo.userEmail)

        window.IMP.request_pay(
            {
                pg: payment,
                pay_method: 'card',
                merchant_uid: uniqueMerchantId,
                name: productNames,
                amount: calculatedPrice,
                customer_uid: uniqueCustomerId,
                buyer_email: userInfo.userEmail,
                buyer_name: userInfo.name,
                buyer_tel: userInfo.mobileNo,
                buyer_addr: userInfo.address,
                buyer_postcode: userInfo.postNo,
            },

            async (rsp) => {
                console.log(rsp)
                if (rsp.success) {
                    await verifyPayment(rsp.imp_uid, cartItemIds)
                        .then(data => {
                            if ( data.RESULT === "SUCCESS") {
                                console.log(data)
                                console.log(data.response)
                                alert('결제 성공');
                                window.location.href = '/'; // 메인 페이지로 이동
                            } else {
                                alert('결제 실패: 결제 정보 확인이 필요합니다.');
                            }
                        })
                        .catch(error => {
                                console.error('Payment verification failed:', error.response);
                                alert('결제가 확인되지 않았습니다. 다시 시도해주세요.');
                            }
                        )
                    // Verify payment success based on the response

                } else {
                    alert(`Payment failed: ${rsp.error_msg}`);
                }
            }
        );
    };

    // 주문하기 버튼 클릭 시 실행되는 함수 (추후에 배송지 입력 유무 확인 및 유의사항 동의 체크 확인 기능 구현)
    const handlePaymentModal = (payment) => {
        if (payment === null) {
            console.log(orderAddress)
            alert("결제 수단을 선택해주세요.")
            return;
        }
        if (orderAddress.name === null || orderAddress.name === '') {
            alert("이름을 입력하세요.");
            return;
        }

        if (orderAddress.mobileNo === null || orderAddress.mobileNo === '') {
            alert("휴대폰 번호를 입력하세요.");
            return;
        }

        if (orderAddress.address === null || orderAddress.address === '') {
            alert("상세 주소를 입력해야 주문할 수 있습니다.");
            return;
        }

        if (orderAddress.postNo === null || orderAddress.postNo === '') {
            alert("우편번호를 입력해야 주문할 수 있습니다.");
            return;
        }

        requestPayment(payment)
    }

    return (
        <div>
            <div className="w-[1200px] overflow-x-auto">
                <Typography className={"font-bold text-3xl ml-4 mb-5"}>
                    결제 정보
                </Typography>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-2xl text-center rounded-s-lg" colspan="2">
                            상품 정보
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            수량
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            금액
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkedItemsArray.map((item) => {
                        return (
                            <tr className="bg-white dark:bg-gray-800">
                                <td scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.productImages.length > 0 && (
                                        <img
                                            src={`${API_SERVER_HOST}/api/products/view/thumbnail_${
                                                item.productImages
                                                    .filter(image => image.productType === "INFO")
                                                    .map(image => image.productFileName)[0]
                                            }`}
                                            alt={item.productName}
                                            className={`w-[60px] items-center aspect-square rounded-lg object-cover`}
                                        />
                                    )}
                                </td>
                                <td scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.productName}
                                </td>
                                <td className="py-4 text-right">
                                    {item.quantity}
                                </td>
                                <td className="py-4 text-right">
                                    {item.productPrice.toLocaleString()}원
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                    <tr className="font-semibold text-gray-900">
                        <td scope="row" className="px-6 py-3 text-base">Total</td>
                        <td></td>
                        <td></td>
                        <td className="py-3 text-right">{totalPrice.toLocaleString()}원</td>
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
                                    onChange={(e) => handleChangeCustom(e, "name")}
                                    value={checkedValue === "default" ? userInfo.name : customInput.name}
                                    label={"받는분"}/>
                            </div>
                            <div className={"w-72 ml-[-170px]"}>
                                <Input
                                    size={"lg"}
                                    className={"w-72"}
                                    label={"휴대폰번호"}
                                    onChange={(e) => handleChangeCustom(e, "mobileNo")}
                                    value={checkedValue === "default" ? userInfo.mobileNo : customInput.mobileNo}
                                    placeholder={"\"-\"없이 숫자만 입력해주세요"}/>
                            </div>
                        </div>
                        <div className={"mt-3"}>
                            <div className={"flex gap-2.5"}>
                                <div className={"postcodeInput"}>
                                    <Input
                                        size={"lg"}
                                        label={"우편번호"}
                                        value={checkedValue === "default" ? (userInfo.postNo === null ? "" : userInfo.postNo) : customInput.postNo}
                                        labelProps={{
                                            className: "w-[150px]",
                                        }}
                                        readOnly={true}/>
                                </div>

                                <div className={"w-[100px]"}>
                                    {checkedValue === "default" ? <></>
                                        : <Button
                                            className={"w-20 mt-1"}
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
                                    value={checkedValue === "default" ? (userInfo.address === null ? "" : userInfo.address) : customInput.address}
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
                            variant={payment === "kakaopay" ? "filled" : "outlined"}
                            color={"yellow"}
                            onClick={() => handlePayment("kakaopay")}
                        >
                            카카오페이
                        </Button>
                        <Button
                            className={"mt-5"}
                            variant={payment === "tosspay" ? "filled" : "outlined"}
                            color={"blue"}
                            onClick={() => handlePayment("tosspay")}
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
                        className="w-full !border-gray-300 focus:!border-gray-900"
                        value={mileage}

                        onChange={handleMileageChange} // 입력값 변화에 따라 상태 업데이트
                        onBlur={() => handleCheckMileage(mileage)}
                        onFocus={handleMileageFocus}
                    />
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
                            사용적립금
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
                            {totalPrice.toLocaleString()}원
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            +
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            {shippingCost.toLocaleString()}원
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            -
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            {result.toLocaleString()}원
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            =
                        </td>
                        <th className="px-3 py-3 text-2xl text-center ">
                            {(totalPrice + shippingCost - result).toLocaleString() + "원"}
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