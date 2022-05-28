import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formDetails : {}
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
      SET_FORM_DETAILS : (state, {payload}) => {
          state.formDetails = {...state.formDetails, ...payload}
      },
      CLEAR_FORM_DETAILS : (state) => {
        state.formDetails = {}
      }
  }
});

export const {SET_FORM_DETAILS, CLEAR_FORM_DETAILS} = formSlice.actions
export const selectFormDetails = (state) => state?.form?.formDetails
export default formSlice.reducer