import { useEffect, useState, useRef } from "react";
import "./style.css";
import { get } from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddForm from "../addform/AddForm";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSelector } from "react-redux";
import ImagePreview from "../ImagePreview";

const ExpenceTable = ({ year, month }) => {

  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState(false);
  const [changeLogsData, setChangeLogsData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.login.data);

  async function fetchData() {
    setLoading(true);
    const res = await get("/getput", data.empId, month, year);
    setTableData(res.data);
    setChangeLogsData(res.data_log);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [month, year, closeForm]);

  const handleEdit = (mydata) => {
    navigate("/updatetable", { state: { ...data, ...mydata } });
    setUpdateForm(true);
  };

  const handlePreviewImage = (imgpath) => {
     setPreviewImage(true)
     setPreviewImageFile(`${imgpath}`)
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
      <table ref={tableRef}>
        <thead>
          <tr>
            <th colSpan={4}>Name: {data.name}</th>
            <th colSpan={4}>Designation: {data.desig}</th>
            <th colSpan={4}>Emp Code: {data.empId}</th>
            <th colSpan={4}>Head/Quarter/Area: {data.hq}</th>
          </tr>
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
                  <td className="text-center">
                    {data.food}
                    <button
                      className="bg-cyan-500 mt-2 p-1 rounded"
                      onClick={() => handlePreviewImage(data.foodFile)}
                    >
                      preview
                    </button>
                  </td>
                  <td className="text-center">
                    {data.foodGST}
                    <button
                      className="bg-cyan-500 mt-2 p-1 rounded"
                      onClick={() => handlePreviewImage(data.foodGstFile)}
                    >
                      preview
                    </button>
                  </td>
                  <td className="text-center">{data.internet}</td>
                  <td className="text-center">{data.printingStationary}</td>
                  <td className="text-center">{data.postageCourier}</td>
                  <td className="text-center">{data.localConv}</td>
                  <td className="text-center">{data.workingHr}</td>
                  <td>
                    {data.approval}
                    {/* <div>
                      <input
                        type="checkbox"
                        value={checked}
                        className="w-4"
                        onChange={(e) => setChecked(e.target.checked)}
                        onClick={() => handleClick(data.expenceId)}
                      />
                    </div> */}
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
      {/* <table className="my-8">
        <thead>
          <tr>
            <th colSpan={2}>Attendance</th>
            <th colSpan={2}>Distance</th>
          </tr>
          <tr>
            <th>New Attendance</th>
            <th>Old Attendance</th>
            <th>Old Distance</th>
            <th>New Distance</th>
            <th>DateExp</th>
            <th>Desig</th>
          </tr>
        </thead>
        <tbody>
         {
           changeLogsData?.map((data, i)=>{
             return (
              <tr key={i}>
              <td>{data.attendance?.oldPara}</td>
              <td>{data.attendance?.newPara}</td>
              <td>{data.distance?.oldPara}</td>
              <td>{data.distance?.newPara}</td>
              <td>{data.dateExp}</td>
              <td>{data.desig}</td>
             </tr>
             )
           })
         }
        </tbody>
      </table> */}
      <div className="flex bg-slate-800 p-4 gap-4 my-8">
        {changeLogsData?.map((data, i) => {
          return (
            <>
              <div className="bg-teal-600 p-2 rounded text-white flex flex-col">
                <p>{data.dateExp}</p>
                {data.attendance?.oldPara &&
                data.attendance?.newPara == undefined ? (
                  <></>
                ) : (
                  <div className="bg-pink-500">
                    <span>Attendance</span>
                    <span className="mx-1">|</span>
                    <span>{data.attendance?.oldPara}</span>
                    <span className="mx-1">|</span>
                    <span>{data.attendance?.newPara}</span>
                    <span className="mx-1">|</span>
                    <span>{data.desig}</span>
                  </div>
                )}

                <div className="bg-teal-700">
                  <span>Distance</span>
                  <span className="mx-1">|</span>
                  <span>{data.distance?.oldPara}</span>
                  <span className="mx-1">|</span>
                  <span>{data.distance?.newPara}</span>
                  <span className="mx-1">|</span>
                  <span>{data.desig}</span>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <AddForm
        open={openForm}
        setOpen={setOpenForm}
        setCloseForm={setCloseForm}
      />
      <ImagePreview
        open={previewImage}
        setOpen={setPreviewImage}
        imageurl={previewImageFile}
      />
      <Toaster position="top-center" />
    </>
  );
};

export default ExpenceTable;
