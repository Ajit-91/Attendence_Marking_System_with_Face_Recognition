//  This is the entry point of the App
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_USER } from "./redux/slices/userSlice";
// import * as faceapi from 'face-api.js'
import AdminLayout from "./Layout/AdminLayout";
import StudentLayout from "./Layout/StudentLayout";
import AuthLayout from "./Layout/AuthLayout";
import "./assets/styles/App.css";
import { fetchUser } from "./apis/commonApis";
import Loading from "./components/Loading";
// import { warmupModel } from "./utils/faceRecognition";

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  // const MODELS_URI = '/models'
  const user = useSelector(selectUser)

  //  First we fetch User based on token stored in local storage
  useEffect(() => {
    const getUser = async () => {
      const res = await fetchUser()
      console.log({ fetchUser: res })
      if (res?.error === false) {
        dispatch(SET_USER(res?.data))
      }
      setLoading(false);
    }
    getUser()
  }, [])


  // useEffect(() => {
  //   const loadAndWarmUpModels = async () => {
  //     if (!window.modelsLoaded) {
  //       try {
  //         await Promise.all([
  //           faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
  //           faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
  //           faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
  //         ]);
  //         console.log('Models loaded successfully');
  //         await warmupModel(); 
  //         window.modelsLoaded = true;
  //       } catch (err) {
  //         console.error('Error loading models:', err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   loadAndWarmUpModels();
  // }, [])

  return (
    <>
      {loading ? <Loading backdrop={false} /> : (
        <>
        {/* Here we render the layouts conditionally based on the user fetched */}
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
