"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@components";


const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      const respone = await fetch(`api/users/${session.user.id}/posts`);
      const data = await respone.json();
      console.log(data);

      if (data) {
        setPosts(data)
      }
    }

    if (session?.user.id) {
      fetchPosts();
    }
  }, [])

  const handleDelete = async (post) => {
    // router.push(`/delete-prompt?id=${post._id}`)

    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",

        });
        
        setPosts((prev) => prev.filter(p => p._id !== post._id))
      } catch(err) {
        console.log(err.message);
      }
    }
  }
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  

  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile