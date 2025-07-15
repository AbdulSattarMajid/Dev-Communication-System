import React from "react";
// import Sidebar from "./Sidebar";
import Login from "./Authentication/Signin";
import Sidebar from "./Authentication/Sidebar";
import TopNavbar from "./Authentication/TopNavbar";
export default function App() {
  return (
    <div className="flex flex-col">
      <TopNavbar/>

      <Sidebar/>

    </div>
  );
}
