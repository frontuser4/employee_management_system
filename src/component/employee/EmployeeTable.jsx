import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import dayjs from "dayjs";
import { getEmp } from "../../utils/api";
import { MonthDropDown, YearDropDown } from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/api";

export const EmployeeTable = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);
  const { data } = useSelector((state) => state.login.data);
  const [filterApproval, setFilterApproval] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterData = empData.filter((items1) =>
    filterApproval?.some((items2) => {
      return items1.empId === items2.empId;
    })
  );

  const getEmployeData = async () => {
    try {
      const result = await getEmp(
        "/account/emplist",
        data.empId,
        data.desig,
        data.empGroup
      );
      setEmpData(result);
      setIsLoading(false)
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

      setFilterApproval(response.data.empList);
    } catch (error) {
      console.log("filter approval error: ", error);
    }
  };

 
  useEffect(() => {
    getEmployeData();
    handleFilterApproval();
  }, [month, year]);

  const columns = [
    {
      accessorKey: "empId",
      header: "EmpId",
      Cell: ({ cell }) => {
        let color;
        filterApproval?.forEach((val) => {
          if (val.empId === cell.row.original.empId) {
            color = val.color;
          }
        });
        return (
          <button
            onClick={() =>
              navigate(`/dashboard/expense`, {
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
            style={{
              background: `${filterData?.length === 0 ? 'white' : color}`,
              padding: "10px 20px",
              borderRadius: "10px",
              color: "#000",
              cursor: "pointer",
              textAlign: "center",
              border: "none",
            }}
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
    {
      accessorKey: "salesGroup",
      header: "Sales Group",
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data?.empGroup === "level3" ? empData : filterData}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar
      state={{isLoading: isLoading}}
      muiTableBodyRowProps={{ hover: false }}
      renderTopToolbarCustomActions={() => (
        <>
         
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div>
              <MonthDropDown label="Filter Month" month={month} setMonth={setMonth} />
            </div>
            <div>
              <YearDropDown label="Filter Year" year={year} setYear={setYear} />
            </div>
            {data.empGroup === "level2" ||
            data.empGroup === "level3" ||
            data.empGroup === "level4" ? (
              <>
                <button
                  onClick={() => navigate("/dashboard/expense")}
                  className="bg-cyan-500 p-1 md:p-2 rounded text-white"
                >
                  Add / View Expence
                </button>
              </>
            ) : (
              <></>
            )}

            {data.empGroup === "level3" ||
            data.empGroup === "level4" ||
            data.empGroup === "level5" ? (
              <>
                <button
                  onClick={() => navigate("/dashboard/summary-expense", {state:{month, year}})}
                  className="bg-cyan-500 p-2 rounded text-white"
                >
                  Get Summary
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      muiTableProps={{
        sx: {
          border: "1px solid rgba(81, 81, 81, 1)",
          overflowX: "scroll",
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
