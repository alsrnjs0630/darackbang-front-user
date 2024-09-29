import BasicLayout from '../layouts/BasicLayout';
import {Outlet} from "react-router-dom";

const HomePage = () => {

	return (
		<BasicLayout>
			<div className={'w-full flex justify-center text-3xl'}>
				<Outlet/>
			</div>
		</BasicLayout>
	);
}

export default HomePage;