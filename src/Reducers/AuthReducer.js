// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from './userReducer'; 
// Async thunk for user authentication
// export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
//   const response = await api.post('/login', credentials);
//   return response.data;
// });
const initialState = {
  user: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  };
const signupUrl = 'https://appsalabackend-p20y.onrender.com/signup'
const apiUrl = 'https://appsalabackend-p20y.onrender.com/login'

export const signupUser = createAsyncThunk('signup', async (body, { rejectWithValue }) => {
  try {
    const res = await fetch(signupUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // Check if the response status is not in the 2xx range
      const errorData = await res.json(); // Assuming your server returns error details as JSON
      throw new Error(errorData.message); // You can customize this error handling based on your server's response format
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('login', async (body, { rejectWithValue }) => {
  try {
    const res = await fetch(apiUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // Check if the response status is not in the 2xx range
      const errorData = await res.json(); // Assuming your server returns error details as JSON
      throw new Error(errorData.message); // You can customize this error handling based on your server's response format
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId'); // Remove token from localStorage
  return async (dispatch) => {
    dispatch(fetchUser(null));
    dispatch({ type: 'auth/logout' });
  };
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.userId;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem('userId', action.payload.data.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('userId'); // Remove token from localStorage
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.userId;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem('userId', action.payload.data.userId);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default authSlice.reducer;
