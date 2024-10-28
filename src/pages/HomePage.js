import BasicLayout from '../layouts/BasicLayout';
import {Outlet} from "react-router-dom";

const HomePage = () => {

	return (
		<BasicLayout>
			<div className={'w-full flex flex-col items-center justify-center text-3xl'}>
				<Outlet/>
			</div>
		</BasicLayout>
	);
}

export default HomePage;