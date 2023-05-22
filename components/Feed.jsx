"use client";

import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const onTagClick = (tag) => {
    setSearchText(tag);
    const filteredPosts = posts.filter((post) => post.tag.includes(tag));
    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.creator.username.includes(searchText) ||
        post.tag.includes(searchText)
    );
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={onTagClick} />
    </section>
  );
};

export default Feed;
