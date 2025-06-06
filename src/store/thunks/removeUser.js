import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3016/users"

const removeUser = createAsyncThunk("users/remove", async (user) => {
    await axios.delete(`${baseUrl}/${user.id}`);

    return user;
});

export { removeUser };