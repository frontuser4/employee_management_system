import { useState } from "react";
import { Box } from "@mui/material";
import TabPanels from "../components/TabPanels";
import { MonthDropDown, YearDropDown } from "../components/Dropdown";
import ExpenceTables from "./ExpenceTables";
import ScoreCard from "./ScoreCard";
import Card from "../components/Card";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";


const TabTables = () => {

  const { state } = useLocation();
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);


  return (
    <Box className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div>
          <MonthDropDown month={state.month} setMonth={setMonth} />
        </div>
        <div>
          <YearDropDown year={state.year} setYear={setYear} />
        </div>
      </div>
      <TabPanels
        ExpenceTables={ExpenceTables}
        ScoreCard={ScoreCard}
        Card={Card}
        year={state.year}
        month={state.month}
      />
    </Box>
  );
};

export default TabTables;
