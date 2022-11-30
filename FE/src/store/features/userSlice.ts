import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iUser {
    username: string;
    email: string;
    isAdmin: boolean;
    createAt?: Date;
    lastUpdate?: Date;
}

const initialState: iUser = {
    username: "",
    email: "",
    isAdmin: false,
};

export const getUserInformationById = createAsyncThunk(
    "user/getUserById",
    async (id:string) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                "token": bearer_token,
            },
        };
        const res = await api.get(`/user/${id}`, headerConfig);
        return res.data;
    }
);

export const userSlice = createSlice({
    name: "Common",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserInformationById.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.createAt = action.payload.createAt;
            state.lastUpdate = action.payload.lastUpdate;
        });
    },
});

export default userSlice.reducer;
