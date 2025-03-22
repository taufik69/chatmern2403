import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Signin = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  // onchange lishener
  const loginChange = (event) => {
    const { name, value } = event.target;

    setloginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  //  prevent the deafault behaviour
  const handleForm = (e) => {
    e.preventDefault();
  };

  /**
   * todo : handleLogin funtion implement
   * params : ({})
   * return :void
   */
  const handleLogin = () => {
    const { email, password } = loginInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((info) => {
        console.log(info);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handleGoogle funtion
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userinfo) => {
        const { user } = userinfo;
         let userRef = push(ref(db, "users/"));
        set(userRef, {
          username: user.displayName || "Name Missing",
          email: user.email || "Email Missing",
          profile_picture:  user.photoURL,
          userUid: user.uid,
        });
      }).then(()=> {
         navigate("/");
      })
      .catch((err) => {
        console.error("from from google login", err);
      });
  };
  return (
    <div>
      <div className="flex">
        <div className="w-1/2 h-screen flex justify-center items-center">
          <div>
            <div className="py-3">
              <h1 className="mb-5">Login to your account!</h1>
              <div
                className=" py-2 px-0 border rounded-xl flex justify-center cursor-pointer"
                onClick={handleGoogle}
              >
                Login with Google
              </div>
            </div>

            <div>
              <form
                action="#"
                className="flex flex-col gap-y-5"
                onSubmit={handleForm}
              >
                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    value={loginInfo.email}
                    onChange={loginChange}
                    className="px-3 py-1 border-b border-b-red-600 focus:outline-0 focus:bg-gray-100"
                    placeholder="Youraddres@email.com"
                  />
                </div>

                <div className="flex flex-col items-start gap-y-2">
                  <label htmlFor="email">password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={loginChange}
                    className="px-3 py-1 border-b border-b-red-600 focus:outline-0 focus:bg-gray-100"
                    placeholder="******"
                  />
                </div>
                <p className="mt-5">
                  don't have an account ? <Link to={"/signup"}>Sign up</Link>
                </p>

                <button
                  className="bg-blue-700 cursor-pointer text-white  w-full py-2 px-1 rounded-2xl"
                  type="button"
                  onClick={handleLogin}
                >
                  Login to Continue
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-blue-400 h-screen">right</div>
      </div>
    </div>
  );
};

export default Signin;
