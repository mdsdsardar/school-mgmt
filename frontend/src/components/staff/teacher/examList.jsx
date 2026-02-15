import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../shared/loader";
import MetaData from "../../shared/metaData";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../admin/sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  allExams,
  clearError,
  clearisDeleted,
  deleteExam,
} from "../../../slices/tech.slice";

const ExamList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, allExam, examCount, isDeleted } = useSelector(
    (state) => state.tech,
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // MUI DataGrid uses 0-based indexing
    pageSize: 5, // rows per page
  });
  const [searchInput, setSearchInput] = useState(""); // ← Input value (local state)
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const currentPage = paginationModel.page + 1; // Convert to 1-based for backend
    const limit = paginationModel.pageSize;
    dispatch(allExams({ limit, currentPage, name: searchQuery }));

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isDeleted) {
      toast.success("Exam Deleted Succesfully");
      navigate("/admin/all/exam");
      dispatch(clearisDeleted());
    }
    // }, [dispatch, paginationModel, toast, error, isDeleted]);
  }, [dispatch, paginationModel, searchQuery, error, isDeleted]);
  const handleSearch = (e) => {
    setSearchQuery(searchInput);
    setPaginationModel({ ...paginationModel, page: 0 }); // Reset to first page
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // ← Search on Enter key
    }
  };
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setPaginationModel({ ...paginationModel, page: 0 });
  };
  const deleteExamHandler = (id) => {
    dispatch(deleteExam(id));
  };
  const rows = allExam.map((exam) => ({
    id: exam._id, // MUI DataGrid requires 'id' field
    name: exam.name,
    subject: exam.subject?.name || "Not Assigned",
    passMark: exam.passMark,
    totalMark: exam.totalMark,
    academicTerm: exam.academicTerm?.name || "Not Assigned",
  }));

  const columns = [
    {
      field: "id",
      headerName: "Exam ID",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "passMark",
      headerName: "PassMark",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "totalMark",
      headerName: "TotalMark",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "academicTerm",
      headerName: "AcademicTerm",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/exam/${params.row.id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteExamHandler(params.row.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        );
      },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   minWidth: 100,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Fragment>
    //       <Link
    //         to={`/admin/exam/${params.row.id}`}
    //         className="btn btn-primary py-1 px-2"
    //       >
    //         <i className="fa fa-eye"></i>
    //       </Link>
    //       <button
    //         className="btn btn-danger py-1 px-2 ml-2"
    //         onClick={() => deleteExamHandler(`${params.row.id}`)}
    //       >
    //         <i className="fa fa-trash"></i>
    //       </button>
    //     </Fragment>
    //   ),
    // },
  ];
  return (
    <Fragment>
      <MetaData title={"All Exams"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Exams</h1>
            {loading ? (
              <Loader />
            ) : (
              <div style={{ width: "100%" }}>
                {/* Bootstrap Search */}
                <div className="form-group mb-3" style={{ maxWidth: "400px" }}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search exam by name..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress} // ← Search on Enter
                    />
                    <span className="input-group-text" onClick={handleSearch}>
                      <i className="fa fa-search"></i>
                    </span>
                    {searchQuery && (
                      <span
                        className="input-group-text"
                        onClick={handleClearSearch}
                      >
                        <i className="fa fa-trash"></i>
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ height: 400, width: "100%" }}>
                  {!Array.isArray(allExam) || allExam.length === 0 ? (
                    <div
                      className="form-group mb-3"
                      style={{ maxWidth: "400px" }}
                    >
                      <h1 className="mt-5">All Exam</h1>
                      <p>No Exam found.</p>
                    </div>
                  ) : (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      autoHeight
                      pageSizeOptions={[5, 10, 25]}
                      paginationMode="server" // Important for server-side pagination
                      rowCount={examCount} // Total number of products from backend
                      disableRowSelectionOnClick
                      sx={{
                        "& .MuiDataGrid-row": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ExamList;
