import React from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import { formatNumber } from "../utils";
import {useTranslation} from "react-i18next"


const PopularWriters = ({ data }) => {
  const { t } =useTranslation()
  return (
    <div className='w-full ring-1 ring-gray-100 rounded-lg shadow-inner p-3 dark:bg-gray-800 dark:ring-black hover:bg-gray-100 duration-700 dark:cursor-pointer dark:hover:ring-blue-700 gap-6 flex flex-col'>
      <p className='text-xl font-bold -mb-3 text-gray-600 dark:text-slate-500 '>
        {t("Popular Writers")}
      </p>
      {data?.map((el, id) => (
        <Link
          to={`/writer/${el?._id}`}
          key={el?._id + id}
          className='flex gap-2 items-center ring-1 ring-gray-100 shadow-md dark:ring-gray-700 hover:bg-white dark:hover:bg-blue-100 duration-700 rounded-md p-2'
        >
          <img
            src={el?.image || Profile}
            alt={el?.name}
            className='w-12 h-12 rounded-md object-cover'
          />
          <div className='flex flex-col gap-1'>
            <span className='text-base font-semibold text-slate-800 dark:text-slate-500'>
              {el?.name}
            </span>
            <span className='text-rose-800 font-medium'>
              {formatNumber(el?.followers)}{" "}
              <span className='text-gray-600'>Folloers</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularWriters;
