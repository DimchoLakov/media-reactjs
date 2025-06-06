import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3016/users";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get(baseUrl);

    // Development only!!!
    // await pause(1000);

    return response.data;
});

// Development only!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration); // ✅ correctly resolves after delay
    });
};

// These properties are automatically assigned to fetchUsers. It comes from createAsyncThunk
// fetchUsers.pending === "users/fetch/pending"
// fetchUsers.fulfilled === "users/fetch/fulfilled"
// fetchUsers.rejected === "users/fetch/rejected"

export { fetchUsers }; 