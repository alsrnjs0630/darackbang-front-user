import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {logoutPost, modifyInfo, mypageInfo} from "../../apis/MemberApi";
import {useNavigate} from "react-router-dom";
import {useDaumPostcodePopup} from "react-daum-postcode";

const MyPageInfoComponent = () => {
    const initState = {
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

    //  회원 탈퇴 모닮창
    const [size, setSize] = React.useState(null);
    const handleOpen = (value) => setSize(value);

    const [infoParam, setInfoParam] = useState({...initState})
    const navigate = useNavigate();

    // 다음 우편번호 팝업
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

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
        setInfoParam((prevState) => ({
            ...prevState,
            address: fullAddress,         // 선택된 주소
            postNo: data.zonecode         // 선택된 우편번호
        }));
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };


    const handleShippingComplete = (data) => {
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
        setInfoParam((prevState) => ({
            ...prevState,
            shippingAddr: fullAddress,         // 선택된 주소
            shipPostNo: data.zonecode         // 선택된 우편번호
        }));
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleAddShippingComplete = (data) => {
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
        setInfoParam((prevState) => ({
            ...prevState,
            addShippingAddr: fullAddress,         // 선택된 주소
            addPostNo: data.zonecode         // 선택된 우편번호
        }));
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleSearch = () => {
        console.log("오픈")
        open({onComplete: handleComplete});
    }

    const handleSearch2 = () => {
        console.log("오픈")
        open({onComplete: handleShippingComplete});
    };

    const handleSearch3 = () => {
        console.log("오픈")
        open({onComplete: handleAddShippingComplete});
    };

    // 컴포넌트 렌더링 시 사용자 정보 로딩 후 화면에 출력
    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const myInfo = await mypageInfo()
                if (myInfo == null) {
                    alert("잘못된 사용자 정보입니다.")
                    navigate("/")
                } else {
                    setInfoParam(myInfo)
                    console.log(myInfo)
                }
            } catch(error) {
                if (error.response) {
                    if(error.response.status === 401){
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

    //수정 내용 modifyParam으로 설정
    const handleOnModify = (e) => {
        infoParam[e.target.name] = e.target.value
        setInfoParam({...infoParam})
    }

    // 회원정보 수정 메서드 (수정완료 버튼)
    const infoModify = async () => {
        try {
            const response = await modifyInfo(infoParam)
            if (response.RESULT === "SUCCESS") {
                alert("회원 정보가 수정되었습니다.");
                window.location.reload(); // 페이지 새로고침
            } else {
                alert("회원 정보 수정에 실패하였습니다. 다시 시도해주세요");
            }
        } catch(error) {
            if (error.response) {
                if (error.response.status === 401){
                    alert("세션이 만료되었습니다. 다시 로그인 해주세요")
                    logoutPost()
                    localStorage.removeItem('loginState'); // localStorage에서 로그인 상태 제거
                    localStorage.removeItem('accessToken'); // localStorage에서 액세스 토큰 제거
                    navigate("/login")
                    window.location.reload();
                } else {
                    console.log("error: ", error.response)
                    alert("회원 정보 수정에 실패하였습니다. 다시 시도해주세요");
                }
            }
        }
    };

    // 수정내역 초기화 메서드 (수정취소 버튼)
    const cancelModify = () => {
        alert("회원정보 수정을 취소하고 메인페이지로 돌아갑니다.")
        navigate("/")
    }

    // 회원 탈퇴 메서드
    const ResignMember = async () => {
        try {
            // infoParam의 복사본을 만들고 memberState를 "03"으로 설정
            const updatedParam = {
                ...infoParam,
                memberState: "03"
            };
            // 상태를 업데이트
            await setInfoParam(updatedParam);
            // updatedParam을 사용하여 modifyInfo 호출
            await modifyInfo(updatedParam)
            console.log(updatedParam); // API 호출 결과를 로그에 출력
            handleOpen(null);
            // 로그아웃 처리
            await logoutPost()
            localStorage.removeItem('loginState'); // localStorage에서 로그인 상태 제거
            // 메인페이지로 이동
            navigate("/")
            window.location.reload();
        } catch(error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("세션이 만료되었습니다. 다시 로그인 해주세요")
                    logoutPost()
                    localStorage.removeItem('loginState'); // localStorage에서 로그인 상태 제거
                    localStorage.removeItem('accessToken'); // localStorage에서 액세스 토큰 제거
                    navigate("/login")
                    window.location.reload();
                } else {
                    console.log("error: ", error.response)
                    alert("회원 탈퇴에 실패하였습니다. 다시 시도해주세요");
                }
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto"> {/* 전체 div의 최대 너비 설정 */}
            <div className="px-4 sm:px-0">
                <h3 className="text-3xl font-semibold leading-7 text-gray-900">회원정보</h3>
            </div>
            <div className="mt-6 w-480 border-t border-gray-100">
                <dl className="divide-y divide-gray-900">
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">이메일</dt>
                        <dd className="sm:col-span-3 sm:mt-0 pt-4 pb-3">
                            <input
                                type="email"
                                className="mt-1 block w-80 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.userEmail}
                                disabled
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">이름</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"name"}
                                onChange={handleOnModify}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.name}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">생년월일</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.birthday}
                                disabled
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">휴대폰번호</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"mobileNo"}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.mobileNo}
                                onChange={handleOnModify}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">전화번호</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"phoneNo"}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.phoneNo}
                                onChange={handleOnModify}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본주소
                            우편번호
                        </dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"postNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.postNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button
                                color={"blue"}
                                onClick={handleSearch}>
                                우편번호 검색
                            </Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">기본주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"address"}
                                className="mt-1 block w-80 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.address}
                                style={{whiteSpace: 'nowrap'}}
                                onChange={handleOnModify}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본배송지
                            우편번호
                        </dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"shipPostNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.shipPostNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button
                                color={"blue"}
                                onClick={handleSearch2}>
                                우편번호 검색
                            </Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">기본배송지
                            주소
                        </dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"shippingAddr"}
                                className="mt-1 block w-80 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.shippingAddr}
                                style={{whiteSpace: 'nowrap'}}
                                onChange={handleOnModify}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">추가배송지
                            우편번호
                        </dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"addPostNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.addPostNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button
                                color={"blue"}
                                onClick={handleSearch3}
                            >
                                우편번호 검색
                            </Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">추가배송지
                            주소
                        </dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                name={"addShippingAddr"}
                                className="mt-1 block w-80 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value={infoParam.addShippingAddr}
                                style={{whiteSpace: 'nowrap'}}
                                onChange={handleOnModify}
                            />
                        </dd>
                    </div>
                </dl>
            </div>
            <div className={"flex justify-center mt-10"}>
                <Button onClick={infoModify}>수정완료</Button>
                <Button variant={"outlined"} className={"ml-10 mr-10"} onClick={cancelModify}>수정취소</Button>
                <Button color={"red"} onClick={() => handleOpen("xs")}>회원탈퇴</Button>
            </div>
            {/* 회원 탈퇴 모달 */}
            <Dialog
                open={size === "xs"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>정말로 탈퇴하시겠습니까?</DialogHeader>
                <DialogBody>
                    "확인"을 누르시면 탈퇴처리가 완료됩니다.
                    탈퇴신청 후에도 결제 완료된 배송중인 상품은 환불 불가능하며 보유중인 마일리지는 소멸됩니다.
                    탈퇴처리 완료 후 재가입시 같은 이메일로 가입이 가능합니다.
                    <br/>
                    (단, 이미 탈퇴처리가 됐을 경우 취소는 불가능합니다)
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="black"
                        onClick={() => handleOpen(null)}
                        className="mr-1"
                    >
                        <span>취소</span>
                    </Button>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => ResignMember()}
                    >
                        <span>확인</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default MyPageInfoComponent;