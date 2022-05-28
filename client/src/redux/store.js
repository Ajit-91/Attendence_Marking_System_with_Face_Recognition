import {configureStore} from "@reduxjs/toolkit"
import formSlice from "./slices/formSlice"
import userSlice from "./slices/userSlice"

export default configureStore({
    reducer : {
        user : userSlice,
        form : formSlice
    }
})