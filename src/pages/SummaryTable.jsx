import { useState, useEffect, useRef } from "react";
import {
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
import dayjs from "dayjs";
import { MonthDropDown, YearDropDown } from "../component/Dropdown";
import Loader from '../component/loader/Loader';

export default function SummaryTable() {
  const tableRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [summeryDetails, setSummeryDetails] = useState(null);
  const [summeryTotal, setSummeryTotal] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);
  const [isLoading, setIsLoading] = useState(true);
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSummery = async () => {
    try {
      const response = await axiosInstance.get("/web/getsummery", {
        params: { month, year },
      });
      setSummeryDetails(response.data.data);
      setSummeryTotal(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("summery error: ", error);
    }
  };

  useEffect(() => {
    getSummery();
  }, [month, year]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <div>
          <MonthDropDown
            label="Summary Month"
            month={month}
            setMonth={setMonth}
          />
        </div>
        <div>
          <YearDropDown label="Summary Year" year={year} setYear={setYear} />
        </div>
        <div>
          <DownloadTableExcel
            filename="employee table"
            sheet="employee"
            currentTableRef={tableRef.current}
          >
            <button className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600">
              Export Data
            </button>
          </DownloadTableExcel>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                <TableCell>Final DA</TableCell>
                <TableCell>Final TA</TableCell>
                <TableCell>Final Other Expenses</TableCell>
                <TableCell>Final Claimed Amount</TableCell>
                <TableCell>Approved Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                  <Loader />
                  </div>
                </>
              ) : (
                <>
                  {summeryDetails
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{row.empId}</TableCell>
                          <TableCell>{row.sum_DA}</TableCell>
                          <TableCell>{row.sum_TA}</TableCell>
                          <TableCell>{row.sum_OTHR}</TableCell>
                          <TableCell>{row.sum_AMT}</TableCell>
                          <TableCell>{row.sum_AMT_APPROVED}</TableCell>
                        </TableRow>
                      );
                    })}
                </>
              )}

              <TableRow>
                <TableCell>Grand Total</TableCell>
                <TableCell>{summeryTotal?.DA}</TableCell>
                <TableCell>{summeryTotal?.TA}</TableCell>
                <TableCell>{summeryTotal?.OTHERS}</TableCell>
                <TableCell>{summeryTotal?.AMOUNT_CLAIMED}</TableCell>
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
    </>
  );
}
