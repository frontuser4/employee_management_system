import { useEffect, useState, useRef } from "react";
import "./style.css";
import { get, post } from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";
import AddForm from "../addform/AddForm";
import "react-loading-skeleton/dist/skeleton.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSelector, useDispatch } from "react-redux";
import ImagePreview from "../ImagePreview";
import { expenceData } from "../../store/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../loader/Loader";
import { useContext } from "react";
import { DateTimeContext } from "../../context/dateTimeContext";
import axios from "axios";

const ExpenceTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { state } = useLocation();
  const { data } = useSelector((state) => state.login.data);
  const [tableData, setTableData] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState(false);
  const [changeLogsData, setChangeLogsData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(null);
  const [editFlag, setEditFlag] = useState(null);
  const [displayFlag, setDisplayFlag] = useState(null);
  const [totalExpData, setTotalExpData] = useState(null);
  const [approvalRefresh, setApprovalRefresh] = useState(false);
  const { month, year } = useContext(DateTimeContext);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);

    const expData = {};

    if (state?.emp === "emp") {
      expData.empId = state.empId;
      expData.month = month;
      expData.year = year;
      expData.user = data?.empGroup;
    } else {
      expData.empId = data.empId;
      expData.month = month;
      expData.year = year;
      expData.user = data?.empGroup;
    }

    try {
      const res = await get(
        "/web/getexpense",
        expData.empId,
        expData.month,
        expData.year,
        expData?.user
      );

      setTableData(res.data);
      dispatch(expenceData(res.data));
      setChangeLogsData(res.data_log);
      setGrandTotal(res.grand_total);
      setEditFlag(res.editFlag);
      setDisplayFlag(res.displayFlag);
      setTotalExpData(res);
      setLoading(false);
    } catch (error) {
      console.log("expence get error: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [month, year, closeForm, approvalRefresh]);

  const handleEdit = (mydata) => {
    navigate("/dashboard/update-expence", { state: { ...state, ...mydata } });
  };

  const handlePreviewImage = (imgpath) => {
    setPreviewImage(true);
    setPreviewImageFile(`${imgpath}`);
  };

  const approveHandler = async () => {
    let id = state?.emp === "emp" ? state.empId : data.empId;
    let emplevel = state?.emp === "emp" ? state.empLevel : data.empGroup;
    let approvedata = {
      empId: id,
      month,
      year,
      empLevel: emplevel,
      submitby: data.empGroup,
    };

    try {
      const res = await post("/web/approval", approvedata);
      setApprovalRefresh((prev) => !prev);
      if (res.data.status === "200") {
        toast.success(res.data.data);
      }
    } catch (error) {
      console.log("approval error: ", error);
    }
  };

  const handleResetAproval = async () => {
    let id = state?.emp === "emp" ? state.empId : data.empId;
    let empLevel = state?.emp === "emp" ? state.empLevel : data.empGroup;

    let approvedata = {
      empId: id,
      month,
      year,
      empLevel,
      submitby: data.empGroup,
    };

    try {
      const res = await post("/web/reset", approvedata);
      setApprovalRefresh((prev) => !prev);
      if (res.data.status === "200") {
        toast.success(res.data.data);
      }
    } catch (error) {
      console.log("approval reset error: ", error);
    }
  };

  const handleExport = async () => {
    const expData = {};

    if (state?.emp === "emp") {
      expData.empId = state.empId;
      expData.empDesig = state.empDesig;
      expData.empName = state.empName;
      expData.empArea = state.empHq;
      expData.empMonth = month;
      expData.empYear = year;
      expData.empLevel = data?.empGroup;
    } else {
      expData.empId = data.empId;
      expData.empDesig = data.desig;
      expData.empName = data.name;
      expData.empArea = data.hq;
      expData.empMonth = month;
      expData.empYear = year;
      expData.empLevel = data?.empGroup;
    }

    try {
      const response = await axios.get(
        `http://192.168.0.120:8000/web/exportdata`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          params: {
            ...expData,
          },
        }
      );

      const a = document.createElement("a");
      a.href = `http://192.168.0.120:8000/${response.data.file}`;
      a.download = "downloaded-file.xlsx"; // Set the file name
      a.click();
    } catch (error) {
      if (error.response.data.status === 404) {
        setError({
          status: error.response.data.status,
          message: error.response.data.status.message,
        });
      }
      console.log("export error: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex flex-row gap-2 items-center md:flex md:gap-2">
          <div>
            {state?.emp === "emp" ? (
              <></>
            ) : (
              <button
                className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600 cursor-pointer"
                onClick={() => setOpenForm(true)}
                disabled={editFlag === false ? true : false}
              >
                <AddIcon />
                Add
              </button>
            )}
          </div>
          <div>
            {/* <DownloadTableExcel
              filename="expense-data"
              sheet="expense-data"
              currentTableRef={tableRef.current}
            > */}
            <button
              disabled={tableData === null || tableData?.length === 0 ? true : false}
              onClick={handleExport}
              className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600"
            >
              Export Data
            </button>
            {/* </DownloadTableExcel> */}
          </div>
          <div>
            {data.empGroup === "level4" ? (
              <>
                {editFlag ? (
                  <>
                    <button
                      className="bg-cyan-500 px-3 py-1 text-lg rounded text-white cursor-pointer"
                      onClick={approveHandler}
                    >
                      Approval Submit
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div id="table-scroll" className="table-scroll">
        <table ref={tableRef} id="main-table">
          <thead>
            <tr className="expBrand">
              <th colSpan={27} className="text-4xl">
                Sapat International Pvt. Ltd - Monthly Expenses
              </th>
            </tr>
            {state?.emp === "emp" ? (
              <tr className="expEmpData">
                <th colSpan={4}>Name: {state.empName}</th>
                <th colSpan={4}>Designation: {state.empDesig}</th>
                <th colSpan={4}>Emp Code: {state.empId}</th>
                <th colSpan={4}>Head/Quarter/Area: {state.empHq}</th>
                <th colSpan={4}>Month: {month}</th>
                <th colSpan={4}>Year: {year}</th>
                <th colSpan={4}>
                  {data.empGroup === "level3" ? (
                    <button
                      onClick={handleResetAproval}
                      className="bg-[#0ea5e9] px-3 py-1 text-md rounded text-white mb-2 hover:bg-cyan-600"
                    >
                      Reset Approval
                    </button>
                  ) : (
                    <></>
                  )}
                </th>
              </tr>
            ) : (
              <tr className="expEmpData">
                <th colSpan={4}>Name: {data?.name}</th>
                <th colSpan={4}>Designation: {data?.desig}</th>
                <th colSpan={4}>Emp Code: {data?.empId}</th>
                <th colSpan={4}>Head/Quarter/Area: {data?.hq}</th>
                <th colSpan={4}>Month: {month}</th>
                <th colSpan={4}>Year: {year}</th>
                <th colSpan={4}>
                  {data.empGroup === "level3" ? (
                    <button
                      onClick={handleResetAproval}
                      className="bg-[#0ea5e9] px-3 py-1 text-md rounded text-white mb-2 hover:bg-cyan-600"
                    >
                      Reset Approval
                    </button>
                  ) : (
                    <></>
                  )}
                </th>
              </tr>
            )}

            <tr className="expHeader">
              <th className="text-center">Action</th>
              <th className="text-center">Date</th>
              <th className="text-center">Attendence</th>
              <th className="text-center">TC</th>
              <th className="text-center">PC</th>
              <th className="text-center">SALE</th>
              <th className="text-center">STOCKIST</th>
              <th className="text-center">TOWN MARKET WORKED</th>
              <th className="text-center">TRAVEL FROM</th>
              <th className="text-center">TRAVEL TO</th>
              <th className="text-center">MODE TRAVEL</th>
              <th className="text-center">ONE SIDE KM</th>
              <th className="text-center">DALY CONV</th>
              <th className="text-center">LOCAL CONVEY</th>
              <th className="text-center">TRAVELING LONG</th>
              <th className="text-center">LODGIN BOARDING</th>
              <th className="text-center">FOOD</th>
              <th className="text-center">FOOD GST</th>
              <th className="text-center">NIGHT ALLOWANCE</th>
              <th className="text-center"> NET/MOBILE</th>
              <th className="text-center">POSTAGE COURIER</th>
              <th className="text-center">PRINTING STATIONARY</th>
              <th className="text-center">OTHER</th>
              <th className="text-center">OTHER GST</th>
              {/* <th className="text-center">WORKING HOURS</th> */}
              <th className="text-center">
                APPROVAL
                {data.empGroup !== "level4" ? (
                  <>
                    {editFlag ? (
                      <>
                        <button
                          className="bg-cyan-500 px-3 py-1 text-lg rounded text-white cursor-pointer"
                          onClick={approveHandler}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th className="text-center">TOTAL</th>
            </tr>
          </thead>
          {displayFlag ? (
            <tbody>
              {loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                tableData?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <button
                          onClick={() => handleEdit(data)}
                          disabled={editFlag ? false : true}
                        >
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
                      <td className="text-center">{data.payer}</td>
                      <td className="text-center">{data.townMarketWork}</td>
                      <td className="text-center">{data.travelSource}</td>
                      <td className="text-center">{data.travelDestination}</td>
                      <td className="text-center">{data.modeTravel}</td>
                      <td className="text-center">
                        {data.distance}
                        {data.distanceFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() =>
                              handlePreviewImage(data.distanceFile)
                            }
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">{data.dailyConv}</td>
                      <td className="text-center">{data.localConv}</td>
                      <td className="text-center">{data.travelingLong}</td>
                      <td className="text-center">
                        {data.lodginBoardig}

                        {data.lodgingBillFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() =>
                              handlePreviewImage(data.lodgingBillFile)
                            }
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">
                        {data.food}
                        {data.foodFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() => handlePreviewImage(data.foodFile)}
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">
                        {data.foodGST}
                        {data.foodGstFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() => handlePreviewImage(data.foodGstFile)}
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">{data.nightAllowance}</td>
                      <td className="text-center">
                        {data.internet}
                        {data.mobileBillFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() =>
                              handlePreviewImage(data.mobileBillFile)
                            }
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">
                        {data.postageCourier}
                        {data.courierBillFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() =>
                              handlePreviewImage(data.courierBillFile)
                            }
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">
                        {data.printingStationary}
                        {data.stationaryBillFile !== null ? (
                          <button
                            className="bg-cyan-500 mt-2 p-1 rounded"
                            onClick={() =>
                              handlePreviewImage(data.stationaryBillFile)
                            }
                          >
                            preview
                          </button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="text-center">{data.other}</td>
                      <td className="text-center">{data.otherGst}</td>
                      {/* <td className="text-center">{data.workingHr}</td> */}
                      <td>{data.approval}</td>
                      <td className="text-center">{data.total}</td>
                    </tr>
                  );
                })
              )}
              <tr>
                <td colSpan={3} className="font-bold">
                  Grand Total
                </td>
                <td className="text-center font-bold"></td>
                <td className="text-center font-bold"></td>
                <td className="text-center font-bold"></td>
                <td colSpan={5}></td>
                <td className="text-center font-bold"></td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_dailyConv}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_localConv}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_travelingLong}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_lodginBoardig}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_food}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_foodGst}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_nightAllowance}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_internet}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_postageCourier}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_printingStationary}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_other}
                </td>
                <td className="text-center font-bold">
                  {totalExpData?.sum_otherGst}
                </td>
                <td className="text-center font-bold"></td>

                <td className="text-center font-bold">{grandTotal}</td>
              </tr>
              <tr>
                <td colSpan={26}></td>
              </tr>
              <tr>
                <td colSpan={5} className="font-bold">
                  Prepared By:{" "}
                  {state?.emp === "emp" ? state?.empName : data?.name}
                </td>
                <td colSpan={5} className="font-bold">
                  ASM :
                </td>
                <td colSpan={5} className="font-bold">
                  Check By: Suhas Ghare
                </td>
                <td colSpan={5} className="font-bold">
                  RSM : Jotiram Ghanawat
                </td>
                <td colSpan={6} className="font-bold">
                  Account : Arjun / Mahesh Wagh
                </td>
              </tr>
              <tr>
                <td colSpan={20}></td>
                <td colSpan={6} className=" font-bold font-serif italic">
                  This is computer generated no signature required
                </td>
              </tr>
            </tbody>
          ) : (
            <></>
          )}
        </table>
      </div>

      {tableData?.length <= 0 ? (
        <p className="text-center bg-slate-500 w-full h-3/4 text-white text-3xl p-24">
          data not found
        </p>
      ) : (
        <></>
      )}

      {tableData?.length <= 0 ? (
        <></>
      ) : (
        <div className="flex bg-slate-800 p-4 gap-4 my-8">
          <div className=" p-2 rounded text-white flex gap-3 flex-wrap">
            {changeLogsData?.map((data, index) => {
              return (
                <div key={index} className="bg-teal-600 p-2 rounded">
                  <p>Date : {data?.dateExp}</p>
                  <span>ChangeBy: {data?.changedBy}</span>
                  <p>{data.message}</p>
                  {data?.changes?.map((data, index) => {
                    return (
                      <div className="bg-pink-500 p-1 rounded" key={index}>
                        <span>{data?.item}</span>
                        <span className="mx-1">|</span>
                        <span>{data?.oldPara}</span>
                        <span className="mx-1">|</span>
                        <span>{data?.newPara}</span>
                        <span className="mx-1">|</span>
                        <span>{data?.desig}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <AddForm
        open={openForm}
        setOpen={setOpenForm}
        setCloseForm={setCloseForm}
        empData={state}
      />

      <ImagePreview
        open={previewImage}
        setOpen={setPreviewImage}
        imageurl={previewImageFile}
      />

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ExpenceTable;
