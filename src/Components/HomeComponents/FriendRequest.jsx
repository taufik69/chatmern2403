import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { getDatabase, ref, onValue, off, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../../Skeleton/UserSkeleton";
import lib from "../../lib/lib.js"
import moment from "moment";
const FriendRequest = () => {
  const [arrLength, setarrLength] = useState(10);
  const [loading, setloading] = useState(false);
  const [FRrequestList, setFRrequestList] = useState([])
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const fetchData = () => {
      // setloading(true);
      const UserRef = ref(db, "friendRequest/");
      onValue(UserRef, (snapshot) => {
        const FRblanklist = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid == item.val().reciverUid) {
            FRblanklist.push({ ...item.val(), FRKey: item.key })
          }
        });
        setFRrequestList(FRblanklist);
        setloading(false);
      });
    };
    fetchData();
    //clean up 
    return () => {
      const UserRef = ref(db, "users/");
      off(UserRef)
    }
  }, []);
  console.log(FRrequestList);



  return (
    <div>
      {/* list part */}
      <div className="shadow-2xs mt-3">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            Friend Request
            <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
              {arrLength}
            </span>
          </h1>

          <span>
            <HiDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[38dvh] scrollable-content">
          {FRrequestList?.map((item, index) => (
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
                    src={item.senderprofile_picture
                      || Avatar}
                    alt={Avatar}
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>

              <div className="">
                <h1 className="text-bold">{item.senderUsername}</h1>
                <p className="text-sm font-normal font-sans">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* list part */}
    </div>
  );
};

export default FriendRequest;


