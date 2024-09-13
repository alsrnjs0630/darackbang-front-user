import BasicMenu from "../components/menus/BasicMenu";
import FooterMenu from "../components/menus/FooterMenu";
import SideBarMenu from "../components/menus/SideBarMenu";

const BasicLayout = ({children}) => {

    return (
        <>
            <BasicMenu/>
            <div className={'bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0'}>
                <SideBarMenu/>
                <main className={'bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5'}>
                    {children}
                </main>
            </div>
            <FooterMenu/>
        </>
    );
}

export default BasicLayout;