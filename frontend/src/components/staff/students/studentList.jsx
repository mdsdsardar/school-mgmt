import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../shared/loader";
import MetaData from "../../shared/metaData";
import { allStudents, clearError } from "../../../slices/user.slice";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../admin/sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";

const StudentList = () => {
  const dispatch = useDispatch();
  const { loading, error, allStudent, studentCount } = useSelector(
    (state) => state.user,
  );
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // MUI DataGrid uses 0-based indexing
    pageSize: 5, // rows per page
  });
  const [searchInput, setSearchInput] = useState(""); // ← Input value (local state)
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const currentPage = paginationModel.page + 1; // Convert to 1-based for backend
    const limit = paginationModel.pageSize;
    dispatch(allStudents({ limit, currentPage, name: searchQuery }));

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, paginationModel, searchQuery]);
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
  // Ensure orders is an array before mapping
  if (!Array.isArray(allStudent) || allStudent.length === 0) {
    return (
      <div className="form-group mb-3" style={{ maxWidth: "400px" }}>
        <h1 className="mt-5">All Student</h1>
        <p>No Student found.</p>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search subject by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress} // ← Search on Enter
          />
          <span className="input-group-text" onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </span>
          {searchQuery && (
            <span className="input-group-text" onClick={handleClearSearch}>
              <i className="fa fa-trash"></i>
            </span>
          )}
        </div>
      </div>
    );
  }
  // Map orders to rows with proper id field
  const rows = allStudent.map((student) => ({
    id: student.studentId, // MUI DataGrid requires 'id' field
    name: student.name,
    withDrawn: student.isWithdrawn,
    Suspended: student.isSuspended,
    currentClass: student.currentClassLevel,
    mainID: student._id,
  }));

  const columns = [
    {
      field: "id",
      headerName: "Student ID",
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
      field: "withDrawn",
      headerName: "isWithdrawn",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span
          className={`badge ${params.value ? "bg-danger" : "bg-success"}`}
          style={{
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {params.value ? "Withdrawn" : "Active"}
        </span>
      ),
    },
    {
      field: "Suspended",
      headerName: "isSuspended",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span
          className={`badge ${params.value ? "bg-danger" : "bg-success"}`}
          style={{
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {params.value ? "Withdrawn" : "Active"}
        </span>
      ),
    },
    {
      field: "currentClass",
      headerName: "CurrentClassLevel",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link
            to={`/admin/student/${params.row.mainID}`}
            className="btn btn-primary py-1 px-3"
          >
            <i className="fa fa-eye"></i>
          </Link>
        </Fragment>
      ),
    },
  ];
  return (
    <Fragment>
      <MetaData title={"All Students"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Students</h1>
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
                      placeholder="Search students by name..."
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
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    autoHeight
                    pageSizeOptions={[5, 10, 25]}
                    paginationMode="server" // Important for server-side pagination
                    rowCount={studentCount} // Total number of products from backend
                    disableRowSelectionOnClick
                    sx={{
                      "& .MuiDataGrid-row": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentList;
