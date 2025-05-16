import React, { use, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../HomeComponents/Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ValidationError from "../../pages/Error/ValidationError";
import { IoEllipseSharp } from "react-icons/io5";
import Grouplist from "../HomeComponents/Grouplist";
const RootLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isuserVerified, setisuserVerified] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setisuserVerified(user.emailVerified);
      } else {
        navigate("/signin");
        alert("First Verify Your Mail");
      }
    });
  }, []);

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
        <ValidationError />
      )}
    </div>
  );
};

export default RootLayout;
