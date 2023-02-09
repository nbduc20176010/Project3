import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

interface iProduct {
    _id: string;
    title: string;
    description: string;
    img: string;
    category: string;
    price: number;
    currency: string;
}
interface iUser {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    createAt?: Date;
    lastUpdate?: Date;
}
interface iOrder {
    _id: string;
    userId: string;
    productId: string;
    quantity: number;
    total: number;
    status: string;
}

interface iAdmin {
    status: "standby" | "loading" | "finish" | "failed";
    detailStatus: "standby" | "loading" | "finish" | "failed";
    products: {
        result: iProduct[];
        total: number;
    };
    users: {
        result: iUser[];
        total: number;
    };
    orders: {
        result: iOrder[];
        total: number;
    };
    detail: any;
}

const initialState: iAdmin = {
    status: "standby",
    detailStatus: "standby",
    products: {
        result: [],
        total: 0,
    },
    users: {
        result: [],
        total: 0,
    },
    orders: {
        result: [],
        total: 0,
    },
    detail: {},
};

interface iInput {
    category?: string;
    page: number;
    size: number;
}

export const getProductList = createAsyncThunk(
    "/admin/getAllProucts",
    async (input: iInput) => {
        const res = await api.get(
            `/product/all?category=${
                input.category ? input.category : "all"
            }&page=${input.page}&size=${input.size}`
        );
        return res.data;
    }
);

export const getAllUser = createAsyncThunk(
    "admin/getAllUser",
    async (input: iInput) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.get(
            `/user?page=${input.page}&size=${input.size}`,
            headerConfig
        );
        return res.data;
    }
);

export const getProductById = createAsyncThunk(
    "admin/getDetail",
    async (id: string) => {
        const res = await api.get(`/product/${id}`);
        return res.data;
    }
);

export const editProductDetail = createAsyncThunk(
    "/product/edit",
    async ({ _id, values }: any) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.put(`/product/${_id}`, values, headerConfig);
        return res.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "/product/delete",
    async (id: string) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.delete(`/product/${id}`, headerConfig);
        return res.data;
    }
);

export const addProduct = createAsyncThunk(
    "/product/add",
    async (values: any) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.post(`/product/`, values, headerConfig);
        return res.data;
    }
);

export const changeUserStatus = createAsyncThunk(
    "/user/active",
    async (values: any) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.put(
            `/user/status/${values._id}`,
            values,
            headerConfig
        );
        return res.data;
    }
);

export const getAllOrders = createAsyncThunk(
    "/order/allOrders",
    async (input: iInput) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.get(
            `/order?page=${input.page}&size=${input.size}`,
            headerConfig
        );
        return res.data;
    }
);

export const changeOrderStatus = createAsyncThunk(
    "/order/changeStatus",
    async (values: any) => {
        const bearer_token = `Bearer ${localStorage.getItem("token")}`;
        const headerConfig = {
            headers: {
                token: bearer_token,
            },
        };
        const res = await api.put(`/order/${values._id}`, values, headerConfig);
        return res.data;
    }
);

export const adminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {
        resetDetailStatus: (state) => {
            state.detailStatus = "standby";
        },
        resetCurrentDetail: (state) => {
            state.detail = {};
        },
    },
    extraReducers(builder) {
        builder.addCase(changeOrderStatus.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
            state.status = "finish";
            const newList = state.orders.result.map((item) =>
                item._id === action.payload._id ? action.payload : item
            );
            state.orders.result = newList;
        });
        builder.addCase(changeOrderStatus.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(getAllOrders.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.status = "finish";
            state.orders = action.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(getProductList.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.status = "finish";
            state.products = action.payload;
        });
        builder.addCase(getProductList.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(getAllUser.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.status = "finish";
            state.users = action.payload;
        });
        builder.addCase(getAllUser.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(getProductById.pending, (state, _) => {
            state.detailStatus = "loading";
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.detailStatus = "finish";
            state.detail = action.payload;
        });
        builder.addCase(getProductById.rejected, (state, _) => {
            state.detailStatus = "failed";
        });
        builder.addCase(editProductDetail.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(editProductDetail.fulfilled, (state, action) => {
            state.status = "finish";
            const newList = state.products.result.map((item) =>
                item._id === action.payload._id ? action.payload : item
            );
            state.products.result = newList;
        });
        builder.addCase(editProductDetail.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(deleteProduct.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = "finish";
            const newList = state.products.result.map((item) =>
                item._id === action.payload._id ? action.payload : item
            );
            state.products.result = newList;
        });
        builder.addCase(deleteProduct.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(addProduct.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.status = "finish";
            state.products.total = action.payload;
        });
        builder.addCase(addProduct.rejected, (state, _) => {
            state.status = "failed";
        });
        builder.addCase(changeUserStatus.pending, (state, _) => {
            state.status = "loading";
        });
        builder.addCase(changeUserStatus.fulfilled, (state, action) => {
            state.status = "finish";
            const newList = state.users.result.map((item) =>
                item._id === action.payload._id ? action.payload : item
            );
            state.users.result = newList;
        });
        builder.addCase(changeUserStatus.rejected, (state, _) => {
            state.status = "failed";
        });
    },
});

export default adminSlice.reducer;
export const { resetDetailStatus, resetCurrentDetail } = adminSlice.actions;
