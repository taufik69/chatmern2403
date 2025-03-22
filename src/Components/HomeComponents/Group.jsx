import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/homeAssets/avatar.gif";
const  Group = () => {
  const [arrLength, setarrLength] = useState(10);
  return (
    <div>
      {/* list part */}
      <div className="shadow-2xs mt-3">
        <div className="flex items-center justify-between">
          <h1 className="relative">
          Group 
            <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
              {arrLength}
            </span>
          </h1>

          <span>
            <HiDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[38dvh] scrollable-content">
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
             <p>
             Today, 8:56pm
             </p>
            </div>
          ))}
        </div>
      </div>
      {/* list part */}
    </div>
  );
};

export default Group;


