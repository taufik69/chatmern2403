import React from "react";
import Grouplist from "../../Components/HomeComponents/Grouplist";
import  Friends  from "../../Components/HomeComponents/Friends";
import UserList from "../../Components/HomeComponents/UserList";
import FriendRequest from "../../Components/HomeComponents/FriendRequest";
import Group from "../../Components/HomeComponents/Group";
import BlockUser from "../../Components/HomeComponents/BlockUser";

const Home = () => {
  return (
    <div className="flex  justify-between  gap-y-5  flex-wrap">
      <div className="w-[30vw] shadow-2xl rounded-2xl ">
        <Grouplist />
      </div>

      <div className=" w-[25vw] shadow-2xl rounded-2xl ">
        <Friends />
      </div>

      <div className=" w-[25vw] shadow-2xl rounded-2xl ">
        <UserList />
      </div>
      <div className="w-[30vw]  shadow-2xl rounded-2xl ">
        <FriendRequest />
      </div>
      <div className=" w-[25vw]  shadow-2xl rounded-2xl ">
        <Group />
      </div>
      <div className=" w-[25vw]  shadow-2xl rounded-2xl ">
        <BlockUser />
      </div>

   
    </div>
      
  );
};

export default Home;
