import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { scoreSummaryGet } from "../utils/api";

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanels.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabPanels({ExpenceTables, ScoreCard, Card, year, month, empId}) {

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [score, setScore] = useState(null);
  const [saleTargetLY, setSaleTargetLY] = useState(null);
  const [saleTargetTY, setSaleTargetTY] = useState(null);

  const fetchScoreCardData = async () => {
    const res = await scoreSummaryGet("/account/score", empId, month, year);
    setScore(res.score);
    setSaleTargetLY(res.sale_target_LY);
    setSaleTargetTY(res.sale_target_TY);
  };


  useEffect(() => {
    fetchScoreCardData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{  width: '100%' }}>
      <AppBar position="static">
        <Tabs
          sx={{background:'white', color:'#000'}}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Expence Table" {...a11yProps(0)} />
          <Tab label="Scorecard Table" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ExpenceTables 
           year={year}
           month={month}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ScoreCard />
          <Card 
            score={score}
            saleTargetLY={saleTargetLY}
            setSaleTargetTY={setSaleTargetTY}
          />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}