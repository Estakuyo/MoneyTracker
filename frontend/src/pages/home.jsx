// Chart
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Components
import Card from "../components/card";
import Button from "../components/button";

const Home = () => {
  const sampleData = [
    {
      data: "Monday",
      expense: 200,
      savings: 400,
      earnings: 600,
    },
    {
      data: "Tuesday",
      expense: 100,
      savings: 500,
      earnings: 300,
    },
    {
      data: "Wednesday",
      expense: 900,
      savings: 1100,
      earnings: 1500,
    },
    {
      data: "Thursday",
      expense: 1150,
      savings: 600,
      earnings: 150,
    },
    {
      data: "Friday",
      expense: 1550,
      savings: 150,
      earnings: 100,
    },
    {
      data: "Saturday",
      expense: 900,
      savings: 990,
      earnings: 880,
    },
    {
      data: "Sunday",
      expense: 100,
      savings: 500,
      earnings: 800,
    },
  ];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full col-span-3" title={"Weekly Report"}>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid />
              <YAxis width={40} fontSize={"12px"} fontWeight={800} />
              <XAxis
                width={40}
                fontSize={"12px"}
                fontWeight={800}
                dataKey={"data"}
                tickFormatter={(d) => d.slice(0, 2)}
                angle={-30}
                textAnchor="end"
              />
              <Line dataKey={"expense"} strokeWidth={2} stroke="red" />
              <Line dataKey={"savings"} strokeWidth={2} stroke="darkgreen" />
              <Line dataKey={"earnings"} strokeWidth={2} stroke="green" />
              <Legend
                verticalAlign="top"
                height={40}
                wrapperStyle={{ fontSize: 14 }}
                iconSize={12}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Total Expenses"}
        button={
          <Button
            title={"Add Expense"}
            className="bg-error-500 hover:bg-error-700"
          />
        }
      />

      <Card
        className="w-full"
        title={"Total Earnings"}
        button={
          <Button
            title={"Add Earning"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />

      <Card
        className="w-full"
        title={"Total Savings"}
        button={
          <Button
            title={"Add Saving"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />
    </div>
  );
};

export default Home;
