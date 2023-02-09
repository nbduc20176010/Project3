import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iOrder {
    userId: string;
    productId: string;
    productName: string;
    quantity: number;
    total: number;
    status: string;
}

interface iState {
    orders: iOrder[];
    loading: "standby" | "loading" | "finish" | "failed";
}

const initialState: iState = {
    orders: [],
    loading: "standby",
};

export const createOrder = createAsyncThunk(
    "/order/createOrder",
    async (values: any) => {
        const res = await api.post("/order", values);
        return res.data;
    }
);

export const orderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "standby";
        },
    },
    extraReducers(builder) {
        builder.addCase(createOrder.pending, (state, _) => {
            state.loading = "loading";
        });
        builder.addCase(createOrder.fulfilled, (state, _) => {
            state.loading = "finish";
        });
        builder.addCase(createOrder.rejected, (state, _) => {
            state.loading = "failed";
        });
    },
});

export default orderSlice.reducer;
export const { resetOrderStatus } = orderSlice.actions;
