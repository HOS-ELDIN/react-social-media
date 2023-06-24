//  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
import React, { useEffect, useState } from "react";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// ! add delete post

//HOS-ELDIN/react-social-media

const Post = ({ post, getPosts }) => {
	const navigate = useNavigate();

	const [likes, setLikes] = useState([]);

	const [user] = useAuthState(auth);

	const likesRef = collection(db, "likes");

	const likesDoc = query(likesRef, where("postId", "==", post?.id));

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(
			data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
		);
		// console.log(data.docs.map((doc) => ({ userId: doc.data().userId })));
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

	useEffect(() => {
		getLikes();
		// eslint-disable-next-line
	}, []);

	const addLike = async () => {
		if (!hasUserLiked) {
			try {
				const newDoc = await addDoc(likesRef, {
					username: user?.displayName,
					userId: user?.uid,
					postId: post.id,
				});
				setLikes((prev) => [...prev, { userId: user?.uid, likeId: newDoc.id }]);
				// console.log(post);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likesRef,
				where("postId", "==", post?.id),
				where("userId", "==", user?.uid)
			);

			const likeToDeleteData = await getDocs(likeToDeleteQuery);

			const likeToDeleteId = likeToDeleteData.docs[0].id;
			const likeToDelete = doc(db, "likes", likeToDeleteId);
			await deleteDoc(likeToDelete);
			setLikes((prev) => prev.filter((like) => like.likeId !== likeToDeleteId));
		} catch (error) {
			console.log(error);
		}
	};

	const deletePost = async () => {
		const postId = post.id;
		console.log(post);
		const postToDelete = doc(db, "posts", postId);
		await deleteDoc(postToDelete);
		getPosts();
	};

	return (
		<div className="post">
			<div className="title">
				<h3>{post.title}</h3>
			</div>
			<div className="body">
				<p>{post.description}</p>
			</div>
			<div className="footer">
				<div>
					<button
						className="like-button"
						onClick={addLike}
						style={hasUserLiked && { backgroundColor: "coral" }}
					>
						&#128077;
					</button>
					<span>{likes?.length}</span>
					<button className="unlike-button" onClick={removeLike}>
						&#128078;
					</button>
				</div>
				<p>@{post.username}</p>
				{post?.userId === user?.uid && (
					<button className="delete-button" onClick={deletePost}>
						&#10008;
					</button>
				)}
			</div>
		</div>
	);
};

export default Post;
