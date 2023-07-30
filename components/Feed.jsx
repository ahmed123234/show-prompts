'use client';
import { useState, useEffect } from "react";
import { PromptCard } from '@components'

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard key={post.id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
)

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  // const handleSearchChange = (e) => {
  //   setSearchText(e.target.value);
  // }

  useEffect(() => {
    
    const fetchPosts = async () => {
      console.log("search is ", searchText);
      const respone = await fetch(`api/prompt?q=${searchText}`);

      const data = await respone.json();
      console.log(data);

      if (data) {
        setPosts(data)
      }
    }

    fetchPosts();
  }, [searchText])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" 
          placeholder="Search for a tag or a username"
          value= {searchText}
          onChange={(e) =>  setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList  data={posts} handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed