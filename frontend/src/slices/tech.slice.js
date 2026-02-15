import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSubject = createAsyncThunk(
  "subject/createSubject", // action type prefix
  async ({ formData, program }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/subjects/${program}`,
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

export const allSubjects = createAsyncThunk(
  "subject/allSubjects", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/subjects?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const subjectdetails = createAsyncThunk(
  "subject/subjectdetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/subjects/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateSubject = createAsyncThunk(
  "subject/updateSubject", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/subjects/${id}`,
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

export const deletesubject = createAsyncThunk(
  "subject/deletesubject", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/subjects/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createClassLevel = createAsyncThunk(
  "classLevel/createClassLevel", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/class-levels`,
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

export const allClassLevel = createAsyncThunk(
  "classLevel/allClassLevel", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/class-levels?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const classLevelDetails = createAsyncThunk(
  "classLevel/classLevelDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/class-levels/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateClassLevel = createAsyncThunk(
  "classLevel/updateClassLevel", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/class-levels/${id}`,
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

export const deleteClassLevel = createAsyncThunk(
  "classLevel/deleteClassLevel", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/class-levels/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createProgram = createAsyncThunk(
  "program/createProgram", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(`/api/v1/programs`, formData, config);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allPrograms = createAsyncThunk(
  "program/allPrograms", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/programs?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const programDetails = createAsyncThunk(
  "program/programDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/programs/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateProgram = createAsyncThunk(
  "program/updateProgram", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/programs/${id}`,
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

export const deleteProgram = createAsyncThunk(
  "program/deleteProgram", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/programs/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createExam = createAsyncThunk(
  "exam/createExam", // action type prefix
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(`/api/v1/exams/`, formData, config);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allExams = createAsyncThunk(
  "exam/allExams", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/exams?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const examDetails = createAsyncThunk(
  "exam/examDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/exams/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateExam = createAsyncThunk(
  "exam/updateExam", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(`/api/v1/exams/${id}`, formData, config);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteExam = createAsyncThunk(
  "exam/deleteExam", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/exams/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const writeExam = createAsyncThunk(
  "exam/writeExam", // action type prefix
  async ({ examId, answers }, { rejectWithValue }) => {
    try {
      console.log(answers);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/students/exam/${examId}/write`,
        { answers: answers },
      );
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allExamForStudent = createAsyncThunk(
  "exam/allExamForStudent", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/students/fetch/exam?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allExamResults = createAsyncThunk(
  "examResults/allExamResults", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/exam-results?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const allExamResultsForStudent = createAsyncThunk(
  "examResults/allExamResultsForStudent", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/exam-results/student?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const examResultDetails = createAsyncThunk(
  "examResult/examResultDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/exam-results/${id}/checking`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateExamResult = createAsyncThunk(
  "examResult/updateExamResult", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/exam-results/${id}/admin-toggle-publish`,
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

export const createQuestion = createAsyncThunk(
  "question/createQuestion", // action type prefix
  async ({ formData, examID }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.post(
        `/api/v1/questions/${examID}`,
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

export const allQuestions = createAsyncThunk(
  "question/allQuestions", // action type prefix
  async (
    { limit = 10, currentPage = 1, name = "" } = {},
    { rejectWithValue },
  ) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(
        `/api/v1/questions?limit=${limit}&page=${currentPage}&name=${name}`,
      );
      console.log("API Response:", data);
      return data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
export const questionDetails = createAsyncThunk(
  "question/questionDetails", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.get(`/api/v1/questions/${id}`);
      console.log("API Response:", data);
      return data.data; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateQuestion = createAsyncThunk(
  "question/updateQuestion", // action type prefix
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Make API call to fetch products
      const { data } = await axios.put(
        `/api/v1/questions/${id}`,
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

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion", // action type prefix
  async (id, { rejectWithValue }) => {
    try {
      // Make API call to fetch products
      const { data } = await axios.delete(`/api/v1/questions/${id}`);
      console.log("API Response:", data);
      return data.success; // This becomes action.payload on success
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const techSlice = createSlice({
  name: "tech",
  initialState: {
    loading: false,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    isSubmitted: false,
    error: null,
    subject: null,
    allSubject: [],
    subjectCount: null,
    classLevel: null,
    allClasses: [],
    classCount: null,
    program: null,
    allProgram: [],
    programCount: null,
    exam: null,
    allExam: [],
    examCount: null,
    examResult: [],
    allExamResult: [],
    examResultCount: null,
    question: null,
    allQuestion: [],
    questionCount: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearisUpdated: (state) => {
      state.isUpdated = false;
    },
    clearisCreated: (state) => {
      state.isCreated = false;
    },
    clearisDeleted: (state) => {
      state.isDeleted = false;
    },
    clearisSubmitted: (state) => {
      state.isSubmitted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== Program Create  ==========
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Subjects ==========
      .addCase(allSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubject = action.payload.data;
        state.subjectCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Subject Details ==========
      .addCase(subjectdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subjectdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
        state.error = null;
      })
      .addCase(subjectdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Subject ==========
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Delete Subject ==========
      .addCase(deletesubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletesubject.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deletesubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Class Level Create  ==========
      .addCase(createClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Class Level ==========
      .addCase(allClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.allClasses = action.payload.data;
        state.classCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Class Details ==========
      .addCase(classLevelDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(classLevelDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevel = action.payload;
        state.error = null;
      })
      .addCase(classLevelDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Class ==========
      .addCase(updateClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Delete Class ==========
      .addCase(deleteClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Program Create  ==========
      .addCase(createProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Program ==========
      .addCase(allPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.allProgram = action.payload.data;
        state.programCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Program Details ==========
      .addCase(programDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(programDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.program = action.payload;
        state.error = null;
      })
      .addCase(programDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Program ==========
      .addCase(updateProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Delete Program ==========
      .addCase(deleteProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Exam Create  ==========
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Exam ==========
      .addCase(allExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allExams.fulfilled, (state, action) => {
        state.loading = false;
        state.allExam = action.payload.data;
        state.examCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Exam Result ==========
      .addCase(allExamResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allExamResults.fulfilled, (state, action) => {
        state.loading = false;
        state.allExamResult = action.payload.data;
        state.examResultCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allExamResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Exam Result For Student ==========
      .addCase(allExamResultsForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allExamResultsForStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.allExamResult = action.payload.data;
        state.examResultCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allExamResultsForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Exam Result Details ==========
      .addCase(examResultDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(examResultDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.examResult = action.payload;
        state.error = null;
      })
      .addCase(examResultDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Exam Results ==========
      .addCase(updateExamResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExamResult.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateExamResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Exam For Student==========
      .addCase(allExamForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allExamForStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.allExam = action.payload.data;
        state.examCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allExamForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Exam Details ==========
      .addCase(examDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(examDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload;
        state.error = null;
      })
      .addCase(examDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Exam ==========
      .addCase(updateExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Delete Exam ==========
      .addCase(deleteExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Write Exam ==========
      .addCase(writeExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(writeExam.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubmitted = action.payload;
        state.error = null;
      })
      .addCase(writeExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Question Create  ==========
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = action.payload;
        state.error = null;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== All Question ==========
      .addCase(allQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestion = action.payload.data;
        state.questionCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(allQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Question Details ==========
      .addCase(questionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(questionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
        state.error = null;
      })
      .addCase(questionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Update Question ==========
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== Delete Question ==========
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearisCreated,
  clearisUpdated,
  clearisDeleted,
  clearisSubmitted,
} = techSlice.actions;
export const techReducer = techSlice.reducer;
