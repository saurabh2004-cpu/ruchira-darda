import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { throttle } from 'lodash';

// Throttle saveState to prevent excessive writes
function saveState(state) {
    try {
        // Only save necessary data
        const stateToPersist = {
            status: state.status,
            userData: {
                // Only include non-sensitive data you need to persist
                id: state.userData?.id,
                name: state.userData?.name,
                email: state.userData?.email
                // Exclude tokens or sensitive info
            }
        };
        
        const serializedState = JSON.stringify(stateToPersist);
        localStorage.setItem("authState", serializedState);
    } catch (e) {
        console.error("Failed to save auth state", e);
    }
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // Optional: Add middleware if needed
});

// Throttle saving to localStorage (once per second at most)
store.subscribe(throttle(() => {
    saveState(store.getState().auth);
}, 1000));