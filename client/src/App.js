import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import {
  BlogDetails,
  CategoriesPage,
  Home,
  LoginPage,
  SignupPage,
  WriterPage,
} from "./pages";
import Loading from "./components/Loading";
import { Footer, Navbar } from "./components";
import useStore from "./store";
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // Import i18n configuration

function Layout() {
  return (
    <div className='w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-28'>
      <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { theme, isLoading } = useStore();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <main className={theme}>
      <div className={`w-full min-h-screen relative dark:bg-[#020b19] bg-white`}>
  
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/category' element={<CategoriesPage />} />
            <Route path='/:slug/:id?' element={<BlogDetails />} />
            <Route path='/writer/:id' element={<WriterPage />} />
          </Route>

          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/sign-in' element={<LoginPage />} />
        </Routes>

        {isLoading && <Loading />}
      </div>
    </main>
  );
}

export default App;
