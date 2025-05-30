import React, { useEffect, useState } from "react";
import Group from "../../Components/HomeComponents/Group";
import Friends from "../../Components/HomeComponents/Friends";
import { HiDotsVertical } from "react-icons/hi";
import { useContext } from "react";
import { countContext } from "../../context/CountContext";
import { FaCameraRetro, FaRegSmile, FaTelegram } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

import lib from "../../lib/lib";

const Chat = () => {
  const [msg, setmsg] = useState("");
  const db = getDatabase();
  const auth = getAuth();
  const [emojiOpen, setemojiOpen] = useState(false);
  const [allMsg, setAllmsg] = useState([]);
  const [loading, setloading] = useState(false);
  const { value: user } = useSelector((store) => store.friend);

  useEffect(() => {
    const fetchSingleMsg = async () => {
      const dbref = ref(db, "singlemsg");
      onValue(dbref, (snapshot) => {
        let msgArr = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid == item.val().whoSendMsgUid ||
            auth.currentUser.uid == item.val().whoRecivedMsgUid
          )
            msgArr.push({ ...item.val(), msgKey: item.key });
        });
        setAllmsg(msgArr);
      });
    };
    fetchSingleMsg();
  }, []);
  // handleEmoji
  const handleEmoji = ({ emoji }) => {
    setmsg((prev) => prev + emoji);
  };

  //sendMsg
  const sendMsg = async () => {
    setloading(true);
    try {
      push(ref(db, "singlemsg"), {
        whoSendMsgUid: auth.currentUser.uid,
        whoSendMsgusername: auth.currentUser.displayName,
        whoSendMsgEmail: auth.currentUser.email,
        whoSendMsgProfile_picture: auth.currentUser.photoURL,
        whoRecivedMsgUid: user.userUid,
        whoRecivedMsgUserName: user.userName,
        whoRecivedMsgEmail: user.userEmail,
        whoRecivedMsgProfilePicture: user.userProfilePicture,
        message: msg,
        createdAt: lib.getTimeNow(),
      });
    } catch (error) {
      console.error("error from ", error);
    } finally {
      setmsg("");
      setemojiOpen(false);
      setloading(false);
    }
  };

  console.log(allMsg);

  return (
    <div className="w-full bg-amber-200 h-[95dvh] ">
      <div className="flex h-full relative">
        <div className="w-[40%] bg-blue-300 h-full">
          <Group />
          <Friends showButton={false} />
        </div>
        <div className="w-[60%] bg-green-300 h-full p-7 ">
          {/* chat top part */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <div className="w-[70px] h-[70px] rounded-full">
                <picture>
                  <img
                    src={user.userProfilePicture}
                    alt="profile pic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>
              <div>
                <h1>{user.userName} </h1>
                <span>{navigator.onLine ? "Online" : "offline"}</span>
              </div>
            </div>
            <span>
              <HiDotsVertical />
            </span>
          </div>
          {/* chat top part */}
          {/* chat view */}
          <hr className="mt-4" />

          <div className="flex flex-col overflow-y-scroll h-[70vh]">
            {allMsg?.map((msg) => {
              //ami  sender, user receiver
              if (
                auth.currentUser.uid === msg.whoSendMsgUid &&
                msg.whoRecivedMsgUid === user.userUid
              ) {
                return (
                  <div key={msg.msgKey} className="self-end">
                    <div className="flex flex-col items-end mt-7">
                      <div className="px-5 w-full text-wrap py-3 bg-blue-300 rounded-3xl">
                        <h2>{msg.message}</h2>
                      </div>
                      <p>Today, 2:02pm</p>
                    </div>
                  </div>
                );
              }
              // User sender, ami receiver
              else if (
                msg.whoSendMsgUid === user.userUid &&
                msg.whoRecivedMsgUid === auth.currentUser.uid
              ) {
                return (
                  <div key={msg.msgKey} className="self-start">
                    <div className="flex flex-col items-start mt-4">
                      <div className="px-5 w-full text-wrap py-3 bg-gray-300 rounded-3xl">
                        <h2>{msg.message}</h2>
                      </div>
                      <p>Today, 2:02pm</p>
                    </div>
                  </div>
                );
              }
              // Onno message gulo show korbo na
              return null;
            })}
          </div>
          {/* chat view */}
          <hr className="mt-4" />
          {/* send ui */}
          <div className="flex gap-x-6 items-center mt-4 relative">
            <input
              type="text"
              placeholder="send msg .."
              id="sendInput"
              name="sendInput"
              onChange={(e) => setmsg(e.target.value)}
              value={msg}
              className="py-3 px-2 bg-gray-200 w-full rounded-2xl  border"
            />
            {/* camera & emoji */}
            <div className="absolute right-[12%]">
              <div className="flex items-center gap-x-4">
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => setemojiOpen(!emojiOpen)}
                >
                  <FaRegSmile />
                </span>
                <span className="text-xl cursor-pointer">
                  <FaCameraRetro />
                </span>
              </div>
            </div>
            {/* camera & emoji */}
            {loading ? (
              <span className="text-5xl animate-spin">
                <FaTelegram />
              </span>
            ) : (
              <span className="text-5xl" onClick={sendMsg}>
                <FaTelegram />
              </span>
            )}
          </div>
          {/* send ui */}
        </div>

        {/* emoji picker component  */}
        <div className="absolute right-[5%] bottom-[10%]">
          <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
        </div>
        {/* emoji picker component  */}
      </div>
    </div>
  );
};
export default React.memo(Chat);
