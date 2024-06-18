import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PopularPosts, PopularWriters, PostComments } from "../components";
import useStore from "../store";
import { getSinglePost } from "../utils/apiCalls";
import { usePopularPosts } from "../hooks/post-hooks";
import Spinner from "../common/Spinner.js";

const BlogDetails = () => {
  const { setIsLoading } = useStore();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const popular = usePopularPosts();
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const data = await getSinglePost(id);
      setPost(data || {});
      setIsLoading(false);
    };
    if (id) {
      fetchPost();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [id]);

  const handleIframeLoad = () => {
    setVideoLoading(false);
  };

  if (!post) return <div className='w-full h-full py-8 flex items-center justify-center'><span className='text-xl text-slate-500'>Loading...</span></div>;

  return (
    <div className='w-full  px-0 md:px-10 py-8 2xl:px-20'>
      <div className='w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center'>
        <div className='w-full  flex flex-col gap-8 '>
          <h1 className='text-3xl md:text-5xl font-bold text-slate-800 dark:text-white'>{post?.title }</h1>
         
          {post?.img && <img src={post?.img} alt={post?.title} className='rounded object-contain ring-2' />}
          {post?.video && (
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                {videoLoading && <Spinner size="md" color="primary" />}
              </div>
              <iframe
                title="Embedded Video"
                src={post?.video.replace("watch?v=", "embed/")}
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                onLoad={handleIframeLoad}
              />
            </div>
          )}
          <div className='w-full flex-3 flex-col  items-center p-4 space-y-5 gap-5'>
            <span className='flex dark:text-gray-100 font-semibold ring-1 ring-gray-200 hover:shadow-gray-400 duration-500 dark:ring-gray-700 dark:bg-gray-800 dark:hover:text-gray-100  dark:hover:shadow-gray-900  p-5 rounded-md'>{post?.cat}</span>
            <span className=' flex text-base p-5 dark:text-gray-100 rounded-md shadow-md gap-3 ring-1 ring-gray-200  hover:shadow-gray-400 duration-500 dark:ring-gray-700 dark:bg-gray-800   dark:hover:shadow-gray-900 '>
              {post?.views?.length}
              <span className='text-bese font-medium flex text-red-900 dark:text-gray-100  hover:shadow-gray-400 duration-500 dark:ring-gray-700 dark:bg-gray-800 dark:hover:text-gray-100  dark:hover:shadow-gray-900 '>Views</span>
            </span>
            <Link to={`/writer/${post?.user?._id}`} className='p-2 flex rounded-md shadow-md gap-3 ring-1 ring-gray-200 hover:shadow-gray-400 duration-500 dark:ring-gray-700 dark:bg-gray-800 dark:hover:text-gray-100  dark:hover:shadow-gray-900'>
              <img src={post?.user?.image} alt={post?.user?.name} className='h-12 w-12 rounded-md object-cover ring-2' />
              <div className=''>
                <p className='text-slate-800 dark:text-gray-100 font-medium'>{post?.user?.name}</p>
                <span className='text-slate-600'>{new Date(post?.createdAt).toDateString()}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-x-28 mt-10'>
        {/* LEFT */}
        <div className='w-full md:w-2/3 flex flex-col text-black dark:text-gray-500 '>
          {post?.desc&& (
            <Markdown options={{ wrapper: "article" }} className=''>
              {post?.desc }
            </Markdown>
          )}
          {/* COMMENTS SECTION */}
          <div className='w-full'>{<PostComments postId={id} />}</div>
        </div>
        {/* RIGHT */}
        <div className='w-full md:w-1/4 flex flex-col gap-y-12'>
          {/* POPULAR POSTS */}
          <PopularPosts posts={popular?.posts} />
          {/* POPULAR WRITERS */}
          <PopularWriters data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
