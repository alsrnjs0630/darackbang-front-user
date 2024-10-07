import React, {useEffect, useState} from "react";
import {Button} from "@material-tailwind/react";
import {modifyInfo, mypageInfo} from "../../apis/MemberApi";
import {useNavigate} from "react-router-dom";



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
    }

    const [infoParam, setInfoParam] = useState({...initState})
    const navigate = useNavigate();

    // 컴포넌트 렌더링 시 사용자 정보 로딩 후 화면에 출력
    useEffect(() => {
        const fetchMyInfo = async () => {
            const myInfo = await mypageInfo()
            if (myInfo == null) {
                alert("잘못된 사용자 정보입니다.")
                navigate("/")
            } else{
                setInfoParam(myInfo);
            }
        }
        fetchMyInfo();
    },[]);


    //수정 내용 modifyParam으로 설정
    const handleOnModify = (e) => {
        infoParam[e.target.name] = e.target.value
        setInfoParam({...infoParam})
    }

    const infoModify = async () => {
        const response = await modifyInfo(infoParam);
        if (response.RESULT === "SUCCESS") {
            alert("회원 정보가 수정되었습니다.");
            window.location.reload(); // 페이지 새로고침
        } else {
            alert("예상치 못한 에러가 발생했습니다. 다시 시도해주세요.");
        }
    };

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
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본주소 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"postNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.postNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button color={"blue"}>우편번호 검색</Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">도로명 주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5" >
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본배송지 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"shipPostNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.shipPostNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button color={"blue"}>우편번호 검색</Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">도로명 주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">추가배송지 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                name={"addPostNo"}
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                value={infoParam.addPostNo}
                                onChange={handleOnModify}
                                disabled
                            />
                            <Button color={"blue"}>우편번호 검색</Button>
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">도로명 주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                value="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                </dl>
            </div>
            <div className={"flex justify-center mt-10"}>
                <Button onClick={infoModify}>수정완료</Button>
                <Button variant={"outlined"} className={"ml-10 mr-10"}>수정취소</Button>
                <Button color={"red"}>회원탈퇴</Button>
            </div>
        </div>
    );
}

export default MyPageInfoComponent;





