import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Post from "./Post";

function Home() {
	const postsRef = collection(db, "posts");
	const [postsList, setPostsList] = useState(null);

	const getPosts = async () => {
		const data = await getDocs(postsRef);
		setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="home">
			{postsList?.map((listItem) => (
				<Post key={listItem.id} post={listItem} />
			))}
		</div>
	);
}

export default Home;
