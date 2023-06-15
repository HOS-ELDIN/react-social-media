import "./App.css";
import Home from "./Pages/home-page/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import NewPost from "./components/create-post/NewPost";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/newpost" element={<NewPost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
