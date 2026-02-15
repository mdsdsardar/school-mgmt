import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const allTeachers = createAsyncThunk(
  "teacher/allTeachers", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/teachers/admin?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const teacherdetails = createAsyncThunk(
  "teacher/teacherdetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/teachers/${id}/admin`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/teachers/${id}/update/admin`,
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

export const allStudents = createAsyncThunk(
  "student/allStudents", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/students/admin?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const studentdetails = createAsyncThunk(
  "student/studentdetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/students/${id}/admin`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/students/${id}/update/admin`,
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    teacher: null,
    teacherCount: null,
    allTeacher: [],
    isUpdated: false,
    student: null,
    studentCount: null,
    allStudent: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearisUpdated: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== All Teachers ==========
      .addCase(allTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeacher = action.payload.admins;
        state.teacherCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Teacher Details==========
      .addCase(teacherdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
        state.error = null;
      })
      .addCase(teacherdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Teacher==========
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Students ==========
      .addCase(allStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudent = action.payload.data;
        state.studentCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Student Details==========
      .addCase(studentdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.error = null;
      })
      .addCase(studentdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Students==========
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearError, clearisUpdated } = userSlice.actions;
export const userReducer = userSlice.reducer;
