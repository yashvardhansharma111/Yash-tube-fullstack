import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action
export const fetchUserChannelProfile = createAsyncThunk(
  'channel/fetchUserChannelProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/channels/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Channel Profile
      .addCase(fetchUserChannelProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(fetchUserChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setChannel } = channelSlice.actions;

export default channelSlice.reducer;
