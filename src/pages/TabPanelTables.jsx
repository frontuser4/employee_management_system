import { useState } from "react";
import { Box } from "@mui/material";
import TabPanels from "../component/TabPanels";
import { MonthDropDown, YearDropDown } from "../component/Dropdown";
import ExpenceTables from "./ExpenceTables";
import ScoreCard from "./ScoreCard";
import Card from "../component/Card";
import dayjs from "dayjs";

const TabPanelTables = ({empId}) => {
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);

  return (
    <Box className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div>
          <MonthDropDown month={month} setMonth={setMonth} />
        </div>
        <div>
          <YearDropDown year={year} setYear={setYear} />
        </div>
      </div>
      <TabPanels
        ExpenceTables={ExpenceTables}
        ScoreCard={ScoreCard}
        Card={Card}
        year={year}
        month={month}
        empId={empId}
      />
    </Box>
  );
};

export default TabPanelTables;
