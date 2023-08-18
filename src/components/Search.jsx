import React, { useState, useEffect } from "react";

import { copy, linkIcon, folder, tick } from "../assets";

const Search = () => {
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");

const fileUpload = (e) => {
  if(e.target.files){
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsText(files[i]);
        fileReader.onload = () => {
          const fileContents = fileReader.result;
          const start = fileContents.substring(0,200)
          const end = fileContents.substring(fileContents.length-200)
          const content =`${start}\n\n\n ..... \n\n\n .....\n\n\n${end}`
          const data = `${fileContents}`;
          console.log(content)
          setArticle(content)
        };
    }
  } 
}



  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/context/';
      
    const data = article
    console.log(data)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({text:data})
      })
    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();
      console.log(parsedData) // trims any trailing spaces/'\n' 
      setSummary(parsedData)
        
  }
    
}

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <textarea
            type='text'
            placeholder='Paste text here or directly upload file.'
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            onKeyDown={handleKeyDown}
            // className='url_input peer'
            rows="4" 
            cols="50"
          />
          <label htmlFor="fileUpload" className="cursor-pointer peer-focus:border-gray-700">
          <img
            src={folder}
            alt='folder-icon'
            className='absolute right-3 my-2 ml-3 w-7'
            title="Click to upload your text file!"
          />
          </label>
          <input type="file" className='display: hidden' id="fileUpload" name="files[]" multiple onChange={fileUpload} ></input>
          <button
            type='submit'
            className='absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded peer-focus:border-gray-700 peer-focus:text-gray-700 h-10 bg-lime-300'
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        {/* <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
          {summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {summary}
                </p>
              </div>
            </div>
          )
          }
      </div>
    </section>
  );
};

export default Search;
