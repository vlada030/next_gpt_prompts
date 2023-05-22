"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSearchParams, usePathname } from "next/navigation";


const UserProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const modifiedPathname = pathname.replace("/profile/", '')

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`/api/users/${modifiedPathname}/posts`)
        const posts = await response.json();
        console.log(posts)
        setPosts(posts)
      } catch (error) {
        console.log(error)
      }
    };
    getPosts();
  }, []);

  return (
    <Profile
      name={name}
      desc="Here you can see all post of a user that you clicked"
      data={posts}
    />
  );
};

export default UserProfilePage;
