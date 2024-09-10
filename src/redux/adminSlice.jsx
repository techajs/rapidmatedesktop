import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,
};

const adminSliceData = createSlice({
  name: "adminSliceData",
  initialState,
  reducers: {
    adminLoginData(state, action) {
      state.adminData = action.payload;
    },
    adminLogout(state, action) {
      state.adminData = null;
    },
  },
});

export const { adminLoginData, adminLogout } = adminSliceData.actions;
export default adminSliceData.reducer;
