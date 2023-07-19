import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Box } from "@mui/material";
import { get } from '../utils/api';

const Card = ({ score, saleTargetLY, saleTargetTY, month, year }) => {
  
  const { data } = useSelector((state) => state.login.data);
  const [scoreData, setScoreData] = useState(null);

  const getScore = async()=> {
      const res = await get('/score', data.empId, month, year);
      setScoreData(res.data_score);
      // console.log("res: ", res.data_score);
  }

  useEffect(()=>{
    getScore();
  }, [])

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
          gap: 2,
        }}
      >
        <Box className="flex items-center flex-col justify-center w-40 bg-teal-700 text-white p-3 rounded">
          <Typography>TC</Typography>
          <Typography className="text-3xl">{scoreData?.tc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-purple-500 p-3 rounded">
          <Typography>PC</Typography>
          <Typography>{scoreData?.pc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>SALE</Typography>
          <Typography>{scoreData?.sale_sum}</Typography>
        </Box>
       
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>WORKIGN DAYS</Typography>
          <Typography>{scoreData?.workingDays}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>WORK HOURS</Typography>
          <Typography>{scoreData?.wHr_sum}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>LY ACH</Typography>
          <Typography>{Math.round(saleTargetLY?.tgsum)}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center w-40 bg-fuchsia-500 p-3 rounded">
          <Typography>MTH TGT</Typography>
          <Typography>{saleTargetTY?.tgsum}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center w-40 bg-fuchsia-500 p-3 rounded">
          <Typography>MTH ACH</Typography>
          <Typography>{Math.round(saleTargetTY?.kgsum).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>LY ACH</Typography>
          <Typography>{Math.round(saleTargetLY?.kgsum).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center flex-col justify-center  bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>AVERAGES HOURS</Typography>
          <Typography>{Math.round(scoreData?.wHr_sum/scoreData?.workingDays).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center justify-center  flex-col w-40 bg-teal-700 p-3 rounded">
          <Typography>AVG TC</Typography>
          <Typography>{Math.round(scoreData?.tc_sum/scoreData?.workingDays).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center justify-center flex-col w-40 bg-purple-500 p-3 rounded">
          <Typography>AVG PC</Typography>
          <Typography>{Math.round(scoreData?.pc_sum/scoreData?.workingDays).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center justify-center flex-col w-40 bg-rose-500 p-3 rounded">
          <Typography>POSTER</Typography>
          <Typography>{scoreData?.poster}</Typography>
        </Box>
        
        <Box className="flex items-center justify-center flex-col w-40 bg-rose-500 p-3 rounded">
          <Typography>AVG POSTER</Typography>
          <Typography>{Math.round(scoreData?.poster / scoreData?.workingDays).toFixed(2)}</Typography>
        </Box>
       
        <Box className="flex items-center justify-center flex-col w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>INDEX</Typography>
          <Typography>{parseFloat((saleTargetTY?.kgsum * 100)/saleTargetTY?.tgsum).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center justify-center flex-col w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>GROWTH</Typography>
          <Typography>{parseFloat((saleTargetTY?.kgsum * 100)/saleTargetLY?.kgsum).toFixed(2)}</Typography>
        </Box>

        <Box className="flex items-center justify-center flex-col w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>GAP KG</Typography>
          <Typography>{Math.round(saleTargetLY?.kgsum - saleTargetTY?.kgsum)}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Card;
 