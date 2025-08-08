import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely load state
function loadState() {
    try {
        const serializedState = localStorage.getItem("authState");
        if (!serializedState) return undefined;
        
        const state = JSON.parse(serializedState);
        
        // Validate loaded state structure
        if (typeof state.status === 'boolean' && 
            (state.userData === null || typeof state.userData === 'object')) {
            return state;
        }
        return undefined;
    } catch (e) {
        console.warn("Failed to load auth state", e);
        return undefined;
    }
}

const initialState = loadState() || {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;