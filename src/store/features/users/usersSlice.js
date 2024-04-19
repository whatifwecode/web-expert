import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const initialState = {
    users: [],
    currentUserId: undefined,
    details: {},
    status: 'idle',
    errors: null
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        return await response.json();
    } catch (error) {
        throw Error('Failed to fetch users');
    }
});

export const fetchUserDetails = createAsyncThunk('users/fetchDetails', async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        return await response.json();
    } catch (error) {
        throw Error('Failed to fetch user details');
    }
});

export const createUser = createAsyncThunk('users/createUser', async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/users`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await response.json();
    } catch (error) {
        throw Error('Failed to create user')
    }
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        })
        return null;
    } catch (error) {
        throw Error('Failed to remove user')
    }
});

export const updateUserDetails = createAsyncThunk('users/updateUserDetails', async ({ userId, updatedDetails }) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDetails)
        });
        return await response.json();
    } catch (error) {
        throw Error('Failed to update user details');
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            })
            .addCase(fetchUserDetails.pending, (state, action) => {
                state.status = 'pending';
                state.currentUserId = action.meta.arg;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'idle';
                state.details[action.meta.arg] = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            })
            .addCase(removeUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = state.users.filter(user => user.id !== action.meta.arg)
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.details[action.payload.id] = action.payload;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            });
    }
});

export default usersSlice.reducer;
