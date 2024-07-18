'use client';
import { useState, useEffect } from "react";
import { PromptCard } from '@components'

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout" data-test='prompt-cards'>
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
  const [filteredPosts, setFilteredPosts] = useState([])
  // const handleSearchChange = (e) => {
  //   setSearchText(e.target.value);
  // }

  useEffect(() => {
    
    const fetchPosts = async () => {
      console.log("search is ", searchText);
      const respone = await fetch(`api/prompt`);

      const data = await respone.json();
      console.log(data);

      if (data) {
        setPosts(data)
        setFilteredPosts(data)
      }
    }

    fetchPosts();
  }, []);

  const handleTextChange = (e) => {
    setSearchText(e.target.value); 
    setFilteredPosts( 
      posts.filter(post => 
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
      ))
  }

  return (
    <section className="feed" data-test='feed-cont'>
      <form className="relative w-full flex-center">
        <input type="text" 
          placeholder="Search for a tag or a username"
          value= {searchText}
          onChange={(e) => handleTextChange(e) }
          // required
          className="search_input peer"
        />
      </form>

      <PromptCardList  data={filteredPosts} handleTagClick={(tag) => { setSearchText(tag) } }/>
    </section>
  )
}

export default Feed