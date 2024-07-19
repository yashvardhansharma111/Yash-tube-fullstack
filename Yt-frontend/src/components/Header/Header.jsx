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

  return(
  <div className='text-5xl text-blue-500'>Header</div>
  ) 

}

export default Header;