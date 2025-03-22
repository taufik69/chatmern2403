import React from "react";
import SignUp from "./pages/SingUP/Index";
import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "./pages/SignIn/Signin";
import Home from "./pages/Home/Index";
import RootLayout from "./Components/RootLayout/RootLayout";
import Chat from "./pages/Chat/Chat";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/message" element={<Chat/>} />
          <Route path="/notification" element={"this is notification page"} />
          <Route path="/settings" element={"This is setting page"}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
