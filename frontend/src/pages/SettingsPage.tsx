import MuiNavigation from "../components/MuiNavigation";
import Content from "../components/Content";
import RangeSlider from "../components/RangeSlider";
import { Paper, Typography } from "@mui/material";

const SettingsPage = () => {
  return (
    <>
      <MuiNavigation title="Settings" />
      <Content>
        <Paper elevation={3}>
          <Typography>
            Information about how to switch the parameters
          </Typography>
          <RangeSlider />
        </Paper>
      </Content>
    </>
  );
};

export default SettingsPage;
