import React, { useEffect, useState, useCallback } from "react";
import useStore from "../store";
import Button from "./Button";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import { Toaster, toast } from "sonner";
import { deletePostComments, getPostComments, postComments } from "../utils/apiCalls";
import { useTranslation } from "react-i18next";


const PostComments = ({ postId }) => {
  const { user } = useStore();
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await getPostComments(postId);
      console.log("Fetched comments: ", res);
      setComments(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }, [postId]);

  const handleDeleteComment = async (id) => {
    try {
      const res = await deletePostComments(id, postId, user?.token);
      console.log("Delete response: ", res);
      if (res?.success) {
        fetchComments();
        toast.success("Comment deleted successfully!");
      } else {
        toast.error("Failed to delete the comment.");
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const res = await postComments(postId, user?.token, { desc });
      console.log("Post response: ", res);
      if (res?.success) {
        setDesc("");
        fetchComments(); // Fetch comments after posting
        toast.success("Comment posted successfully!");
      } else {
        toast.error("Failed to post the comment.");
      }
    } catch (error) {
      console.error("Failed to post comment", error);
      toast.error("Something went wrong, please try again.");
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    
    <div className='w-full py-10'>
      <p className='text-lg text-slate-700 dark:text-slate-500'>
        {t("Post Comments")}
      </p>

      {user?.token ? (
        <form className='flex flex-col mb-6' onSubmit={handlePostComment}>
          <textarea
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            required
            placeholder={t('Add a comment...')}
            className='mt-2 bg-transparent w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-blue-600 rounded'
          ></textarea>

          <div className='w-full flex justify-center mt-2'>
            <Button
              type="submit"
              label={t('Submit')}
              styles='bg-blue-600 text-white py-2 px-5 rounded'
            />
          </div>
        </form>
      ) : (
        <Link to='/signin' className='flex flex-col py-10'>
          <Button
            label='Sign in to comment'
            styles='w-fit flex items-center justify-center bg-black dark:bg-gray-800 text-white dark:text-gray-500 hover:bg-gray-700 px-4 py-1.5 rounded-md ring-1 ring-gray-100 dark:ring-gray-700 dark:hover:bg-gray-700 duration-700'
          />
        </Link>
      )}

      <div className='w-full h-full flex flex-col gap-10 2xl:gap-y-14 px-2'>
        {comments.length === 0 ? (
          <span className='text-base text-slate-600'>
            {t("No Comment, be the first to comment")}
          </span>
        ) : (
          comments.map((el) => (
            <div key={el?._id} className='w-full flex gap-4 items-start'>
              <img
                src={el?.user?.image || Profile}
                alt={el?.user?.name}
                className='w-10 h-10 rounded-full'
              />
              <div className='w-full -mt-2'>
                <div className='w-full flex items-center gap-2'>
                  <p className='text-slate-700 dark:text-gray-400 font-medium'>
                    {el?.user?.name}
                  </p>
                  <span className='text-slate-700 text-xs italic'>
                    {new Date(el?.createdAt).toDateString()}
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <span className='text-sm'>{el?.desc}</span>

                  {user?.user?._id === el?.user?._id && (
                    <span
                      className='text-base text-red-600 cursor-pointer'
                      onClick={() => handleDeleteComment(el?._id)}
                    >
                     {t(" Delete")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Toaster richColors />
    </div>
  );
};

export default PostComments;
