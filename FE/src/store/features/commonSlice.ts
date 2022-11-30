import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iCommon {
    loginModalVisible: boolean;
}

const initialState: iCommon = {
    loginModalVisible: false,
};

export const commonSlice = createSlice({
    name: "Common",
    initialState,
    reducers: {
        triggerLoginModal: (
            state,
            action: PayloadAction<{ modalStatus: boolean }>
        ) => {
            state.loginModalVisible = action.payload.modalStatus;
        },
    },
});

export default commonSlice.reducer;
export const { triggerLoginModal } = commonSlice.actions;
