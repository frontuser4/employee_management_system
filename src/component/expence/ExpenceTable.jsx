import { useEffect, useState } from "react";
import "./style.css";
import { get, update } from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import UpdateModal from "../updateform/UpdateModal";
import AddModal from "../addform/AddModal";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExpenceTable = ({ year, month }) => {

  const { state } = useLocation();
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

  async function fetchData() {
    setLoading(true);
    const res = await get("/account/expence", state.data.empId, month, year);
    setTableData(res);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    console.log("closeForm called: ")
  }, [month, year, closeUpdateForm, closeForm, checkedRefresh]);

  const handleEdit = (data) => {
    setEditData(data);
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
    console.log("Approval updates: ", updateRes);
    toast.success(updateRes.data.message);
    setCheckedRefresh((prev)=> !prev);
  };

  return (
    <>
      <div>
        <button
          className="bg-[#0ea5e9] px-3 py-1 text-xl rounded text-white mb-2 hover:bg-cyan-600"
          onClick={() => setOpenForm(true)}
        >
          <AddIcon />
          Add
        </button>
      </div>

      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>Attendence</th>
              <th>TC</th>
              <th>PC</th>
              <th>SALE</th>
              <th>MODE TRAVEL</th>
              <th>DALY CONV</th>
              <th>TRAVELING LONG</th>
              <th>TRAVELING BOARDING</th>
              <th>NIGHT ALLOWANCE</th>
              <th>FOOD</th>
              <th>FOODGST</th>
              <th>INTERNET</th>
              <th>PAYER</th>
              <th>PRINTING STATIONARY</th>
              <th>POSTAGE COURIER</th>
              <th>LOCAL CONVEY</th>
              <th>WORKING HOURS</th>
              <th>APPROVAL</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div style={{width:'100%'}}>
                <Skeleton count={10} />
              </div>
            ) : (
              tableData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button onClick={() => handleEdit(data)}>
                        <EditIcon />
                      </button>
                    </td>
                    <td className="text-center">{data.dateExp}</td>
                    <td className="text-center">{data.attendance}</td>
                    <td className="text-center">{data.tc}</td>
                    <td className="text-center">{data.pc}</td>
                    <td className="text-center">{data.sale}</td>
                    <td className="text-center">{data.modeTravel}</td>
                    <td className="text-center">{data.dailyConv}</td>
                    <td className="text-center">{data.travelingLong}</td>
                    <td className="text-center">{data.lodginBoardig}</td>
                    <td className="text-center">{data.nightAllowance}</td>
                    <td className="text-center">{data.food}</td>
                    <td className="text-center">{data.foodGST}</td>
                    <td className="text-center">{data.internet}</td>
                    <td className="text-center">{data.payer__payerId}</td>
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
      </div>

      <div className="flex justify-end mt-4 text-white">
        <button
          className="bg-cyan-500 px-3 py-1 rounded"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>

      <AddModal open={openForm} setOpen={setOpenForm} setCloseForm={setCloseForm} />
      <UpdateModal
        open={updateForm}
        setOpen={setUpdateForm}
        editData={editData}
        setCloseUpdateform={setCloseUpdateform}
      />
      <Toaster position="top-center" />
    </>
  );
};

export default ExpenceTable;
