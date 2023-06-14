import {useEffect, useState} from "react";
// import './style.css';
import { get } from '../../utils/api';
import EditIcon from "@mui/icons-material/Edit";                                                  
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from 'react-router-dom';
import UpdateModal from "../updateform/UpdateModal";
import AddModal from '../../components/AddModal';

const ExpenceTable = ({year, month}) => {
   
   const { state } = useLocation();
   const [tableData, setTableData] = useState(null);
   const [openForm, setOpenForm] = useState(false);
   const [updateForm, setUpdateForm] = useState(false);
   const [editData, setEditData] = useState(null);

   async function fetchData(){
    const res = await get("/account/expence", `${state.emp === 'emp' ? state.empId : state.data.empId}`, `${state.emp === 'emp' ? state.month : month }`, `${state.emp === 'emp' ? state.year : year}`);
    setTableData(res);
   }

   useEffect(()=>{
     fetchData();
   }, [month, year]);

   const handleEdit = (data)=>{
      setEditData(data);
      setUpdateForm(true);
      console.log("edit data: ", data);
   }

  return (
    <>
      <div>
        <button className="bg-[#0ea5e9] px-3 py-1 text-xl rounded text-white mb-2 hover:bg-cyan-600" onClick={()=> setOpenForm(true)}>
          <AddIcon />
          Add
        </button>
      </div>
      <div className="table-box">
        <div className="table1-box">
          <table  border={1} >
            <tr style={{background:'#d7d7d7'}}>
              <th>Action</th>
              <th>Date</th>
              <th>Attendence</th>
            </tr>
           {
             tableData?.map((data, index)=>{
                 return(
                   <tr key={index}>
                     <td><button onClick={()=> handleEdit(data)}>
                      <EditIcon/>
                      </button></td>
                     <td>{data.dateExp}</td>
                     <td>{data.attendance}</td>
                   </tr>
                 )
             })
           }
          </table>
        </div>
        <div style={{ overflowX: "scroll" }}>
          <table cellPadding={10} border={1} >
            <tr style={{background:'#d7d7d7'}}>
              <th>TC</th>
              <th>PC</th>
              <th>SALE</th>
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
              <th>APPROVAL</th>
              <th>TOTAL</th>
            </tr>
           {
              tableData?.map((data, index)=>{
                return (
                  <tr key={index}>
                    <td>{data.tc}</td>
                    <td>{data.pc}</td>
                    <td>{data.sale}</td>
                    <td>{data.dailyConv}</td>
                    <td>{data.travelingLong}</td>
                    <td>{data.lodginBoardig}</td>
                    <td>{data.nightAllowance}</td>
                    <td>{data.food}</td>
                    <td>{data.foodGST}</td>
                    <td>{data.internet}</td>
                    <td>{data.payer}</td>
                    <td>{data.printingStationary}</td>
                    <td>{data.postageCourier}</td>
                    <td>{data.localConv}</td>
                    <td>{data.approval}</td>
                    <td>{`${data.dailyConv + data.travelingLong + data.lodginBoardig + data.nightAllowance + data.food + data.foodGST + data.internet + data.printingStationary + data.postageCourier + data.localConv}`}</td>
                  </tr>
                )
              })
           }
          </table>
        </div>
      </div>
      <AddModal
        open={openForm}
        setOpen={setOpenForm}
      />
      <UpdateModal 
         open={updateForm}
         setOpen={setUpdateForm}
         editData={editData}
      />
    </>
  );
};

export default ExpenceTable;
