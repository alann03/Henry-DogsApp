import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import Error404 from "./components/Error 404/Error404";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/create-dog" component={Form} />
					<Route exact path="/home/:id" component={Detail} />
					<Route component={Error404} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
