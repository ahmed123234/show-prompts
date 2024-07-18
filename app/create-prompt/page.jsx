'use client';

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Form } from "@components";

const createPrompt = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                headers: {
                    "content-type": 'Application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })

            if (response.ok) {
                console.log(response.body)
                router.push('/')
            }

        } catch(err) {
            console.log('Error creating new Prompt:', err);
        } finally {
            setSubmitting(false);
        }

    } 

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default createPrompt