import { useEffect, useState } from "react";
import { Typography, Paper, Box } from "@mui/material";
import { scoreSummaryGet } from "../utils/api";

const Card = ({ empId, month, year }) => {
  const [score, setScore] = useState(null);
  const [saleTargetLY, setSaleTargetLY] = useState(null);
  const [saleTargetTY, setSaleTargetTY] = useState(null);

  const fetchScoreCardData = async () => {
    const res = await scoreSummaryGet("/account/score", empId, month, year);
    setScore(res.score);
    setSaleTargetLY(res.sale_target_LY);
    setSaleTargetTY(res.sale_target_TY);
  };

  console.log("score: ", score)
  useEffect(() => {
    fetchScoreCardData();
  }, []);

  useEffect(() => {
    fetchScoreCardData();
  }, [empId, month, year]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Paper
        className="p-4"
        sx={{
          background: "#333",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>TC</Typography>
          <Typography>{score.tc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>PC</Typography>
          <Typography>{score.pc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>SALE</Typography>
          <Typography>{score.sale_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>WORKING HOURS</Typography>
          <Typography>{score.wHr_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>WORKIGN DAYS</Typography>
          <Typography>{score.workingDays}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>LY ACH</Typography>
          <Typography>{saleTargetLY.tgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>MTH TGT</Typography>
          <Typography>{saleTargetTY.tgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>AVERAGES HOURS</Typography>
          <Typography>{score.wHr_sum/score.workingDays}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>AVG TC</Typography>
          <Typography>{score.tc_sum/score.workingDays}</Typography>
        </Box>
        <Box className="flex items-center flex-col bg-white text-black p-3 rounded">
          <Typography>AVG PC</Typography>
          <Typography>{score.pc_sum/score.workingDays}</Typography>
        </Box>
      </Paper>
    </Box>
  // <></>
  );
};

export default Card;
