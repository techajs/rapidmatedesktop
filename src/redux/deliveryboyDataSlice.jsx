import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deliveryboyData: null,
  };

  const deliveryboySliceData = createSlice({
    name: 'deliveryboySliceData',
    initialState,
    reducers:{
        deliveryboyPayloadData(state,action){
            state.deliveryboyData = action.payload
        }
    }
  })

  export const {deliveryboyPayloadData} = deliveryboySliceData.actions;
  export default deliveryboySliceData.reducer