import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {useRouter,usePathname} from 'next/navigation'

const PromptCard = ({post, handleTagClick, handleDelete, handleEdit})=> {
  const {data:session}= useSession();
  const pathName=  usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState(" ");
  const [copy, setCopy] = useState(false);
 const handleProfileClick = ()=>{

 }
  const handleCopy = ()=>{
    setCopied(post);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopy(true), 3000);
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image 
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-rray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copy 
            ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm texy-gray-700'>{post.prompt}</p>
      <p
      className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gary-100 pt-3'>
          <p 
           className='font-inter text-sm green_gradient cursor-pointer'
           onClick={handleEdit}
          >
            Edit
          </p>
          <p 
           className='font-inter text-sm orange_gradient cursor-pointer'
           onClick={handleDelete}
          >
            Delete
          </p>
         </div>
      )}
    </div>
  );
};

export default PromptCard
