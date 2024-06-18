import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/dummyData";
import {useTranslation} from "react-i18next"

const PopularPosts = ({ posts }) => {

  const Card = ({ post }) => {
    let catColor = "";
    CATEGORIES.map((cat) => {
      if (cat.label === post?.cat) {
        catColor = cat?.color;
      }
      return null;
    });

    return (
      <div className='space-y-3 flex-1 gap-4 items-center ring-1 ring-gray-100 rounded-lg shadow-inner p-3 dark:bg-gray-800 dark:ring-black hover:bg-gray-100 duration-700 dark:cursor-pointer dark:hover:ring-blue-700'>
        <img
          src={post?.img}
          alt={post?.user?.name}
          className='h-20 w-full rounded-md ring-2 object-cover'
        />
        <div className='w-full flex flex-col gap-1'>
          <span
            className={`${catColor} w-full text-xs/4 text-gray-100 p-2 rounded-md`}
          >
            {post?.cat}
          </span>
          <Link
            to={`/${post?.slug}/${post?._id}`}
            className='text-black dark:text-white'
          >
            {post?.title}
          </Link>
          <div className='gap-2 text-sm py-2'>
            <span className='font-medium'>{post?.user?.name}</span>
            <span className='flex text-gray-500 ring-1 ring-gray-100 p-2 rounded-md dark:ring-gray-10 shadow-md dark:text-gray-600 '>
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const { t } =useTranslation()
  return (
    <div className='w-full flex flex-col gap-8'>
      <p className='text-xl font-bold -mb-3 text-gray-600 dark:text-slate-500'>
        {t("Popular Articles")}
      </p>
      {posts?.map((post, id) => (
        <Card post={post} key={id} />
      ))}
    </div>
  );
};

export default PopularPosts;
