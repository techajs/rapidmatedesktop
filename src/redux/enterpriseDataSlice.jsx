import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enterpriseData: null,
  };

  const enterpriseSliceData = createSlice({
    name: 'enterpriseSliceData',
    initialState,
    reducers:{
        enterprisePayloadData(state,action){
            state.enterpriseData = action.payload
        }
    }
  })

  export const {enterprisePayloadData} = enterpriseSliceData.actions;
  export default enterpriseSliceData.reducer