import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import dayjs from "dayjs";
import { getEmp } from "../../utils/api";
import { MonthDropDown, YearDropDown } from "../Dropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const EmployeeTable = () => {

  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);
  const { data } = useSelector((state) => state.login.data);

  const getEmployeData = async () => {
    const result = await getEmp("/account/emplist", data.empId, data.desig);
    setEmpData(result);
  };

  useEffect(() => {
    getEmployeData();
  }, []);

  useEffect(() => {
    getEmployeData();
  }, [month, year]);

  const columns = [
    {
      accessorKey: "empId__empId",
      header: "EmpId",
      Cell: ({ cell }) => {
        return (
          <button
            onClick={() =>
              navigate(`/expence`, {
                state: {
                  emp: "emp",
                  empId: cell.row.original.empId__empId,
                  empName: cell.row.original.empId__name,
                  empDesig: cell.row.original.empId__desig,
                  empHq: cell.row.original.empId__hq,
                  month,
                  year,
                },
              })
            }
            className="bg-cyan-400 px-2 py-1 rounded"
          >
            {cell.getValue()}
          </button>
        );
      },
    },
    {
      accessorKey: "empId__name",
      header: "Emp Name",
    },
    {
      accessorKey: "empId__desig",
      header: "Emp Designation",
    },
    {
      accessorKey: "empId__hq",
      header: "Emp HQ",
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={empData ?? []}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar
      muiTableBodyRowProps={{ hover: false }}
      renderTopToolbarCustomActions={() => (
        <>
          <div className="flex items-center gap-4">
            <div>
              <MonthDropDown month={month} setMonth={setMonth} />
            </div>
            <div>
              <YearDropDown year={year} setYear={setYear} />
            </div>
            {["ASM", "Sr.ASM", "RMS", "AASM", "SM", "HOD"].includes(data.desig) ? (
              <button
                onClick={() => navigate("/expence")}
                className="bg-cyan-500 p-2 rounded text-white"
              >
                Add Expence
              </button>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      muiTableProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
        },
      }}
    />
  );
};

export default EmployeeTable;
