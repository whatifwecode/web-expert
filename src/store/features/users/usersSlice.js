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

export const fetchUserDetails = createAsyncThunk('users/fetchDetails', async (userId, { getState }) => {
    const { loading } = getState().users;
    if (loading === 'pending') return;

    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        return await response.json();
    } catch (error) {
        throw Error('Failed to fetch user details');
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
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
            });
    }
});

export default usersSlice.reducer;
