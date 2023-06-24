import React from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
// import { useRef } from "react";

const CreateForm = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	// const titleInputRef = useRef();

	const schema = yup.object().shape({
		title: yup.string().required("pls add a title."),
		description: yup.string().required("pls add a description."),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const postRef = collection(db, "posts");

	const onCreatePost = async (data) => {
		await addDoc(postRef, {
			...data,
			username: user?.displayName,
			userId: user?.uid,
		});
		navigate("/");
	};

	return (
		<form className="new-post-form" onSubmit={handleSubmit(onCreatePost)}>
			<input
				type="text"
				placeholder="Title..."
				{...register("title")}
				// ref={titleInputRef}
				autoFocus
			/>
			<p>{errors.title?.message}</p>
			<textarea
				id=""
				cols="30"
				rows="10"
				placeholder="description"
				{...register("description")}
			></textarea>
			<p>{errors.description?.message}</p>
			<input type="submit" />
		</form>
	);
};

export default CreateForm;
