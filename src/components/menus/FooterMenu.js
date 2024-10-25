import {Typography} from "@material-tailwind/react";
import React, { useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import { Dialog } from "@material-tailwind/react";

export function BreadcrumbsDefault() {
    // 다이얼로그 열림 상태를 관리하는 state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");

    // 고객센터 링크 클릭 시 다이얼로그 내용 설정 및 열기
    const handleCustomerServiceClick = () => {
        setDialogTitle("고객센터");
        setDialogContent(
            "1588-1234\n" +
            "평일 9:00-18:00 (점심시간 12:00-13:00)\n" +
            "주말 및 공휴일은 휴무"
        );
        setDialogOpen(true); // 다이얼로그 열기
    };

    // 회사정보 링크 클릭 시 다이얼로그 내용 설정 및 열기
    const handleCompanyInfoClick = () => {
        setDialogTitle("회사정보");
        setDialogContent(
            "상호명: (주)다락방\n" +
            "대표자명: 황재인\n" +
            "사업장 주소: 서울 금천구 가산디지털2로 101 B동 309호\n" +
            "대표전화: 1588-1234\n" +
            "이메일: support@darackbang.com\n" +
            "사업자 등록번호: 123-45-67890"
        );
        setDialogOpen(true); // 다이얼로그 열기
    };

    // 다이얼로그 닫기
    const handleCloseDialog = () => {
        setDialogOpen(false); // 다이얼로그 닫기
    };

    return (
        <>
            <Breadcrumbs>
                <Link to="#"
                      className="opacity-60"
                      onClick={handleCustomerServiceClick}>
                    고객센터
                </Link>
                <Link to="#"
                      className="opacity-60"
                      onClick={handleCompanyInfoClick}>
                    회사정보
                </Link>
                <Link to="/privacy" className="opacity-60">
                    개인정보처리방침
                </Link>
            </Breadcrumbs>

            {/* Dialog 컴포넌트 */}
            <Dialog
                open={dialogOpen} // 다이얼로그 열림 상태
                handler={handleCloseDialog} // 다이얼로그 닫는 핸들러
            >
                <div className="p-6">
                    <Typography className="text-lg font-semibold">
                        {dialogTitle}
                    </Typography>
                    <Typography className="mt-2">
                        {dialogContent.split('\n').map((line, index) => (
                            <div key={index}>{line}</div> // 줄바꿈 처리
                        ))}
                    </Typography>
                    <div className="flex justify-end mt-4">
                        <button
                            className="px-4 py-2 bg-black text-white rounded"
                            onClick={handleCloseDialog}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

const FooterMenu = () => {
    return (
        <footer className='w-full footer py-12 pt-24 px-8'>
            <div className='w-full flex items-center flex-col justify-center'>
                <Typography className='font-poppins text-lg font-semibold text-purple-100'>
                    <img
                        src='/images/darackbang_logo.png'
                        alt="다락방"
                        className="h-48 w-48"
                    />
                </Typography>

                <BreadcrumbsDefault />
            </div>
        </footer>
    );
}

export default FooterMenu;