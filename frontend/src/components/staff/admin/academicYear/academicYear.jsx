import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../shared/loader";
import MetaData from "../../../shared/metaData";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  allAcademicYears,
  clearError,
  clearisDeleted,
  deleteAcademicYear,
} from "../../../../slices/academic.slice";

const AcademicYearList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, allAcademicYear, academicYearCount, isDeleted } =
    useSelector((state) => state.academic);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // MUI DataGrid uses 0-based indexing
    pageSize: 5, // rows per page
  });
  const [searchInput, setSearchInput] = useState(""); // ← Input value (local state)
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const currentPage = paginationModel.page + 1; // Convert to 1-based for backend
    const limit = paginationModel.pageSize;
    dispatch(allAcademicYears({ limit, currentPage, name: searchQuery }));

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isDeleted) {
      toast.success("Academic Year Deleted Succesfully");
      navigate("/admin/all/academic-year");
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
  const deleteAcademicYearHandler = (id) => {
    dispatch(deleteAcademicYear(id));
  };
  // Map orders to rows with proper id field
  const rows = allAcademicYear.map((academicYear) => ({
    id: academicYear._id, // MUI DataGrid requires 'id' field
    name: academicYear.name,
    isCurrent: academicYear.isCurrent,
  }));

  const columns = [
    {
      field: "id",
      headerName: "Academic Year ID",
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
      field: "isCurrent",
      headerName: "Current",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span
          className={`badge ${params.value ? "bg-success" : "bg-danger"}`}
          style={{
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {params.value ? "Yes" : "No"}
        </span>
      ),
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
            to={`/admin/academicYear/${params.row.id}`}
            className="btn btn-primary py-1 px-2"
          >
            <i className="fa fa-eye"></i>
          </Link>
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteAcademicYearHandler(`${params.row.id}`)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </Fragment>
      ),
    },
  ];
  return (
    <Fragment>
      <MetaData title={"All Academic Year"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Academic Year</h1>
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
                      placeholder="Search Academic Year by name..."
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
                {!Array.isArray(allAcademicYear) ||
                allAcademicYear.length === 0 ? (
                  <div>
                    <p>No Academic Year found.</p>
                  </div>
                ) : (
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      autoHeight
                      pageSizeOptions={[5, 10, 25]}
                      paginationMode="server" // Important for server-side pagination
                      rowCount={academicYearCount} // Total number of products from backend
                      disableRowSelectionOnClick
                      sx={{
                        "& .MuiDataGrid-row": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AcademicYearList;
