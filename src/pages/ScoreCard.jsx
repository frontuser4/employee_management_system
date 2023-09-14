import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { post } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Card from "../component/Card";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useContext } from "react";
import { DateTimeContext } from "../context/dateTimeContext";

const ScoreCard = () => {
  const { data } = useSelector((state) => state.login.data);
  const [claimGift, setClaimGift] = useState(null);
  const [marksOne, setMarksOne] = useState(0);
  const [marksTwo, setMarksTwo] = useState(0);
  const [marksThree, setMarksThree] = useState(0);
  const { month, year } = useContext(DateTimeContext);

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
      <div className="flex gap-3 mb-3">
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
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ "&.MuiTableRow-root": { background: "#0000" } }}>
                <TableCell>PARAMETERS</TableCell>
                <TableCell>TARGET</TableCell>
                <TableCell>SCORE</TableCell>
                <TableCell>TOTAL SCORE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>PRODUCTIVE CALLS(PC)</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>POP VISELITY</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>MONTHLY TARGET</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PROMOTION ACTIVITY</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PJP CHANGE</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CLAIM/GIFT SUBMISSIONS</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell>40</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Card empId={data.empId} month={month} year={year} />
      <Toaster position="top-center" />
    </>
  );
};

export default ScoreCard;
