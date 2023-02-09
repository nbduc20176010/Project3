import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iProduct {
    _id: string;
    title: string;
    description: string;
    img: string;
    category: string;
    price: number;
    image?: any;
    currency: string;
    quantity: number;
}

interface iInput {
    category?: string;
    page: number;
    size: number;
}

interface iOutput {
    result: iProduct[];
    total: number;
    detail?: iProduct;
}

const initialState: iOutput = {
    result: [],
    total: 0,
};

export const getActiveProduct = createAsyncThunk(
    "/product/getAll",
    async (input: iInput) => {
        const res = await api.get(
            `/product?category=${
                input.category ? input.category : "all"
            }&page=${input.page}&size=${input.size}`
        );
        return res.data;
    }
);

export const getProductById = createAsyncThunk(
    "/product/detail",
    async (id: string) => {
        const res = await api.get(`/product/${id}`);
        return res.data;
    }
);

export const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getActiveProduct.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.detail = action.payload;
        });
    },
});

export default productSlice.reducer;
