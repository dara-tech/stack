import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/dummyData";
import { UserPosts, usePopularPosts } from "../hooks/post-hooks";
import { PopularPosts, Banner, Pagination, PopularWriters, Card } from "../components";
import {useTranslation} from "react-i18next"

const Home = () => {
  const {t} = useTranslation()
  const { posts, numOfPages, setPage, setCategory } = UserPosts({ writerId: "" });
  const popular = usePopularPosts();

  const randomIndex = Math.floor(Math.random() * posts.length);
  const handlePageChange = (val) => {
    setPage(val);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1); // Reset page to 1 when category changes
  };

  if (posts.length < 1)
    return (
      <div className='w-full h-full py-8 flex items-center justify-center'>
        <span className='text-lg text-slate-500'>{t("No Post Available")}</span>
      </div>
    );

  return (
    <div className='py-10 2xl:py-5'>
      <Banner post={posts[randomIndex]} />

      <div className='px-0 lg:pl-20 2xl:px-20 '>
        {/* Categories */}
        <div className='mt-6 md:mt-0'>
          <p className='text-2xl font-semibold text-gray-600 dark:text-white'>
            {t("Popular Categories")}
          </p>
          <div className='w-full flex flex-wrap py-10 gap-8'>
            {CATEGORIES.map((cat) => (
              <div
                onClick={() => handleCategoryChange(cat.label)}
                className={`flex hover:bg-black duration-700 items-center justify-center gap-3 ${cat.color} text-white font-semibold text-base px-4 py-2 rounded-md cursor-pointer dark:bg-gray-800 hover:shadow-md dark:hover:shadow-green-700 duration-500`}
                key={cat.label}
              >
                {cat?.icon}
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Post */}
        <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-20'>
          {/* LEFT */}
          <div className='w-full md:w-2/3 flex flex-col gap-y-10 md:gap-y-10'>
            {posts.map((post, index) => (
              <Card key={post?._id} post={post} index={index} />
            ))}

            <div className='w-full flex items-center justify-center'>
              <Pagination
                totalPages={parseInt(numOfPages)}
                currentPage={numOfPages} // Pass the currentPage prop here
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className='w-full md:w-1/4 flex flex-col gap-y-10'>
            {/* POPULAR POSTS */}
            <PopularPosts posts={popular?.posts} />
            <PopularWriters data={popular?.writers} />
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Home;
