import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iAuth {
    status: "standby" | "loading" | "finish" | "failed";
    authMessage: string;
}

interface iAuthInput {
    username: string;
    password: string;
    email?: string;
}

const initialState: iAuth = {
    status: "standby",
    authMessage: "",
};

export const signUpUser = createAsyncThunk(
    "auth/signup",
    async (input: iAuthInput) => {
        const res = await api.post("/auth/register", input, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return res.data;
    }
);

export const signInUser = createAsyncThunk(
    "/auth/login",
    async (input: iAuthInput) => {
        const res = await api.post("/auth/login", input, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return res.data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthStatus: (state) => {
            state.status = "standby";
            state.authMessage = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(signUpUser.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            if (action.payload.status === "failed") {
                state.status = "failed";
                state.authMessage = action.payload.message;
            } else {
                state.status = "finish";
                state.authMessage = "register successed!";
            }
        });
        builder.addCase(signUpUser.rejected, (state, _) => {
            state.status = "failed";
            state.authMessage = "register fail!";
        });
        builder.addCase(signInUser.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            if (action.payload.status === "failed") {
                state.status = "failed";
                state.authMessage = action.payload.message;
            } else {
                state.status = "finish";
                state.authMessage = "login successed!";
                localStorage.setItem("member", action.payload._id);
                localStorage.setItem("token", action.payload.accessToken);
                localStorage.setItem(
                    "role",
                    action.payload.isAdmin ? "admin" : "member"
                );
            }
        });
        builder.addCase(signInUser.rejected, (state, _) => {
            state.status = "failed";
        });
    },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
