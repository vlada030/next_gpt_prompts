"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-query?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const confirmDelete = confirm("Confirm delete of the post?");
    if (confirmDelete) {
    try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const updatedPOsts = posts.filter((p) => p._id !== post._id);
        setPosts(updatedPOsts);
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
