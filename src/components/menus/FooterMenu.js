import {Typography} from "@material-tailwind/react";
import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export function BreadcrumbsDefault() {

    return (
        <div className={"flex"}>
            <Breadcrumbs>
                <Link to="/company" className="opacity-60">
                    회사정보
                </Link>
                <Link to="/privacy" className="opacity-60">
                    개인정보처리방침
                </Link>
            </Breadcrumbs>
        </div>
    );
}

const FooterMenu = () => {
    return (
        <footer className='w-full footer py-12 pt-15 px-8'>
            <div className='w-full flex items-center flex-col justify-center'>
                <div className={"flex"}>
                    <Typography className='font-poppins text-lg font-semibold text-purple-100'>
                        <img
                            src='/images/darackbang_logo.png'
                            alt="다락방"
                            className="w-[130px] h-auto filter grayscale opacity-80"
                        />
                    </Typography>
                    <div className="flex items-center">
                        <div>
                            <div className="flex">
                                <div className="text-xl font-bold text-indigo-600">고객센터</div>
                                <div className="ml-2 text-xl text-brown-300">1588-1234</div>
                            </div>
                            <div className="text-sm mb-3 text-gray-800">
                                평일 9:00-18:00 · 점심시간 12:00-13:00 · 주말 및 공휴일 휴무
                            </div>
                            <BreadcrumbsDefault/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterMenu;