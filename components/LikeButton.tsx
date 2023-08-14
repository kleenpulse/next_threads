"use client";

import Image from "next/image";
import { useState } from "react";

const LikeButton = () => {
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		setIsLiked((prev) => !prev);
	};
	return (
		<Image
			src={`${isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}`}
			onClick={handleLike}
			alt="heart"
			width={24}
			height={24}
			className="cursor-pointer object-contain "
		/>
	);
};

export default LikeButton;
