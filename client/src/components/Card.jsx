import Markdown from "markdown-to-jsx";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ post, index }) => {
  return (
    <div
      key={post?._id}
      className={`w-full flex flex-col gap-5 items-center rounded ring-1 ring-gray-100 p-2 shadow-md dark:ring-gray-800 hover:bg-gray-100 hover:ring-2 duration-700 dark:hover:bg-gray-800
     md:flex-row 
        `}
      //  ${index / 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
    >
      <Link
        to={`/${post?.slug}/${post._id}`}
        className='w-full h-auto md:h-64 md:w-2/4 ring-2 rounded-md'
      >
        <img
          src={post?.img}
          alt={post?.title}
          className='object-cover w-full h-full rounded-md '
        />
      </Link>

      <div className='w-full md:w-2/4 flex flex-col gap-2 shadow-inner p-2 bg-gray-50 rounded-md dark:bg-gray-800 hover:bg-gray-200 duration-700'>
        <div className='flex gap-2'>
          <span className='text-sm text-gray-600'>
            {new Date(post?.createdAt).toDateString()}
          </span>
          <span className='text-sm text-rose-600 font-semibold'>
            {post?.cat}
          </span>
        </div>

        <h6 className='text-xl 2xl:text-3xl font-semibold text-black dark:text-white'>
          {post?.title}
        </h6>

        <div className='flex-1 overflow-hidden text-gray-600 dark:text-slate-400 text-sm text-justify'>
          <Markdown options={{ wrapper: "article" }}>
            {post?.desc?.slice(0,300) + "..."}
          </Markdown>
        </div>

        <Link
          to={`/${post?.slug}/${post._id}`}
          className='flex items-center gap-2 text-black dark:text-white'
        >
          <span className='w-fit mt-3 bg-black shadow-md text-white px-2 py-2 rounded-md font-light hover:bg-slate-800 hover:duration-500 dark:bg-gray-700 hover:dark:shadow-green-700'>Read More</span> 
        </Link>
      </div>
    </div>
  );
};

export default Card;
