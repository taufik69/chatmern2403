import React, { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaGears } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";

import { getAuth, signOut } from "firebase/auth";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router";
import { getDatabase, ref, onValue ,update  } from "firebase/database";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const db = getDatabase();
  const auth = getAuth();
  const [userdata, setuserdata] = useState({});
  const navigationIcon = [
    {
      id: 1,
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      path: "/message",
      icon: <TiMessages />,
    },
    {
      id: 3,
      path: "/notification",
      icon: <FiBell />,
    },
    {
      id: 4,
      path: "/settings",
      icon: <FaGears />,
    },
    {
      id: 5,
      icon: <CgLogOut />,
    },
  ];

  // handleicon funtion implement
  const handleicon = (path = "/") => {
    navigate(path);
  };

  /**
   * todo: handleUploadImage funtion
   */
  const handleUploadImage = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: "ditk0x0mr",
        uploadPreset: "mern2403",
        sources: [
          "local",
          "url",
          "camera",
          "image_search",
          "unsplash",
          "google_drive",
        ],

        googleApiKey: "AIzaSyA0lDAXtAsuSkY6mHLNyRdRCuMaSuEXc0o",
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      (error, result) => {
        if (error) {
          throw new Error("Failed to upload profile picture");
        }
        update(ref(db , `users/${userdata.userKey}`), {
          profile_picture: result?.info?.secure_url
        });
      }
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //handlelogOut
  const handlelogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log("error form logout funtion", err);
      });
  };

  // fetch the user data from user database
  useEffect(() => {
    const fetchData = () => {
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        let userblankinfo = null;
        snapshot.forEach((item) => {
          if (item.val().userUid === auth.currentUser.uid) {
            userblankinfo = { ...item.val(), userKey: item.key };
          }
        });
        setuserdata(userblankinfo);
      });
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="w-[130px] bg-green-400 rounded-3xl h-[96dvh]">
        <div className="flex justify-center ">
          <div className="w-[70px] h-[70px] mt-10 rounded-full relative cursor-pointer group">
            <picture>
              <img
                src={
                  userdata
                    ? userdata.profile_picture
                    : "https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="profilepicture"
                className=" w-full h-full object-cover rounded-full"
              />
            </picture>
            <span
              onClick={handleUploadImage}
              className="absolute  hidden group-hover:block left-1/3 top-1/2 -translate-y-1/2 text-white text-2xl"
            >
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>
        {/* navigation icon */}
        <div className="flex flex-col items-center gap-y-10 justify-center mt-12">
          <div>
            <h1 className="text-xl text-white">{userdata ? userdata.username : "Missing"} </h1>
          </div>
          {navigationIcon?.map((item, index) =>
            navigationIcon.length - 1 == index ? (
              <div
                onClick={handlelogOut}
                className={
                  location.pathname == item.path
                    ? "text-[50px]  mt-10 text-white cursor-pointer active"
                    : "text-[50px]  mt-10 text-white cursor-pointer"
                }
                key={item.id}
              >
                {item.icon}
              </div>
            ) : (
              <div
                className={
                  location.pathname == item.path
                    ? "text-[50px]  mt-10 text-red cursor-pointer active"
                    : "text-[50px]  mt-10 text-white cursor-pointer"
                }
                key={item.id}
                onClick={() => handleicon(item.path)}
              >
                {item.icon}
              </div>
            )
          )}
        </div>
        {/* navigation icon */}
      </div>
    </div>
  );
};

export default Sidebar;
