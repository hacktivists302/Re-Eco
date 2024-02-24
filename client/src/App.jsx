import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Slotbooking from "./pages/Slotbooking";
import Sidebar from "./components/Sidebar";
import MyProfile from "./pages/MyProfile";
import Notifications from "./pages/Notifications";
import MyRewards from "./pages/MyRewards";
import Pickup from "./pages/Pickup";
import PickupSignin from "./pages/PickupSignin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<Sidebar />}>
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="slotbooking" element={<Slotbooking />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="myrewards" element={<MyRewards />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
        <Route path="/pickup" element={<Pickup />} />
        <Route path="/pickup/signin" element={<PickupSignin />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
