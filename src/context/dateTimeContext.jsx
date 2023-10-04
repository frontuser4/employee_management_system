import { createContext, useState } from "react";
import dayjs from "dayjs";

export const DateTimeContext = createContext({
  month: "",
  setMonth: (arg) => {},
  year: "",
  setYear: (arg) => {},
});

const DateTimeContextProvider = ({ children }) => {
    const [date, setDate] = useState(dayjs());
    const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
    const [month, setMonth] = useState(dayjs(date.$d).format("MM"));

  return (
    <DateTimeContext.Provider value={{ month, setMonth, year, setYear }}>
      {children}
    </DateTimeContext.Provider>
  );
};

export default DateTimeContextProvider;
