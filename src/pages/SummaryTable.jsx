import { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axiosInstance from "../utils/axios";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "../component/loader/Loader";
import { DateTimeContext } from "../context/dateTimeContext";
import { useSelector } from "react-redux";
import { post } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

export default function SummaryTable() {
  const { data } = useSelector((state) => state.login.data);
  const { empData } = useSelector((state) => state.empData);
  const tableRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [summeryDetails, setSummeryDetails] = useState(null);
  const [summeryTotal, setSummeryTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [approvalRefresh, setApprovalRefresh] = useState(false);
  const { month, year } = useContext(DateTimeContext);
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const filteredSummery = empData.filter((obj1) => {
    return summeryDetails?.find((obj2) => obj2.empId === obj1.empId);
  });

  const filterEmpName = filteredSummery?.map((data) => ({
    empId: data.empId,
    name: data.name,
  }));

  const filterSummery = summeryDetails?.map((item, index) => ({
    ...item,
    ...filterEmpName[index],
  }));

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSummery = async () => {
    try {
      const response = await axiosInstance.get("/web/getsummery", {
        params: { month, year, user: data.empGroup },
      });
      setSummeryDetails(response.data.data);
      setSummeryTotal(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("summery error: ", error);
    }
  };

  const approveHandler = async (empId) => {
    let approvedata = {
      empId: empId,
      month,
      year,
      submitby: data.empGroup,
    };

    try {
      const res = await post("/web/approval", approvedata);
      if (res.data.status === 200) {
        // toast.success(res.data.data);
        setApprovalRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log("approval error: ", error);
    }
  };

  useEffect(() => {
    getSummery();
  }, [month, year, approvalRefresh]);

  const handleLockExpense = (id) => {
    approveHandler(id);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <div>
          <DownloadTableExcel
            filename="summery-data"
            sheet="summery-data"
            currentTableRef={tableRef.current}
          >
            <button className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600">
              Export Data
            </button>
          </DownloadTableExcel>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" ref={tableRef}>
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableRow-root": {
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>EmpId</TableCell>
                <TableCell>Emp Name</TableCell>
                <TableCell>Daily Conveynce</TableCell>
                <TableCell>Total Travel</TableCell>
                <TableCell>Total Tel</TableCell>
                <TableCell>Postage</TableCell>
                <TableCell>Stationary</TableCell>
                <TableCell>Final Claim Amount</TableCell>
                <TableCell>Total Deducation</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Approved Amount</TableCell>
                <TableCell>Last Updated</TableCell>
                {data.empGroup === "level6" ? (
                  <TableCell>Lock Expense</TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableCell colSpan={12} className="flex justify-center">
                    <Loader />
                  </TableCell>
                </>
              ) : (
                <>
                  {filterSummery
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{row.empId}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.sum_DA}</TableCell>
                          <TableCell>{row.SUM_travel}</TableCell>
                          <TableCell>{row.SUM_total_tel}</TableCell>
                          <TableCell>{row.SUM_postage}</TableCell>
                          <TableCell>{row.SUM_stationary}</TableCell>
                          <TableCell>{row.sum_AMT}</TableCell>
                          <TableCell>{row.sum_AMT_DEDUCTED}</TableCell>
                          <TableCell>{row.AMT_PAID}</TableCell>
                          <TableCell>{row.sum_AMT_APPROVED}</TableCell>
                          <TableCell>{row.lastUpdate}</TableCell>
                          {data.empGroup === "level6" ? (
                            <TableCell>
                              <Button
                                onClick={() => {
                                  console.log("delted");
                                  toast.error("expense data locked");
                                  handleLockExpense(row.empId);
                                }}
                                disabled={row.lockButton ? true : false}
                                color="primary"
                                variant="contained"
                              >
                                Lock
                              </Button>
                            </TableCell>
                          ) : (
                            <></>
                          )}
                        </TableRow>
                      );
                    })}
                </>
              )}

              <TableRow>
                <TableCell>Grand Total</TableCell>
                <TableCell>{summeryTotal?.DA}</TableCell>
                <TableCell>{summeryTotal?.TA}</TableCell>
                <TableCell>{summeryTotal?.TOTAL_travel}</TableCell>
                <TableCell>{summeryTotal?.TOTAL_tel}</TableCell>
                <TableCell>{summeryTotal?.TOTAL_postage}</TableCell>
                <TableCell>{summeryTotal?.TOTAL_stationary}</TableCell>
                <TableCell>{summeryTotal?.AMOUNT_CLAIMED}</TableCell>
                <TableCell>{summeryTotal?.DEDUCTED}</TableCell>
                <TableCell>{summeryTotal?.TOTAL_paid}</TableCell>
                <TableCell>{summeryTotal?.AMOUNT_APPROVED}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={5}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Toaster position="top-center" />
    </>
  );
}
