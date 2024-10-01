import React from "react";
import {RouterProvider} from "react-router-dom";

import root from "./router/root";
import {Provider} from "react-redux";
import store from "./utils/store";

function App() {
	return (
		<Provider store={store}>
		<RouterProvider router={root}/>
		</Provider>
	);
}

export default App;
