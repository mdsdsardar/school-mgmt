import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createAcademicTerm = createAsyncThunk(
  "academicTerm/createAcademicTerm", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/academic-terms`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allAcademicTerm = createAsyncThunk(
  "academicTerm/allAcademicTerm", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/academic-terms?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const academicTermdetails = createAsyncThunk(
  "academicTerm/academicTermdetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/academic-terms/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateAcademicTerm = createAsyncThunk(
  "academicTerm/updateAcademicTerm", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/academic-terms/${id}`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteAcademicTerm = createAsyncThunk(
  "academicTerm/deleteAcademicTerm", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/academic-terms/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createYearGroup = createAsyncThunk(
  "yearGroup/createYearGroup", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/year-groups/`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allYearGroups = createAsyncThunk(
  "yearGroup/allYearGroups", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/year-groups?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const yearGroupDetails = createAsyncThunk(
  "yearGroup/yearGroupDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/year-groups/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateYearGroup = createAsyncThunk(
  "yearGroup/updateYearGroup", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/year-groups/${id}`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteYearGroup = createAsyncThunk(
  "yearGroup/deleteYearGroup", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/year-groups/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createAcademicYear = createAsyncThunk(
  "academicYear/createAcademicYear", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/academic-years`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allAcademicYears = createAsyncThunk(
  "academicYear/allAcademicYears", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/academic-years?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const academicYearDetails = createAsyncThunk(
  "academicYear/academicYearDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/academic-years/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateAcademicYear = createAsyncThunk(
  "academicYear/updateAcademicYear", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/academic-years/${id}`,
        formData,
        config,
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteAcademicYear = createAsyncThunk(
  "academicYear/deleteAcademicYear", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/academic-years/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const academicSlice = createSlice({
  name: "academic",
  initialState: {
    loading: false,
    error: null,
    isCreated: null,
    isUpdated: null,
    isDeleted: null,
    academicTerm: null,
    allTerm: [],
    termCount: null,
    yearGroup: null,
    allYearGroup: [],
    yearGroupCount: null,
    academicYear: null,
    allAcademicYear: [],
    academicYearCount: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearisCreated: (state) => {
      state.isCreated = null;
    },
    clearisUpdated: (state) => {
      state.isUpdated = null;
    },
    clearisDeleted: (state) => {
      state.isDeleted = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== AcademicTerm Create  ==========
      .addCase(createAcademicTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademicTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createAcademicTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Teachers ==========
      .addCase(allAcademicTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allAcademicTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.allTerm = action.payload.data;
        state.termCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allAcademicTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicTerm Details  ==========
      .addCase(academicTermdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(academicTermdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.academicTerm = action.payload;
        state.error = null;
      })
      .addCase(academicTermdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicTerm Update  ==========
      .addCase(updateAcademicTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcademicTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateAcademicTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicTerm Delete  ==========
      .addCase(deleteAcademicTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAcademicTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteAcademicTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== YearGroup Create  ==========
      .addCase(createYearGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createYearGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createYearGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Year Group ==========
      .addCase(allYearGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allYearGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.allYearGroup = action.payload.data;
        state.yearGroupCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allYearGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== YearGroup Details  ==========
      .addCase(yearGroupDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(yearGroupDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.yearGroup = action.payload;
        state.error = null;
      })
      .addCase(yearGroupDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== YearGroup Update  ==========
      .addCase(updateYearGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateYearGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateYearGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== YearGroup Delete  ==========
      .addCase(deleteYearGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYearGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteYearGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Create AcademicYear ==========
      .addCase(createAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Year Group ==========
      .addCase(allAcademicYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allAcademicYears.fulfilled, (state, action) => {
        state.loading = false;
        state.allAcademicYear = action.payload.data;
        state.academicYearCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allAcademicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicYear Details  ==========
      .addCase(academicYearDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(academicYearDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.academicYear = action.payload;
        state.error = null;
      })
      .addCase(academicYearDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicYear Update  ==========
      .addCase(updateAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== AcademicYear Delete  ==========
      .addCase(deleteAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearisCreated, clearisUpdated, clearisDeleted } =
  academicSlice.actions;
export const academicReducer = academicSlice.reducer;
