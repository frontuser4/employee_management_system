import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { post } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Card from "../component/Card";
import { MonthDropDown, YearDropDown } from "../component/Dropdown";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ScoreCard = () => {
  const { data } = useSelector((state) => state.login.data);
  const [claimGift, setClaimGift] = useState(null);
  const [marksOne, setMarksOne] = useState(0);
  const [marksTwo, setMarksTwo] = useState(0);
  const [marksThree, setMarksThree] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format("YYYY"));
  const [month, setMonth] = useState(dayjs(date.$d).format("MM").split("")[1]);

  const [scoreGradeOne, setScoreGradeOne] = useState("");
  const [scoreGradeTwo, setScoreGradeTwo] = useState("");
  const [scoreGradeThree, setScoreGradeThree] = useState("");

  const totalScore = {
    scoreOne: 10,
    scoreTwo: 5,
    scoreThree: 0,
    scoreFour: 0,
    scoreFive: 0,
    scoreSix: 5,
    scoreSeven: 5,
  };

  function scoreOneGrade(score) {
    if (score >= 40) {
      setMarksOne(10);
      setScoreGradeOne("excellent");
    } else if (score >= 35 && score <= 39) {
      setMarksOne(8);
      setScoreGradeOne("good");
    } else if (score >= 30 && score <= 34) {
      setMarksOne(5);
      setScoreGradeOne("average");
    } else if (score >= 25 && score <= 29) {
      setMarksOne(3);
      setScoreGradeOne("poor");
    } else if (score < 25) {
      setMarksOne(0);
      setScoreGradeOne("worst");
    }
  }

  function scoreTwoGrade(score) {
    if (score >= 25) {
      setMarksTwo(10);
      setScoreGradeTwo("excellent");
    } else if (score >= 20 && score <= 24) {
      setMarksTwo(8);
      setScoreGradeTwo("good");
    } else if (score >= 15 && score <= 19) {
      setMarksTwo(5);
      setScoreGradeTwo("average");
    } else if (score >= 10 && score <= 14) {
      setMarksTwo(3);
      setScoreGradeTwo("poor");
    } else if (score < 10) {
      setMarksTwo(0);
      setScoreGradeTwo("worst");
    }
  }

  function scoreThreeGrade(score) {
    if (score >= 15) {
      setMarksThree(10);
      setScoreGradeThree("excellent");
    } else if (score >= 11 && score <= 14) {
      setMarksThree(8);
      setScoreGradeThree("good");
    } else if (score >= 10 && score <= 12) {
      setMarksThree(5);
      setScoreGradeThree("average");
    } else if (score >= 5 && score <= 9) {
      setMarksThree(3);
      setScoreGradeThree("poor");
    } else if (score < 5) {
      setMarksThree(0);
      setScoreGradeThree("worst");
    }
  }

  const handlerClaimGift = async (e) => {
    e.preventDefault();
    if (!e.target[0].value) {
      return;
    }
    const res = await post("/web/claimgift", {
      claimGift: e.target[0].value,
      empId,
      month,
      year,
    });
    setClaimGift(e.target[0].value);
    toast.success(res.data.Details);
    e.target[0].value = "";
  };

  useEffect(() => {
    scoreOneGrade(40);
    scoreTwoGrade(20);
    scoreThreeGrade(15);
  }, [claimGift, month, year]);

  return (
    <>
      <div className="flex gap-3mb-3">
        <form className="flex items-center gap-2" onSubmit={handlerClaimGift}>
          <TextField
            label="Claim/Gift"
            id="claim-gift"
            size="small"
            autoComplete="off"
            type="number"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>

        <div className="flex">
          <div>
            <MonthDropDown
              label="ScoreCard Month"
              month={month}
              setMonth={setMonth}
            />
          </div>
          <div>
            <YearDropDown
              label="ScoreCard Year"
              year={year}
              setYear={setYear}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>PARAMETERS</th>
              <th>TARGET</th>
              <th>SCORE</th>
              <th>TOTAL SCORE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TOTAL CALLS(TC)</td>
              <td className="text-center">40</td>
              <td className="text-center">10</td>
              <td className="text-center">{marksOne}</td>
            </tr>
            <tr>
              <td>PRODUCTIVE CALLS(PC)</td>
              <td className="text-center">25</td>
              <td className="text-center">10</td>
              <td className="text-center">{marksTwo}</td>
            </tr>
            <tr>
              <td>POP VISELITY</td>
              <td className="text-center">15</td>
              <td className="text-center">10</td>
              <td className="text-center">{marksThree}</td>
            </tr>
            <tr>
              <td>MONTHLY TARGET</td>
              <td className="text-center">100</td>
              <td className="text-center">50</td>
              <td className="text-center">{totalScore.scoreFour}</td>
            </tr>
            <tr>
              <td>PROMOTION ACTIVITY</td>
              <td className="text-center">100</td>
              <td className="text-center">10</td>
              <td className="text-center">{totalScore.scoreFive}</td>
            </tr>
            <tr>
              <td>PJP CHANGE</td>
              <td className="text-center">100</td>
              <td className="text-center">5</td>
              <td className="text-center">{totalScore.scoreFive}</td>
            </tr>
            <tr>
              <td>CLAIM/GIFT SUBMISSIONS</td>
              <td className="text-center">{9}</td>
              <td className="text-center">5</td>
              <td className="text-center">{totalScore.scoreSeven}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center font-bold">
                TOTAL
              </td>
              <td className="text-center">100</td>
              <td className="text-center">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Card empId={data.empId} month={month} year={year} />
      <Toaster position="top-center" />
    </>
  );
};

export default ScoreCard;
