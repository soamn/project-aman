"use client";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

interface LikeProps {
  likes: number;
  url: string;
  isPost: boolean;
}

const Likes = ({ likes, url, isPost }: LikeProps) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let likedFromStorage = false;
    if (!isPost) {
      likedFromStorage = localStorage.getItem(`gallery/${url}`) === "1";
    } else {
      likedFromStorage = localStorage.getItem(`${url}`) === "1";
    }
    setLiked(likedFromStorage);
  }, [url]);

  const likeitem = async () => {
    if (liked) return;

    try {
      let fetchurl = url;
      if (!isPost) {
        fetchurl = `/api/gallery/${url}`;
      } else {
        fetchurl = `/api/post/${url}`;
      }
      const res = await fetch(fetchurl, {
        method: "PATCH",
      });
      const response = await res.json();
      if (response.success) {
        localStorage.setItem(`${response.message.slug}`, "1");
        setLikeCount(response.message.Likes);
        setLiked(true);
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return (
    <button
      className="flex items-center gap-2"
      disabled={liked}
      onClick={likeitem}
    >
      <Heart
        width={18}
        height={18}
        className={`cursor-pointer transition-all duration-200 ${
          liked ? "fill-black " : "fill-none "
        }`}
      />
      {likeCount}
    </button>
  );
};

export default Likes;
