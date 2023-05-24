"use client";
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className='mt-8 prompt_layout'>
      {data?.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = ()=> {
  const [allPost, setAllPosts]= useState([]);
  //Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    
    setAllPosts(data);
  };
  
  useEffect(()=>{
    fetchPosts();
  }
  ,[]);
const filterPrompts= (searchtext)=>{
  const regex = new RegExp(searchtext, 'i')  // 'i' flag for case insensitive search

  return allPost.filter(
    (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
  );
};
  const hendleSearchText = (e)=>{
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 1000)
    );
  };

 const handleTagClick = (tagName)=>{
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
 }
  return (
   <section className='feed'>
    <form className='relative w-full flex flex-center'>
      <input 
       type='text'
       placeholder='Search for tag or username'
       value={searchText}
       onChange={hendleSearchText}
       required
       className='search_input perr'
      />
    </form>
   
   {
    searchText ? (
      <PromptCardList 
        data={searchResults}
        handleTagClick={handleTagClick}
      />
    ) : (
      <PromptCardList 
      data={allPost}
      handleTagClick={handleTagClick}
      />
    )
   }
      
     
   </section>
  )
}

export default Feed
