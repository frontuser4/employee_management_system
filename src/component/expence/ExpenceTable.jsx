import { useEffect, useState, useRef } from "react";
import "./style.css";
import { get, post } from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddForm from "../addform/AddForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSelector, useDispatch } from "react-redux";
import ImagePreview from "../ImagePreview";
import { expenceData } from "../../store/loginSlice";
import toast, { Toaster } from "react-hot-toast";

const ExpenceTable = ({ year, month }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState(false);
  const [changeLogsData, setChangeLogsData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(null);
  const [btnFlag, setBtnFlag] = useState(null);
  const { data } = useSelector((state) => state.login.data);

  async function fetchData() {
    setLoading(true);
    const res = await get("/getput", data.empId, month, year);
    setTableData(res.data);
    dispatch(expenceData(res.data));
    setChangeLogsData(res.data_log);
    setGrandTotal(res.grand_total);
    setBtnFlag(res.buttonFlag);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [month, year, closeForm]);

  const handleEdit = (mydata) => {
    navigate("/updatetable", { state: { ...data, ...mydata } });
  };

  const handlePreviewImage = (imgpath) => {
    setPreviewImage(true);
    setPreviewImageFile(`${imgpath}`);
  };

  const approveHandler = async () => {
    console.log("btnFlag: ", btnFlag)
    let approvedata = {
      empId: data.empId,
      month,
      year,
      submitby: data.desig,
    };
    const res = await post("/approval", approvedata);
    if (res.data.status === "200") {
      toast.success(res.data.data);
      setCloseForm((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div>
          {data.desig === "TSO" ? (
            <button
              className="bg-[#0ea5e9] px-3 py-1 text-lg rounded text-white mb-2 hover:bg-cyan-600"
              onClick={() => setOpenForm(true)}
            >
              <AddIcon />
              Add
            </button>
          ) : (
            <></>
          )}
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

      <table ref={tableRef}>
        <thead>
          <tr>
            <th colSpan={16}>Sapat International Pvt. Ltd.</th>
          </tr>
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
            <th className="text-center">TOWN MARKET WORKED</th>
            <th className="text-center">TRAVEL FROM</th>
            <th className="text-center">TRAVEL TO</th>
            <th className="text-center">MODE TRAVEL</th>
            <th className="text-center">KM</th>
            <th className="text-center">DALY CONV</th>
            <th className="text-center">LOCAL CONVEY</th>
            <th className="text-center">TRAVELING LONG</th>
            <th className="text-center">LODGIN BOARDING</th>
            <th className="text-center">FOOD</th>
            <th className="text-center">FOOD GST</th>
            <th className="text-center">NIGHT ALLOWANCE</th>
            <th className="text-center">INTERNET</th>
            <th className="text-center">POSTAGE COURIER</th>
            <th className="text-center">PRINTING STATIONARY</th>
            <th className="text-center">OTHER</th>
            <th className="text-center">OTHER GST</th>
            <th className="text-center">WORKING HOURS</th>
            <th className="text-center">
              APPROVAL
              { btnFlag === false  ? (
                <button
                  className="bg-rose-500 px-3 rounded text-white"
                  disabled={true}
                >
                  Already submit
                </button>
              ) : (
                <>
                 <button
                  className="bg-cyan-500 px-3 rounded text-white"
                  onClick={approveHandler}
                >
                 submit
                </button>
                </>
              )}
            </th>
            <th className="text-center">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>
              <Skeleton count={10} width={1200} />
            </div>
          ) : (
            tableData?.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(data)}
                      disabled={data.approval === "pending" ? true : false}
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
                        onClick={() => handlePreviewImage(data.distanceFile)}
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
                        onClick={() => handlePreviewImage(data.lodgingBillFile)}
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
                        onClick={() => handlePreviewImage(data.mobileBillFile)}
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
                        onClick={() => handlePreviewImage(data.courierBillFile)}
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
                  <td className="text-center">{data.workingHr}</td>
                  <td>{data.approval}</td>
                  <td className="text-center">{data.total}</td>
                </tr>
              );
            })
          )}
          <tr>
            <td colSpan={26} className="font-bold">
              Grand Total
            </td>
            <td className="text-center">{grandTotal}</td>
          </tr>
        </tbody>
      </table>

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
