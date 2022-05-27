import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_USER } from "./redux/slices/userSlice";

import AdminLayout from "./Layout/AdminLayout";
import StudentLayout from "./Layout/StudentLayout";
import AuthLayout from "./Layout/AuthLayout";
import "./assets/styles/App.css";
import { fetchUser } from "./apis/commonApis";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const res = await fetchUser()
      console.log({resApp : res})
      if (res?.error === false) {
        dispatch(SET_USER(res?.data))
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const user = useSelector(selectUser)
  console.log({user})
  return (
    <>
      {loading ? <Loading backdrop={false} /> : (
        <>
          {
            user ? (
              user?.role === 'ADMIN' ? <AdminLayout /> : <StudentLayout />
            ) : <AuthLayout />
          }
        </>
      )}
    </>
  );
}

export default App;
