import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OTPVerification from "./pages/OTPVerification";
import StartPage from "./pages/StartPage";
import useStore from "./store/index";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Followers from "./pages/Followers";
import Contents from "./pages/Content";
import WritePost from "./pages/WritePost";
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // Import i18n configuration

function Layout() {
  const { user } = useStore((state) => state);
  const location = useLocation();

  return user?.token ? (
    <div className='w-full h-screen'>
      <Navbar />
      <div className='w-full h-full flex pt-20  '>
        <div className='hidden lg:flex '>
          <Sidebar />
        </div>

        <div className='w-full flex-1 px-8 py-4 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <main className='w-full min-h-screen'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/followers' element={<Followers />} />
          <Route path='/contents' element={<Contents />} />
          <Route path='/write/:postId?' element={<WritePost />} />
        </Route>

        <Route path='/auth' element={<StartPage />} />
        <Route path='/otp-verification' element={<OTPVerification />} />
      </Routes>
    </main>
  );
}

export default App;
