import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
	const [user] = useAuthState(auth);

	const signUserOut = async () => {
		await signOut(auth);
	};

	return (
		<div className="nav-bar">
			<Link to={"/"}>Home</Link>
			{user ? (
				<Link to={"/newpost"}>New Post</Link>
			) : (
				<Link to={"/login"}>Login</Link>
			)}

			{user && (
				<div className="user-data">
					<img src={user?.photoURL} alt="" />
					<p>{user?.displayName}</p>
					<button className="log-out" onClick={signUserOut}>
						log out
					</button>
				</div>
			)}
		</div>
	);
}

export default Navbar;
