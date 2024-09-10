import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    consumerData: null,
  };

  const consumerSliceData = createSlice({
    name: 'consumerSliceData',
    initialState,
    reducers:{
        consumerPayloadData(state,action){
            state.consumerData = action.payload
        }
    }
  })

  export const {consumerPayloadData} = consumerSliceData.actions;
  export default consumerSliceData.reducer