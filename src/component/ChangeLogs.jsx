import { useEffect, useState } from 'react';
import { get } from '../utils/api';
import { useSelector } from 'react-redux';

const ChangeLogs = ({month, year}) => {

  const [changeLogs, setChangeLogs] = useState(null);
  const { data } = useSelector((state) => state.login.data);
  
  async function fetchData() {
    const res = await get("/getput", data.empId, month, year);
    console.log("changesLogs: ", res);
    setChangeLogs(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table>
      <tr>
        <th></th>
        <th></th>
        < th></th>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  );
};

export default ChangeLogs;
