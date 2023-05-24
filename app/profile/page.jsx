"use client"
import React, { useEffect, useState } from 'react'
import {useSession}  from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Profile from '../../components/Profile';

const MyProfile = () => {
    const {data: session} = useSession();
    const [mypost, setMyPost] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();

            setMyPost(data);
        };
        if(session?.user.id) fetchPosts();
    },[session?.user.id]);


    const handleEdit =(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post)=>{
        const hasConfimed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfimed){
            try {
                await fetch (`/api/prompt/${post._id.toString()}`,{
                    method: "DELETE"
                });

                const filteredPosts = mypost.filter((item)=>item._id !== post._id);
                setMyPost(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    
    }
  return (
    <Profile 
    name="My"
    desc="Welcome to your personalized profile page. Share your exceptional prompt"
    data={mypost}
    handleEdit= {handleEdit}
    handleDelete= {handleDelete}
    />
  )
}

export default MyProfile
