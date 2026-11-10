// Tabular layout of all stakeholder pro/con sentiments
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { GeneralSentimentData } from "../interfaces";
import { CircularProgress } from "@mui/material";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface ProConTabsProps {
  response: GeneralSentimentData;
}

export default function ProConTabs({ response }: ProConTabsProps) {
  const [value, setValue] = React.useState("1");
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pros" value="1" />
            <Tab label="Cons" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* Shows loading icon until content has been receieved, maps responses in list, bullet per sentiment item */}
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <ul>
            {response?.positives.map((item, index) => (
              <li key={index}>{capitalizeFirstLetter(item)}</li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel value="2">
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <ul>
            {response?.negatives.map((item, index) => (
              <li key={index}>{capitalizeFirstLetter(item)}</li>
            ))}
          </ul>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
