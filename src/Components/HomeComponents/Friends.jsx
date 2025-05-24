import React, { useContext, useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  set,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../../Skeleton/UserSkeleton";
import lib from "../../lib/lib.js";
import moment from "moment";
import Alert from "../CommonComponent/Alert.jsx";
import { FriendAction } from "../../features/slices/friendSlice.js";
import { useDispatch } from "react-redux";
const Friends = ({ showButton = true }) => {
  const dispatch = useDispatch();
  const [arrLength, setarrLength] = useState(10);
  const [loading, setloading] = useState(false);
  const [FRList, setFRList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const fetchData = () => {
      // setloading(true);
      const UserRef = ref(db, "friends/");
      onValue(UserRef, (snapshot) => {
        const FRblanklist = [];
        snapshot.forEach((item) => {
          if (auth?.currentUser?.uid !== item.val().senderUid)
            FRblanklist.push({ ...item.val(), FriendKey: item.key });
        });
        setFRList(FRblanklist);
        setloading(false);
      });
    };
    fetchData();
    //clean up
    return () => {
      const UserRef = ref(db, "users/");
      off(UserRef);
    };
  }, []);

  // handleBlock funtion implement
  const handleBlock = (frd) => {
    const check = confirm("are you Sure");

    if (!check) {
      return;
    }

    set(push(ref(db, "block/")), {
      ...frd,
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        const frdRef = ref(db, `friends/${frd.FriendKey}`);
        remove(frdRef);
        lib.SucessToast("blocked succesfull");
      })
      .catch((err) => {
        console.error("error from handleBlock funtion", err);
      });
  };

  // handleFriendInfo
  const handleFriendInfo = (frdInfo) => {
    if (auth.currentUser.uid === frdInfo.reciverUid) {
      let userObj = {
        userUid: frdInfo.senderUid,
        userName: frdInfo.senderUsername,
        userEmail: frdInfo.senderEmail,
        userProfilePicture: frdInfo.senderprofile_picture,
      };
      dispatch(FriendAction(userObj));
    } else {
      let userObj = {
        userUid: frdInfo.reciverUid,
        userName: frdInfo.reciverUsername,
        userEmail: frdInfo.reciverEmail,
        userProfilePicture: frdInfo.reciverprofile_picture,
      };
      dispatch(FriendAction(userObj));
    }
  };
  return (
    <div>
      {/* list part */}
      <div className="shadow-2xs mt-3">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Friends
            <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
              {arrLength}
            </span>
          </h1>

          <span>
            <HiDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[38dvh] scrollable-content">
          {FRList?.length == 0 ? (
            <Alert />
          ) : (
            FRList?.map((friend, index) => (
              <div
                onClick={() => handleFriendInfo(friend)}
                className={
                  arrLength - 1 === index
                    ? "flex items-center  justify-between mt-3   pb-2"
                    : "flex items-center cursor-pointer justify-between mt-3 border-b border-b-gray-800 pb-2"
                }>
                <div className="w-[50px] h-[50px] rounded-full">
                  <picture>
                    <img
                      src={friend.senderprofile_picture || Avatar}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>

                <div className="">
                  <h1 className="text-bold">{friend.senderUsername}</h1>
                  <p className="text-sm font-normal font-sans">
                    Hi Guys, Wassup!
                  </p>
                </div>
                <p>{moment(friend.createdAt).fromNow()}</p>
                {showButton && (
                  <button
                    type="button"
                    onClick={() => handleBlock(friend)}
                    class="focus:outline-none cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Block
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* list part */}
    </div>
  );
};

export default Friends;
