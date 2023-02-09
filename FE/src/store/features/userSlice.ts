import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iOrder {
    userId: string;
    productId: string;
    productName: string;
    key: string[];
    quantity: number;
    total: number;
    status: string;
}

interface iUser {
    username: string;
    email: string;
    isAdmin: boolean;
    orderHistory: iOrder[];
}

const initialState: iUser = {
    username: "",
    email: "",
    isAdmin: false,
    orderHistory: [],
};

export const getUserInformationById = createAsyncThunk(
    "user/getUserById",
    async (id: string) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.get(`/user/${id}`, headerConfig);
        return res.data;
    }
);

export const getOrderHistory = createAsyncThunk(
    "user/getOrderHistory",
    async (id: string) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.get(`/order/${id}`, headerConfig);
        return res.data;
    }
);

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserInformationById.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
        });
        builder.addCase(getOrderHistory.fulfilled, (state, action) => {
            state.orderHistory = action.payload;
        });
    },
});

export default userSlice.reducer;
