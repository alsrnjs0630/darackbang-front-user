import {Typography} from "@material-tailwind/react";
import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export function BreadcrumbsDefault() {
    return (
        <Breadcrumbs>
            <Link to={"#"} className="opacity-60">
                고객센터
            </Link>
            <Link to="#" className="opacity-60">
                회사 정보
            </Link>
            <Link to="#" className="opacity-60">
                개인정보 처리방침
            </Link>
        </Breadcrumbs>
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