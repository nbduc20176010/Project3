import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./features/authSlice";
import commonSlice from "./features/commonSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
    reducer: {
        common: commonSlice,
        auth: authSlice,
        user: userSlice,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
