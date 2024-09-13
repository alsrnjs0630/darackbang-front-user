import {Link} from "react-router-dom";

const SideBarMenu = () => {
    return (
        <nav id='navbar' className={'flex bg-blue-300'}>
                <ul className={'flex flex-col p-4 text-white font-bold'}>
                    <li className={'text-2xl mb-2'}>
                        <Link to={'/'}>사이드 메뉴1</Link>
                    </li>
                    <li className={'text-2xl mb-2'}>
                        <Link to={'/'}>사이드 메뉴2</Link>
                    </li>
                    <li className={'text-2xl mb-2'}>
                        <Link to={'/'}>사이드 메뉴3</Link>
                    </li>
                    <li className={'text-2xl mb-2'}>
                        <Link to={'/'}>사이드 메뉴4</Link>
                    </li>
                </ul>
        </nav>

    );
}

export default SideBarMenu;