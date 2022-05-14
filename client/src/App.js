import React, { useState } from "react";
import Camera from "./components/Camera";
import "./assets/styles/App.css";
import {Button} from '@mui/material'
const App =() =>  {
  const [toggleCamera, setToggleCamera] = useState(false)
  return (
    <div >
      {toggleCamera && <Camera /> }
      <Button color="success" variant="outlined" onClick={()=>setToggleCamera(prev => !prev)}>toggleCamera</Button>
    </div>
  );
}

export default App;
