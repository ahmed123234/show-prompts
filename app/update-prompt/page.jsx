'use client';

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Form } from "@components";

const updatePrompt = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const  searchParams = useSearchParams();
    const promptId = searchParams.get('id'); 
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    console.log("promptId", promptId);

    useEffect(() =>  {
        const getPromptDeatils = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                headers: {
                    "content-type": "aplication/josn"
                }
            });

            const data = await response.json();

            console.log("the geted data is ", data);

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
       if(promptId)  getPromptDeatils();
    }, [promptId]);
    
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found!');

        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/')
            }

        } catch(err) {
            console.error('Error updating Prompt:', err);
        } finally {
            setSubmitting(false);
        }

    } 

  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
   
  )
}

export default updatePrompt