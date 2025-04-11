import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, off, push  ,set} from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../../Skeleton/UserSkeleton";
const UserList = () => {

  const [userlist, setuserlist] = useState([]);
  const [loading, setloading] = useState(false);
  const [Loggeduser , setLoggedUser] = useState({})
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      const UserRef = ref(db, "users/");
     onValue(UserRef, (snapshot) => {
        const userblanklist = [];
        snapshot.forEach((item) => {
          if(item.val().userUid !== auth.currentUser.uid){
            userblanklist.push({ ...item.val(), userKey: item.key });
          }else{
            let user = Object.assign({ ...item.val(), userKey: item.key })
            setLoggedUser(user)
        
          }
        });
        setuserlist(userblanklist);
        setloading(false);
      });
    };
    fetchData();
    //clean up 
    return ()=> {
      const UserRef = ref(db, "users/");
      off(UserRef)
    }
  }, []);

console.log(Loggeduser);

  
  if (loading) {
    return (
      <div className="px-4 py-4">
        <UserSkeleton />
      </div>
    );
  }

  /**
   * todo : handleFriendRequest
   * @param ({item})
   * return void
   */

  const handleFriendRequest = (item = {})=> {
    set((push(ref(db, 'friendRequest/' ))), {
      senderUid : Loggeduser.userUid,
      senderEmail : Loggeduser.email,
      senderprofile_picture: Loggeduser.profile_picture,
      senderUserKey: Loggeduser.userKey,
      senderUsername: Loggeduser.username,
      reciverUid : item.userUid,
      reciverEmail : item.email,
      reciverprofile_picture: item.profile_picture,
      reciverUserKey: item.userKey,
      reciverUsername: item.username,
      
    });
    
  }



  return (
    <div>
      {/* list part */}
      <div className="shadow-2xs mt-3">
        <div className="flex items-center justify-between">
          <h1 className="relative">
            User List
            <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
              {userlist?.length}
            </span>
          </h1>

          <span>
            <HiDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[38dvh] scrollable-content">
          {userlist?.map((item, index) => (
            <div
            key={item.userUid}

              className={
                userlist?.length - 1 === index
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
              onClick={()=> handleFriendRequest(item)}
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
