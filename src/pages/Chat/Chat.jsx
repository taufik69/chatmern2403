import React, { useEffect, useRef, useState } from "react";
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
import Modal from 'react-modal';
import lib from "../../lib/lib";
import { uploadCloudinaryFile } from "../../utils/cloudinary.utils";
import ImageLayout from "../../Components/CommonComponent/ImageLayout";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%'
  },
};
const Chat = () => {
  const [msg, setmsg] = useState("");
  const db = getDatabase();
  const auth = getAuth();
  const [emojiOpen, setemojiOpen] = useState(false);
  const [allMsg, setAllmsg] = useState(JSON.parse(localStorage.getItem('nesmsg')));
  const [loading, setloading] = useState(false);
  const { value: user } = useSelector((store) => store.friend);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [fieldImage, setFieldImage] = useState([])
  const inputRef = useRef();
  const [uploadImageLoading, setuploadImageLoading] = useState(false)
  const [remove, setremove] = useState(false);
  const [selectedMsg, setselectedMsg] = useState(null)
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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


  // handleUploadImage
  const handleUploadImage = async () => {
    setuploadImageLoading(true)
    try {
      // try to upload
      const allImage = Array.from(fieldImage[0])
      const allSecured_url = allImage.map(async (singleImage) => {
        const formData = new FormData();
        formData.append("file", singleImage);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const url = await uploadCloudinaryFile(formData)
        return url
      })

      const url = await Promise.all(allSecured_url)


      // now store the image on firebase
      await push(ref(db, "singlemsg"), {
        whoSendMsgUid: auth.currentUser.uid,
        whoSendMsgusername: auth.currentUser.displayName,
        whoSendMsgEmail: auth.currentUser.email,
        whoSendMsgProfile_picture: auth.currentUser.photoURL,
        whoRecivedMsgUid: user.userUid,
        whoRecivedMsgUserName: user.userName,
        whoRecivedMsgEmail: user.userEmail,
        whoRecivedMsgProfilePicture: user.userProfilePicture,
        message: url,
        createdAt: lib.getTimeNow(),
      });

    } catch (error) {
      console.error('failed to upload image on cloudinary and firebase', error);
    } finally {
      setuploadImageLoading(false)
      closeModal();
      if (inputRef.current) {
        inputRef.current.value = null
      }
    }
  }

  // handleSofDelte
  const handleSofDelte = (msgKey) => {
    setAllmsg((prev) => {
      const newmsg = prev.filter((singlemsg) => singlemsg.msgKey != msgKey)
      localStorage.setItem('nesmsg', JSON.stringify(newmsg))
      return newmsg
    }
    )
  }




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
              if (auth.currentUser.uid == msg.whoSendMsgUid && msg.whoRecivedMsgUid === user.userUid) {
                return (
                  Array.isArray(msg.message) ? (
                    <div key={msg.msgKey} className="self-end">
                      <div className="flex flex-col items-end mt-7">
                        <div className="">
                          <ImageLayout imageSrc={msg.message} />
                        </div>
                        <p>Today, 2:02pm</p>
                      </div>
                    </div>
                  ) : (
                    <div key={msg.msgKey} className="self-end">
                      <div className="flex flex-col items-end mt-7">
                        <div className="flex gap-x-4 items-center">
                          <span onClick={() => {
                            setselectedMsg(msg.msgKey)
                            setremove(!remove)
                          }} className="px-2 py-1 bg-gray-400  rounded-3xl ">:</span>
                          {/* button Group */}
                          {remove && selectedMsg == msg.msgKey && (
                            <div>
                              <button class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleSofDelte(msg.msgKey)}>Delete Soft</button>
                              <button class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Delete Hard</button>
                            </div>
                          )}

                          <div className="px-5 w-full text-wrap py-3 bg-blue-300 rounded-3xl">

                            <h2>{msg.message}</h2>
                          </div>
                        </div>
                        <p>Today, 2:02pm</p>
                      </div>
                    </div>
                  )



                )

                //   reciver jokhon sender, ami jokhon receiver
              } else if (msg.whoSendMsgUid == user.userUid && msg.whoRecivedMsgUid == auth.currentUser.uid) {
                return (
                  Array.isArray(msg.message) ? (<div key={msg.msgKey} className="self-start">
                    <div className="flex flex-col items-start mt-4">
                      <div className="">
                        <ImageLayout imageSrc={msg.message} />
                      </div>
                      <p>Today, 2:02pm</p>
                    </div>
                  </div>) : (<div key={msg.msgKey} className="self-start">
                    <div className="flex flex-col items-start mt-4">
                      <div className="px-5 w-full text-wrap py-3 bg-gray-300 rounded-3xl">
                        <h2>{msg.message}</h2>
                      </div>
                      <p>Today, 2:02pm</p>
                    </div>
                  </div>)

                )
              }
              // Onno message gulo show korbo na
              return null
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
                <span className="text-xl cursor-pointer" onClick={() => openModal()}>
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

        {/* modal component */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="imageUpload Modal"
        >



          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" multiple onChange={(e) => setFieldImage([e.target.files])} ref={inputRef} />
            </label>
          </div>


          <div className="flex justify-center items-center  mt-10">
            {/* button group */}
            <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => closeModal()}>Cancle</button>
            {uploadImageLoading ? (
              <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >Upload ....</button>) : (
              <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={handleUploadImage}
              >Upload</button>)}

            {/* button group */}
          </div>

        </Modal>
        {/* modal component */}
      </div>
    </div >
  );
};
export default React.memo(Chat);
