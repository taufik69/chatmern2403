import React, { use, useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
import Modal from "react-modal";
import lib from "../../lib/lib";
import { getAuth } from "firebase/auth";
import { closeModal, openModal } from "../../utils/modal.utils";
import { validationGroup } from "../../validation/grouplist.validation";
import { handleChange } from "../../utils/ChangeHandaler.utils";
import { uploadCloudinaryFile } from "../../utils/cloudinary.utils";
import { uploadFirebaseData } from "../../utils/uploadFirebase.utils";
import { useFetchData } from "../../hooks/fetchData";
import HomeError from "../../pages/Error/HomeError";
import GrouplistError from "../../pages/Error/GrouplistError";
const Grouplist = () => {
  const inputRef = useRef(null);
  const counterRef = useRef(0);
  const stopRef = useRef(0);
  const auth = getAuth();
  const { data, loading: isLoading, error } = useFetchData("Grouplist/");
  const [arrLength, setarrLength] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupError, setGroupError] = useState({});
  const [loading, setloading] = useState(false);
  const [count, setcount] = useState(0);

  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupTagName: "",
    groupImage: "",
  });

  // hanldeCreateGroup
  const hanldeCreateGroup = async () => {
    const error = validationGroup(groupInfo, setGroupError);
    if (!error) return;
    // next process
    const formData = new FormData();
    formData.append("file", groupInfo.groupImage);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    setloading(true);
    try {
      const Url = await uploadCloudinaryFile(formData);
      await uploadFirebaseData("Grouplist/", {
        adminUid: auth.currentUser.uid,
        adminName: auth.currentUser.displayName,
        adminEmail: auth.currentUser.email,
        adminPhoto: auth.currentUser.photoURL,
        groupName: groupInfo.groupName,
        groupTagName: groupInfo.groupTagName,
        groupImage: Url,
      });
    } catch (error) {
      console.log("error ", error);
    } finally {
      setloading(false);
      setGroupInfo({
        groupName: "",
        groupTagName: "",
        groupImage: "",
      });
      setGroupError({});
      if (inputRef.current) {
        inputRef.current.value = null;
      }
      closeModal(setIsOpen);
    }
  };

  if (error) {
    return (
      <HomeError>
        <GrouplistError>
          <a class="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary">
            Go To BASa {count}
          </a>
        </GrouplistError>
      </HomeError>
    );
  }
  console.log("data", data);

  return (
    <>
      <div>
        <div class="relative">
          <div className="p-2 ">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Search ..."
            required
          />
        </div>
        {/* list part */}
        <div className=" shadow-2xs mt-3">
          <div className="flex items-center justify-between">
            <h1 className="relative">
              Groups List{" "}
              <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                {arrLength}
              </span>
            </h1>

            <span>
              <button
                type="button"
                onClick={() => openModal(setIsOpen)}
                class="focus:outline-none text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
              >
                Create Group
              </button>
            </span>
          </div>
          <div className="overflow-y-scroll h-[35dvh] scrollable-content">
            {[...new Array(arrLength)].map((_, index) => (
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
                      src={Avatar}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>

                <div className="">
                  <h1 className="text-bold">Friends Reunion</h1>
                  <p className="text-sm font-normal font-sans">
                    Hi Guys, Wassup!
                  </p>
                </div>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* list part */}
      </div>
      {/* modal part */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={lib.modalCustomStyle()}
        >
          <button
            type="button"
            onClick={() => closeModal(setIsOpen)}
            className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            close
          </button>

          <div class="mt-10 w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="mb-6">
              <label
                for="success"
                class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
              >
                Group Name
              </label>
              <input
                type="text"
                onChange={(event) =>
                  handleChange(event, setGroupInfo, setGroupError)
                }
                value={groupInfo.groupName}
                name="groupName"
                class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="Success input"
              />

              {groupError.groupNameError && (
                <span class="mt-2 text-sm text-red-600 ">
                  {groupError.groupNameError}
                </span>
              )}
            </div>

            <div class="mb-6">
              <label
                for="success"
                class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
              >
                Group Tag name
              </label>
              <input
                type="text"
                onChange={(event) =>
                  handleChange(event, setGroupInfo, setGroupError)
                }
                value={groupInfo.groupTagName}
                name="groupTagName"
                class="bg-green-50 border border-red-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                placeholder="Success input"
              />
              {groupError.groupTagNameError && (
                <span class="mt-2 text-sm text-red-600 ">
                  {groupError.groupTagNameError}
                </span>
              )}
            </div>

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  {groupError.groupImageError && (
                    <span class="mt-2 text-sm text-red-600 ">
                      {groupError.groupImageError}
                    </span>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  // class="hidden"
                  ref={inputRef}
                  onChange={(event) =>
                    handleChange(event, setGroupInfo, setGroupError)
                  }
                  name="groupImage"
                />
              </label>
            </div>

            {loading ? (
              <button
                type="button"
                class=" w-full mt-4 cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                uploading....
              </button>
            ) : (
              <button
                type="button"
                onClick={hanldeCreateGroup}
                class=" w-full mt-4 cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                upload
              </button>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Grouplist;
