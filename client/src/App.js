import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_USER } from "./redux/slices/userSlice";
import * as faceapi from 'face-api.js'
import AdminLayout from "./Layout/AdminLayout";
import StudentLayout from "./Layout/StudentLayout";
import AuthLayout from "./Layout/AuthLayout";
import "./assets/styles/App.css";
import { fetchUser } from "./apis/commonApis";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const MODELS_URI = '/models'

  useEffect(() => {
    const getUserAndLoadModels = async () => {
      const res = await fetchUser()
      if (res?.error === false) {
        dispatch(SET_USER(res?.data))
        Promise.all([
          faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
        ]).then(() => {
          console.log('models loaded')
          setLoading(false)
        }).catch(err => {
          console.log('models loading error', err)
        })
      }
      setLoading(false)

    }
    getUserAndLoadModels()
  }, [])

  const user = useSelector(selectUser)
  console.log({ user })
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
