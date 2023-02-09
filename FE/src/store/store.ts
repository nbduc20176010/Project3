import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminSlice from "./features/adminSlice";
import authSlice from "./features/authSlice";
import commonSlice from "./features/commonSlice";
import orderSlice from "./features/orderSlice";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
    reducer: {
        common: commonSlice,
        auth: authSlice,
        user: userSlice,
        products: productSlice,
        admin: adminSlice,
        order: orderSlice,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
