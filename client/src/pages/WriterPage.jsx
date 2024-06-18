import React, { useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import NoProfile from "../assets/profile.png";
import {
  Button,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";
import useStore from "../store";
import { formatNumber } from "../utils";
import { UserPosts, usePopularPosts } from "../hooks/post-hooks";
import { followWriter, getWriterInfo,} from "../utils/apiCalls";
import { useTranslation } from "react-i18next";

const WriterPage = () => {
  const { user } = useStore();
  const { id } = useParams();
  const { posts, numOfPages, setPage } = UserPosts({ writerId: id });
  const popular = usePopularPosts();
  const [writer, setWriter] = useState(null);
const {t} = useTranslation()



  const handlePageChange = (val) => {
    setPage(val);
  };

  const fetchWriter = async () => {
    const res = await getWriterInfo(id);
    setWriter(res);
  };


  const handleFollow = async () => {
    const res = await followWriter(id, user?.token);
    if (res.success === true) fetchWriter();
  };

  useEffect(() => {
    fetchWriter();
  }, [id]);

  if (!writer) {
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-lg text-slate-500">{t("No Writer Found")}</span>
      </div>
    );
  }

  const followerIds = writer.followers.map((f) => f.followerId);

  return (
    <div className="px-0 2xl:px-20">
      <div className="w-full md:h-60 flex flex-col gap-5 items-center md:flex-row bg-black dark:bg-gradient-to-r from-[#020b19] via-[#071b3e] to-[#020b19]  mt-5 mb-10 rounded-md p-5 md:px-20">
        <img
          src={writer?.image || NoProfile}
          alt="Writer"
          className="w-48 h-48 rounded-full border-4 border-slate-400 object-cover"
        />
        <div className="w-full h-full flex flex-col gap-y-5 md:gap-y-8  items-center justify-center">
          <h2 className="text-white text-4xl 2xl:text-5xl font-bold">
            {writer?.name}
          </h2>

          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <p className="text-gray-300 text-2xl font-semibold">
                {formatNumber(writer?.followers?.length ?? 0)}
              </p>
              <span className="text-gray-500">{t("Followers")}</span>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-gray-300 text-2xl font-semibold">
                {formatNumber(posts?.length ?? 0)}
              </p>
              <span className="text-gray-500">{t("Posts")}</span>
            </div>
          </div>

          {user?.token && (
            <div>
              {!followerIds?.includes(user?.user?._id) ? (
                <Button
                  label="Follow"
                  onClick={() => handleFollow()}
                  styles="text-slate-800 text-semibold md:-mt-4 px-6 py-1 rounded-full bg-white"
                />
              ) : (
                <div className="flex items-center justify-center gap-2 text-white text-semibold md:-mt-4 px-6 py-1 rounded-full border">
                  <span>{t("Following")}</span>
                  <FaUserCheck />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">
        {/* LEFT */}
        <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
          {posts?.length === 0 ? (
            <div className="w-full h-full py-8 flex  justify-center">
              <span className="text-lg text-slate-500">{t("No Post Available")}</span>
            </div>
          ) : (
            <>
              {posts?.map((post, index) => (
                <Card key={post?._id + index} post={post} />
              ))}

              <div className="w-full flex items-cemter justify-center">
                <Pagination
                  totalPages={numOfPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}

        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex flex-col gap-y-12">
          {/* POPULAR POSTS */}
          <PopularPosts posts={popular?.posts} />

          {/* POPULAR WRITERS */}
          <PopularWriters data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default WriterPage;
