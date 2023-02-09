import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iCommon {
    loginModalVisible: boolean;
    //edit product detail modal
    editModalVisible: boolean;
}

const initialState: iCommon = {
    loginModalVisible: false,
    editModalVisible: false,
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
        triggerEditModal: (
            state,
            action: PayloadAction<{ modalStatus: boolean }>
        ) => {
            state.editModalVisible = action.payload.modalStatus;
        },
    },
});

export default commonSlice.reducer;
export const { triggerLoginModal, triggerEditModal } = commonSlice.actions;
