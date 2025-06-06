import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const baseUrl = "http://localhost:3016/users";

const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post(baseUrl, {
        name: faker.name.fullName()
    })

    return response.data;
});

export { addUser };