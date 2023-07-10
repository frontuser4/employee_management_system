import { useEffect, useState, useRef } from "react";
import "./style.css";
import { get, update } from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddForm from "../addform/AddForm";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSelector } from "react-redux";

const ExpenceTable = ({ year, month }) => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [closeUpdateForm, setCloseUpdateform] = useState(false);
  const [editData, setEditData] = useState(null);
  const [checked, setChecked] = useState(true);
  const [checkedRefresh, setCheckedRefresh] = useState(false);
  const [approval, setApproval] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.login.data);

  async function fetchData() {
    setLoading(true);
    const res = await get("/getput", data.empId, month, year);
    setTableData(res);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [month, year, closeUpdateForm, closeForm, checkedRefresh]);

  const handleEdit = (mydata) => {
    navigate("/updatetable", { state: { ...data, ...mydata } });
    setUpdateForm(true);
  };

  const handleClick = (expenceId) => {
    if (checked) {
      setApproval([
        ...approval,
        { expenceId: expenceId, approval: "approved" },
      ]);
    }
  };

  const handleSubmit = async () => {
    const updateRes = await update("/account/expence", { data: approval });
    toast.success(updateRes.data.message);
    setCheckedRefresh((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div>
          <button
            className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600"
            onClick={() => setOpenForm(true)}
          >
            <AddIcon />
            Add
          </button>
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

      {/* <div className="container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Name: {data.name}</th>
              <th>Designation: {data.desig}</th>
              <th>Emp Code: {data.empId}</th>
              <th>Head/Quarter/Area: {data.hq}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="text-center">Action</th>
              <th className="text-center">Date</th>
              <th className="text-center">Attendence</th>
              <th className="text-center">TC</th>
              <th className="text-center">PC</th>
              <th className="text-center">SALE</th>
              <th className="text-center">STOCKIST</th>
              <th className="text-center">MODE TRAVEL</th>
              <th className="text-center">DALY CONV</th>
              <th className="text-center">TRAVELING LONG</th>
              <th className="text-center">TRAVELING BOARDING</th>
              <th className="text-center">NIGHT ALLOWANCE</th>
              <th className="text-center">FOOD</th>
              <th className="text-center">FOODGST</th>
              <th className="text-center">INTERNET</th>
              <th className="text-center">PRINTING STATIONARY</th>
              <th className="text-center">POSTAGE COURIER</th>
              <th className="text-center">LOCAL CONVEY</th>
              <th className="text-center">WORKING HOURS</th>
              <th className="text-center">APPROVAL</th>
              <th className="text-center">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div style={{ width: "100%" }}>
                <Skeleton count={10} />
              </div>
            ) : (
              tableData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <button onClick={() => handleEdit(data)}>
                        <EditIcon />
                      </button>
                    </td>
                    <td className="text-center">{data.dateExp}</td>
                    <td className="text-center">{data.attendance}</td>
                    <td className="text-center">{data.tc}</td>
                    <td className="text-center">{data.pc}</td>
                    <td className="text-center">{data.sale}</td>
                    <td className="text-center">{data.payer__payerId}</td>
                    <td className="text-center">{data.modeTravel}</td>
                    <td className="text-center">{data.dailyConv}</td>
                    <td className="text-center">{data.travelingLong}</td>
                    <td className="text-center">{data.lodginBoardig}</td>
                    <td className="text-center">{data.nightAllowance}</td>
                    <td className="text-center">{data.food}</td>
                    <td className="text-center">{data.foodGST}</td>
                    <td className="text-center">{data.internet}</td>
                    <td className="text-center">{data.printingStationary}</td>
                    <td className="text-center">{data.postageCourier}</td>
                    <td className="text-center">{data.localConv}</td>
                    <td className="text-center">{data.workingHr}</td>
                    <td className="flex items-center gap-2">
                      {data.approval}
                      <div>
                        <input
                          type="checkbox"
                          value={checked}
                          className="w-4"
                          onChange={(e) => setChecked(e.target.checked)}
                          onClick={() => handleClick(data.expenceId)}
                        />
                      </div>
                    </td>
                    <td className="text-center">{`${
                      data.dailyConv +
                      data.travelingLong +
                      data.lodginBoardig +
                      data.nightAllowance +
                      data.food +
                      data.foodGST +
                      data.internet +
                      data.printingStationary +
                      data.postageCourier +
                      data.localConv
                    }`}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div> */}

      <table>
        <thead>
          <tr>
            <th colSpan={4}>Name: {data.name}</th>
            <th colSpan={4}>Designation: {data.desig}</th>
            <th colSpan={4}>Emp Code: {data.empId}</th>
            <th colSpan={4}>Head/Quarter/Area: {data.hq}</th>
          </tr>
          <tr>
            <th className="text-center">Action</th>
            <th className="text-center" >Date</th>
            <th className="text-center">Attendence</th>
            <th className="text-center">TC</th>
            <th className="text-center">PC</th>
            <th className="text-center">SALE</th>
            <th className="text-center">STOCKIST</th>
            <th className="text-center">MODE TRAVEL</th>
            <th className="text-center">DALY CONV</th>
            <th className="text-center">TRAVELING LONG</th>
            <th className="text-center">TRAVELING BOARDING</th>
            <th className="text-center">NIGHT ALLOWANCE</th>
            <th className="text-center">FOOD</th>
            <th className="text-center">FOODGST</th>
            <th className="text-center">INTERNET</th>
            <th className="text-center">PRINTING STATIONARY</th>
            <th className="text-center">POSTAGE COURIER</th>
            <th className="text-center">LOCAL CONVEY</th>
            <th className="text-center">WORKING HOURS</th>
            <th className="text-center">APPROVAL</th>
            <th className="text-center">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div style={{ width: "100%" }}>
              <Skeleton count={10} />
            </div>
          ) : (
            tableData?.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">
                    <button onClick={() => handleEdit(data)}>
                      <EditIcon />
                    </button>
                  </td>
                  <td className="text-center" style={{ fontSize: "14px" }}>
                    {data.dateExp}
                  </td>
                  <td className="text-center">{data.attendance}</td>
                  <td className="text-center">{data.tc}</td>
                  <td className="text-center">{data.pc}</td>
                  <td className="text-center">{data.sale}</td>
                  <td className="text-center">{data.payer__payerId}</td>
                  <td className="text-center">{data.modeTravel}</td>
                  <td className="text-center">{data.dailyConv}</td>
                  <td className="text-center">{data.travelingLong}</td>
                  <td className="text-center">{data.lodginBoardig}</td>
                  <td className="text-center">{data.nightAllowance}</td>
                  <td className="text-center">{data.food}</td>
                  <td className="text-center">{data.foodGST}</td>
                  <td className="text-center">{data.internet}</td>
                  <td className="text-center">{data.printingStationary}</td>
                  <td className="text-center">{data.postageCourier}</td>
                  <td className="text-center">{data.localConv}</td>
                  <td className="text-center">{data.workingHr}</td>
                  <td className="flex items-center gap-2">
                    {data.approval}
                    <div>
                      <input
                        type="checkbox"
                        value={checked}
                        className="w-4"
                        onChange={(e) => setChecked(e.target.checked)}
                        onClick={() => handleClick(data.expenceId)}
                      />
                    </div>
                  </td>
                  <td className="text-center">{`${
                    data.dailyConv +
                    data.travelingLong +
                    data.lodginBoardig +
                    data.nightAllowance +
                    data.food +
                    data.foodGST +
                    data.internet +
                    data.printingStationary +
                    data.postageCourier +
                    data.localConv
                  }`}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-4 text-white">
        <button
          className="bg-cyan-500 px-3 py-1 rounded"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>

      <AddForm
        open={openForm}
        setOpen={setOpenForm}
        setCloseForm={setCloseForm}
      />
      <Toaster position="top-center" />
    </>
  );
};

export default ExpenceTable;
