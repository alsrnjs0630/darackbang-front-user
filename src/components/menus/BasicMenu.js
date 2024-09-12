import {Link} from "react-router-dom";

const BasicMenu = () => {

    return (
        <nav id='navbar' className={'flex bg-blue-300'}>
            <div className={'w-4/5 bg-gary-500'}>
                <ul className={'flex p-4 text-white font-bold justify-between'}>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>다락방로고</Link>
                    </li>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>브랜드</Link>
                    </li>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>매뉴1</Link>
                    </li>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>매뉴2</Link>
                    </li>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>매뉴3</Link>
                    </li>
                    <li className={'text-2xl'}>
                        <Link to={'/'}>매뉴4</Link>
                    </li>
                </ul>
            </div>
            <div className={'w-1/5 flex justify-around bg-orange-300 p-4 font-medium'}>
                <div className={'text-white text-2xl m-1 rounded cursor-pointer'}>
                    <Link to={'/'}>로그인</Link>
                </div>
                <div className={'text-white text-2xl m-1 rounded cursor-pointer'}>
                    <Link to={'/'}>매뉴1</Link>
                </div>
                <div className={'text-white text-2xl m-1 rounded cursor-pointer'}>
                    <Link to={'/'}>매뉴2</Link>
                </div>
            </div>
        </nav>
    );
}

export default BasicMenu;