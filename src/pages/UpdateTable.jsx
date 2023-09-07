import { useLocation } from "react-router-dom";
import UpdateForm from "../component/updateform/UpdateForm";

const UpdateTable = () => {
  const { state } = useLocation();
  return (
    <>
      <UpdateForm editData={state} />
    </>
  );
};

export default UpdateTable;
