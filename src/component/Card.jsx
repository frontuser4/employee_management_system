import { Typography, Paper, Box } from "@mui/material";

const Card = ({ score, saleTargetLY, saleTargetTY }) => {
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
          <Typography className="text-3xl">{score?.tc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-purple-500 p-3 rounded">
          <Typography>PC</Typography>
          <Typography>{score?.pc_sum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>SALE</Typography>
          <Typography>{score?.sale_sum}</Typography>
        </Box>
       
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>WORKIGN DAYS</Typography>
          <Typography>{score?.workingDays}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>LY ACH</Typography>
          <Typography>{saleTargetLY?.tgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-fuchsia-500 p-3 rounded">
          <Typography>MTH TGT</Typography>
          <Typography>{saleTargetTY?.tgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-fuchsia-500 p-3 rounded">
          <Typography>MTH ACH</Typography>
          <Typography>{saleTargetTY?.kgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center w-40 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>LY ACH</Typography>
          <Typography>{saleTargetLY?.kgsum}</Typography>
        </Box>
        <Box className="flex items-center flex-col justify-center  bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded">
          <Typography>AVERAGES HOURS</Typography>
          <Typography>{score?.wHr_sum/score?.workingDays}</Typography>
        </Box>
        <Box className="flex items-center justify-center  flex-col w-40 bg-teal-700 p-3 rounded">
          <Typography>AVG TC</Typography>
          <Typography>{score?.tc_sum/score?.workingDays}</Typography>
        </Box>
        <Box className="flex items-center justify-center flex-col w-40 bg-purple-500 p-3 rounded">
          <Typography>AVG PC</Typography>
          <Typography>{Math.round(score?.pc_sum/score?.workingDays)}</Typography>
        </Box>
        <Box className="flex items-center justify-center flex-col w-40 bg-rose-500 p-3 rounded">
          <Typography>POSTER</Typography>
          <Typography>{score?.poster_sum}</Typography>
        </Box>
        <Box className="flex items-center justify-center flex-col w-40 bg-rose-500 p-3 rounded">
          <Typography>AVG POSTER</Typography>
          <Typography>{score?.poster_sum / score?.workingDays}</Typography>
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
