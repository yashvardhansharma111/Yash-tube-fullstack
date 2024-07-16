import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
     user : null ,
     authStatus : false ,
     accessToken : null,
     refreshToken : null,
     loading: false,
     error:null
};

// Async actions

export const registerUser = createAsyncThunk(
    'auth/regsiterUser',
    async(userData , {rejectWithValue}) => {
        try {
            const response = await axios.post('api/auth/register' , userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(credentials , {rejectWithValue}) => {
        try {
            const  response = await axios.post('/api/auth/logout' , credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const logoutUser = createAsyncThunk(
'auth/logoutUser',
async({rejectWithValue}) => {
    try {
        const response = await axios.post('/api/auth/logout');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async(_ , {rejectWithValue})=>{
        try {
            const response = await axios.post('/api/auth/refresh-token');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async(_ , {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/auth/current-user');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Slice

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser : (state , action ) => {
            state.user = action.payload.user;
            state.authStatus = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        clearUser : (state , action ) => {
            state.user = null;
            state.authStatus = false;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },

    extraReducers : (builder) => {
        builder
        //Register user
        .addCase(registerUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.authStatus = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
        .addCase(registerUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //Login user
        .addCase(loginUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.authStatus = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
        .addCase(loginUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //Logout User
        .addCase(logoutUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled , (state ) => {
            state.loading = false;
            state.user = null;
            state.authStatus = false;
            state.accessToken = null;
            state.refreshToken = null;
        })
        .addCase(logoutUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //Refresh Access Token
        .addCase(refreshAccessToken.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
          })
          .addCase(refreshAccessToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        //Get current User
        .addCase(getCurrentUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.authStatus = true;
        })
        .addCase(getCurrentUser.rejected , (state , action) => {
            state.loading = false ;
            state.error = action.payload;
    })
    }

})

export const changePassword = () => {
    console.log("Hello")
}

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;