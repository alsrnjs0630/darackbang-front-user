import BasicMenu from "../components/menus/BasicMenu";
import FooterMenu from "../components/menus/FooterMenu";

const BasicLayout = ({children}) => {

    return (
        <>
            <BasicMenu/>
            <br/>
            <hr/>
            <div className={'bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0'}>
                <main className={'mx-auto lg:w-3/4 px-5 py-5'}>
                    {children}
                </main>
            </div>
            <hr/>
            <FooterMenu/>
        </>
    );
}

export default BasicLayout;