import {Link , NavLink ,useNavigate  , useLocation} from 'react-router-dom';
import SearchBar from '../Header/SearchBar';
import Logo from '../../Logo';
import { useState , React , useEffect } from 'react';
import spBtn from '../Button/spBtn';
import Button from '../Button/button';
import setUser from "../../features/authSlice";
import {useLogout} from "../../hooks/auth.hook";
import { useSelector , useDispatch } from 'react-redux';
import { setShowUploadVideo } from '../../features/uiSlice';

import { BiLike } from "../../react-icon";
import { GoDeviceCameraVideo } from "../../react-icon";
import { RxQuestionMarkCircled } from "../../react-icon";
import { CiSettings } from "../../react-icon";
import { IconContext } from "../../react-icon";
import { IoIosCloseCircleOutline } from "../../react-icon";

function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const { mutateAsync: logout } = useLogout();

  const [sideBar, setSideBar] = useState(false);

  const handleLogout = async () => {
    const sessionStatus = await logout();
    if (sessionStatus) {
      dispatch(setUser(null));
    }
  };

  const handleUploadVideo = () => {
    navigate("/my-studio");
    dispatch(setShowUploadVideo(true));
  };

  const mobileSidebarItems = [
    {
      name: "Liked Videos",
      path: "/liked-videos",
      icon: <BiLike />,
    },
    {
      name: "My Channel",
      path: `/channel/${userData?.username}/videos`,
      icon: <GoDeviceCameraVideo />,
    },
    {
      name: "Support",
      path: "/support",
      icon: <RxQuestionMarkCircled />,
    },
    {
      name: "Settings",
      path: "/edit-profile/personal-info",
      icon: <CiSettings />,
    },
  ];

  const handleSideBar = () => {
    setSideBar((prev) => !prev);
  };

  useEffect(() => {
    setSideBar(false);
  }, [location.pathname]);

  return (
    <header className="z-[9999] sticky inset-x-0 top-0 w-full border-b border-white text-white bg-[#121212] px-4">
      <nav className="mx-auto flex max-w-7xl items-center py-2 ">
        <Link to="/" className="flex items-center w-2/12">
          <Logo className="shrink-0 sm:w-[8rem]" mobile={true} />
        </Link>

        <Search />

        <button
          onClick={handleSideBar}
          className="cursor-pointer group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden"
        >
          <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
          <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
          <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
        </button>
        <div
          className={`fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 ${
            sideBar ? "translate-x-0" : "translate-x-full"
          } flex-col border-l border-white bg-[#121212] duration-200 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none`}
        >
          <div className="relative flex w-full h-[4rem] items-center justify-end border-b border-white px-4 py-2 sm:hidden">
            <button
              onClick={handleSideBar}
              className="inline-block cursor-pointer"
            >
              <IoIosCloseCircleOutline className="w-9 h-9" />
            </button>
          </div>
          <IconContext.Provider value={{ className: "w-6 h-6" }}>
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
              {mobileSidebarItems.map((item, index) => (
                <li key={index} className="w-full">
                  <Link
                    to={item.path}
                    className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                  >
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </IconContext.Provider>
          <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
            {authStatus ? (
              <spBtn onClick={handleUploadVideo}>Upload Video</spBtn>
            ) : (
              <Button onClick={handleUploadVideo}>Upload Video</Button>
            )}

            {authStatus && userData && (
              <>
                <Button
                  className="bg-gray-500 hover:bg-slate-400"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
                  <Link
                    to={`/channel/${userData?.username}/videos`}
                    className="flex w-full gap-4 text-left sm:items-center"
                  >
                    <img
                      src={userData.avatar?.url}
                      alt={userData.username}
                      className="object-cover h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                    />
                    <div className="w-full pt-2 sm:hidden">
                      <h6 className="font-semibold">{userData.fullName}</h6>
                      <p className="text-sm text-gray-300">
                        {userData.username}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {!authStatus && (
              <>
                <Link to="/login">
                  <Button>Log in</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;