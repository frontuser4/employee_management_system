import { Typography, Paper, Box } from "@mui/material";

const Card = () => {
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
      <Paper className="p-4" sx={{ background: "#333", color: "#fff", display:'flex', flexWrap:'wrap', gap:5 }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, index) => {
          return (
              <Box key={index} className="flex items-center flex-col bg-white text-black p-3 rounded">
                <Typography>Days Worked</Typography>
                <Typography>19</Typography>
              </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default Card;
