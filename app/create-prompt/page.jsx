'use client';
import { useState } from 'react'
import Form from '../../components/Form'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [post, setPost ]= useState({Prompt: "", tag: ""});
    const [isSubmitting, setISSubmitting]= useState(false);

    const createPrompt = async (e) => {
        e.preventDefault();
        setISSubmitting(true);
    try {
        const response = await fetch("/api/prompt/new",{
            method: "POST",
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
            }),
        });
        if(response.ok){
            router.push('/')
        }
    } catch (error) {
        console.log(error);
    } finally {
        setISSubmitting(false);
    }
       
      };
  return (
    <Form
    type= "create"
    post={post}
    setPost= {setPost}
    submitting= {isSubmitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
