import React from "react";
import Group from "../../Components/HomeComponents/Group";
import Friends from "../../Components/HomeComponents/Friends";
import { HiDotsVertical } from "react-icons/hi";

const Chat = () => {
  return (
    <div className="w-full bg-amber-200 h-[95dvh]">
      <div className="flex h-full">
        <div className="w-[40%] bg-blue-300 h-full">
          <Group />
          <Friends />
        </div>
        <div className="w-[60%] bg-green-300 h-full p-7 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <div className="w-[70px] h-[70px] rounded-full">
                <picture>
                  <img
                    src="https://images.pexels.com/photos/30970419/pexels-photo-30970419/free-photo-of-rainy-night-in-tokyo-s-vibrant-alleyway.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="profile pic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </picture>
              </div>
              <div>
                <h1>Swathi </h1>
                <span>Online</span>
              </div>
            </div>
            <span>
              <HiDotsVertical />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
