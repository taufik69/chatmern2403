import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
const Grouplist = () => {
  const [arrLength, setarrLength] = useState(10);
  return (
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
            <HiDotsVertical />
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
  );
};

export default Grouplist;
