// Not in use currently, but worth keeping around - double sldier that would allow for changing the thresholds of sentiment positive/negative/neutral
import { Slider } from "@mui/material";
import React from "react";
import axiosInstance from "../axiosInstance";
import { NGROK_LINK } from "../const";

const RangeSlider = () => {
  const minDistance = 10;
  const [value, setValue] = React.useState<number[]>([20, 80]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    axiosInstance
      .post(
        `${NGROK_LINK}/INSERT_API`,
        { values: newValue },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((response) => {
        console.log("API response", response);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <>
      <Slider value={value} onChange={handleChange1} valueLabelDisplay="auto" />
    </>
  );
};

export default RangeSlider;
