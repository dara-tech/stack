import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Logo = ({ type }) => {
  const {t} =useTranslation();
  return (
    <div className="">
      <Link
        to="/"
        className={`flex text-2xl font-semibold dark:text-white  ${
          type && "text-white text-4xl"
        }`}
      >
        <span className={`${type && "text-5xl font-bold"}`}>
          {t("Dara")}<span className="px-2 py-1 text-2xl text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gradient-to-r dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">{t("Blog")}</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
