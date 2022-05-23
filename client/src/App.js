import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/slices/userSlice";

import AdminLayout from "./Layout/AdminLayout";
import StudentLayout from "./Layout/StudentLayout";
import AuthLayout from "./Layout/AuthLayout";
import "./assets/styles/App.css";

const App =() =>  {
  const user = useSelector(selectUser) || "user1"

  return (
    <div >
      {
        user ? (
          user?.role === 'ADMIN' ? <AdminLayout /> : <StudentLayout />
        ) : <AuthLayout />
      }
    </div>
  );
}

export default App;
