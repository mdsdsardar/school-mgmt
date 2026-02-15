import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { userReducer } from "./slices/user.slice";
import { techReducer } from "./slices/tech.slice";
import { academicReducer } from "./slices/academic.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tech: techReducer,
    academic: academicReducer,
  },
});

export default store;