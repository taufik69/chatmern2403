import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../../Skeleton/UserSkeleton";
const UserList = () => {
  const [arrLength, setarrLength] = useState(10);
  const [userlist, setuserlist] = useState([]);
  const [loading, setloading] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        const userblanklist = [];
        snapshot.forEach((item) => {
          userblanklist.push({ ...item.val(), userKey: item.key });
        });
        setuserlist(userblanklist);
        setloading(false);
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-4">
        <UserSkeleton />
      </div>
    );
  }

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
          {userlist?.map((item, index) => (
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
                    src={item.profile_picture}
                    alt={Avatar}
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>

              <div className="">
                <h1 className="text-bold">{item.username}</h1>
                <p className="text-sm font-normal font-sans">Today, 8:56pm</p>
              </div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* list part */}
    </div>
  );
};

export default UserList;
