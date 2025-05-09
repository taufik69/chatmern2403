import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlus } from "react-icons/fa";
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
import Alert from "../CommonComponent/Alert";
import moment from "moment";
import lib from "../../lib/lib";
const BlockUser = () => {
  const [arrLength, setarrLength] = useState(10);
  const [loading, setloading] = useState(false);
  const [blockedUser, setblockedUser] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      const UserRef = ref(db, "block/");
      onValue(UserRef, (snapshot) => {
        const blockBlanklist = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid !== item.val().senderUid)
            blockBlanklist.push({ ...item.val(), BlockKey: item.key });
        });
        setblockedUser(blockBlanklist);
        setloading(false);
      });
    };
    fetchData();
    //clean up
    return () => {
      const UserRef = ref(db, "block/");
      off(UserRef);
    };
  }, []);

  if (loading) {
    return <UserSkeleton />;
  }

  // handleUnblock
  const handleUnblock = (blockUserInfo = {}) => {
    set(push(ref(db, "friends/")), {
      senderUid: blockUserInfo.senderUid,
      senderEmail: blockUserInfo.senderEmail,
      senderprofile_picture: blockUserInfo.senderprofile_picture,
      senderUserKey: blockUserInfo.senderUserKey,
      senderUsername: blockUserInfo.senderUsername,
      reciverUid: blockUserInfo.reciverUid,
      reciverEmail: blockUserInfo.reciverEmail,
      reciverprofile_picture: blockUserInfo.reciverprofile_picture,
      reciverUserKey: blockUserInfo.reciverUserKey,
      reciverUsername: blockUserInfo.reciverUsername,
      FRKey: blockUserInfo.FRKey,
      createdAt: lib.getTimeNow(),
    }).then(() => {
      const blockDbref = ref(db, `block/${blockUserInfo.BlockKey}`);
      remove(blockDbref);
    });
  };

  return (
    <div>
      {/* list part */}
      <div className="shadow-2xs mt-3">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            User List
            <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
              {arrLength}
            </span>
          </h1>

          <span>
            <HiDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[38dvh] scrollable-content">
          {blockedUser?.length == 0 ? (
            <Alert blockmsg={"block list Empty"} />
          ) : (
            blockedUser?.map((blockUser, index) => (
              <div
                className={
                  arrLength - 1 === index
                    ? "flex items-center justify-between mt-3   pb-2"
                    : "flex items-center justify-between mt-3 border-b border-b-gray-800 pb-2"
                }
              >
                <div className="w-[50px] h-[50px] rounded-full">
                  <picture>
                    <img
                      src={blockUser?.senderprofile_picture || Avatar}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>

                <div className="">
                  <h1 className="text-bold">{blockUser.senderUsername}</h1>
                  <p className="text-sm font-normal font-sans">
                    {moment(blockUser.createdAt).fromNow()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleUnblock(blockUser)}
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
                >
                  unBlock
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {/* list part */}
    </div>
  );
};

export default BlockUser;
