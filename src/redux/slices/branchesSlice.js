import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async () => {
    const response = await fetch("http://localhost:3001/api/stores");
    if (!response.ok) {
      throw new Error("Failed to fetch branches");
    }
    return await response.json();
  }
);

const initialState = {
  branchesList: [],
  selectedRegion: 0,
  selectedCity: 0,
  currentBranch: {},
  searchText: "",
  status: "idle",
  error: null,
};

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setBranchesList(state, action) {
      state.branchesList = action.payload;
    },
    updateSelectedRegion(state, action) {
      state.selectedRegion = action.payload;
      state.selectedCity = 0;
      state.searchText = "";
    },
    updateSelectedCity(state, action) {
      state.selectedCity = action.payload;
      state.searchText = "";
    },
    updateCurrentBranch(state, action) {
      state.currentBranch = action.payload;
    },
    updateSearchText(state, action) {
      state.searchText = action.payload;
      state.selectedCity = 0;
      state.selectedRegion = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branchesList = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  updateSelectedRegion,
  updateSelectedCity,
  updateSearchText,
  updateCurrentBranch,
  selectedCity,
  selectedRegion,
  branchesList,
} = branchesSlice.actions;

export default branchesSlice.reducer;
