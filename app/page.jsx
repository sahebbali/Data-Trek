import React from 'react'
import Feed from '../components/Feed'
function Home() {
  return (
    <section className='w-full flex-center flex-col' >
        <h1 className='head_text text-center'>Unearth & Spread 
            <br className='max-md: hidden' />
            <span className='text-center'> AI-Generated Suggestions</span>
        </h1>

        <p className='desc text_center' > Data tark is an open-source AI prompting tool for the modern era to investigate, develop, and share creative prompts.</p>
      
      <Feed/>
    </section>
  )
}

export default Home
