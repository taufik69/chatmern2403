import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../HomeComponents/Sidebar";

const RootLayout = () => {
  const auth = getAuth();
  const [isuserVerified , setisuserVerified] = useState(false)

  useEffect(() => {
   
      setisuserVerified(auth?.currentUser?.emailVerified);
      console.log("isuserVerified" , auth.currentUser.email);
    
    
  }, [auth ,isuserVerified]);

  

    



  
  return (
    <div>
      {isuserVerified ? (
        <div className=" flex gap-x-[30px] p-3 ">
          <div>
            <Sidebar />
          </div>
          <div className="w-full   h-[100dvh] rounded-3xl  shadow-2xs ">
            <Outlet />
          </div>
        </div>
      ) : (
        "nei"
      )}
    </div>
  );
};

export default RootLayout;
