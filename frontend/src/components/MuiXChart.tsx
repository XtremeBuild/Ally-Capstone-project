// Pie chart containing sentiments
import { PieChart } from "@mui/x-charts/PieChart";
import { PieChartEntry } from "../interfaces";

interface MuiXChartProps {
  response: PieChartEntry[];
}

const MuiXChart = ({ response }: MuiXChartProps) => {
  const colors = ["#4CAF50", "#F44336", "#FF9800", "#E0E0E0"];

  return (
    <>
      <PieChart
        colors={colors}
        series={[
          {
            data: response,
            innerRadius: 50,
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

export default MuiXChart;
