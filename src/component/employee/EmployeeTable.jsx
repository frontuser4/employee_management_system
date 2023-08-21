import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import dayjs from "dayjs";
import { getEmp } from "../../utils/api";
import { MonthDropDown, YearDropDown } from "../Dropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/api";

export const EmployeeTable = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);
  const { data } = useSelector((state) => state.login.data);
  const [filterApproval, setFilterApproval] = useState(null);
  const [uncheck, setCheck] = useState(null);

  const getEmployeData = async () => {
    try {
      const result = await getEmp(
        "/account/emplist",
        data.empId,
        data.desig,
        data.empGroup
      );
      setEmpData(result);
    } catch (error) {
      console.log("emp list error: ", error);
    }
  };

  const handleFilterApproval = async () => {
    try {
      const response = await axiosInstance.post(
        "/web/filter",
        {
          month,
          year,
          level: data.empGroup,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("filter: ", response.data.check);
      setCheck(response.data.uncheck);
      setFilterApproval(response.data.check);
    } catch (error) {
      console.log("filter approval error: ", error);
    }
  };

  useEffect(() => {
    getEmployeData();
  }, []);

  useEffect(() => {
    getEmployeData();
  }, [month, year]);

  const columns = [
    {
      accessorKey: "empId",
      header: "EmpId",
      Cell: ({ cell }) => {
        const checkapprove = filterApproval?.includes(cell.row.original.empId);
        const uncheckapprove = uncheck?.includes(cell.row.original.empId);
        return (
          <button
            onClick={() =>
              navigate(`/expence`, {
                state: {
                  emp: "emp",
                  empId: cell.row.original.empId,
                  empName: cell.row.original.name,
                  empDesig: cell.row.original.desig,
                  empHq: cell.row.original.hq,
                  empLevel: cell.row.original.empGroup,
                  month,
                  year,
                },
              })
            }
            className={
              checkapprove
                ? `bg-red-400 px-2 py-1 rounded`
                : uncheckapprove
                ? "bg-green-400 px-2 py-1 rounded"
                : "bg-cyan-400 px-2 py-1 rounded"
            }
          >
            {cell.getValue()}
          </button>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Emp Name",
    },
    {
      accessorKey: "desig",
      header: "Emp Designation",
    },
    {
      accessorKey: "hq",
      header: "Emp HQ",
    },
    {
      accessorKey: "empGroup",
      header: "Group",
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
            {data.empGroup === "level2" ||
            data.empGroup === "level3" ||
            data.empGroup === "level4" ? (
              <button
                onClick={() => navigate("/expence")}
                className="bg-cyan-500 p-2 rounded text-white"
              >
                Add Expence
              </button>
            ) : (
              <></>
            )}

            <button
              onClick={handleFilterApproval}
              className="bg-cyan-500 p-2 rounded text-white"
            >
              Filter By Approval
            </button>
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
