import React, {useEffect, useState} from "react";
import {Button} from "@material-tailwind/react";
import {mypageInfo} from "../../apis/MemberApi";
import {useNavigate} from "react-router-dom";



const MyPageInfoComponent = () => {
    const infoInitState = {
        userEmail: '',
        name: '',
        birthday: '',
        mobileNo: '',
        phoneNo: '',
        postNo: '',
        address: '',
        shipPostNo: '',
        shippingAddr: '',
        addPostNo: '',
        addShippingAddr: '',
    }

    const modifyInitState = {
        name: '',
        mobileNo: '',
        phoneNo: '',
        postNo: '',
        address: '',
        shipPostNo: '',
        shippingAddr: '',
        addPostNo: '',
        addShippingAddr: '',
    }

    const [infoParam, setInfoParam] = useState({...infoInitState})
    const [modifyParam, setModifyParam] = useState()
    const navigate = useNavigate();

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

    return (
        <div className="max-w-4xl mx-auto"> {/* 전체 div의 최대 너비 설정 */}
            <div className="px-4 sm:px-0">
                <h3 className="text-3xl font-semibold leading-7 text-gray-900">회원정보</h3>
            </div>
            <div className="mt-6 w-480 border-t border-gray-100">
                <dl className="divide-y divide-gray-900">
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">이메일</dt>
                        <dd className="sm:col-span-3 sm:mt-0 pt-2 pb-3">
                            <input
                                type="email"
                                className="mt-1 block w-80 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue={infoParam.userEmail}
                                disabled
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">이름</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="홍길동"
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">생년월일</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="19980630"
                                disabled
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">휴대폰번호</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="01099049212"
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">전화번호</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="024469252"
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본주소 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                defaultValue="15010"
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
                                defaultValue="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">기본배송지 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                defaultValue="15010"
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
                                defaultValue="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-7 pb-5">추가배송지 우편번호</dt>
                        <dd className="sm:col-span-3 sm:mt-0 flex inline pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm sm:text-sm "
                                defaultValue="15010"
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
                                defaultValue="경기도 시흥시 배곧 4로"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                        <dt className="text-sm font-bold text-gray-900 bg-gray-200 sm:col-span-1 pl-2 pt-5 pb-5">상세주소</dt>
                        <dd className="sm:col-span-1 sm:mt-0 pt-5 pb-5">
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                defaultValue="센텀베이 509동"
                                style={{whiteSpace: 'nowrap'}}
                            />
                        </dd>
                    </div>
                </dl>
            </div>
            <div className={"flex justify-center mt-10"}>
                <Button>수정완료</Button>
                <Button variant={"outlined"} className={"ml-10 mr-10"}>수정취소</Button>
                <Button color={"red"}>회원탈퇴</Button>
            </div>
        </div>
    );
}

export default MyPageInfoComponent;
