import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};
const userSliceData = createSlice({
  name: "userSliceData",
  initialState,
  reducers: {
    userLoginData(state, action) {
      state.userData = action.payload;
    },
    logoutuser(state, action) {
      state.userData = null;
    },
  },
});

export const { userLoginData, logoutuser } = userSliceData.actions;
export default userSliceData.reducer;
