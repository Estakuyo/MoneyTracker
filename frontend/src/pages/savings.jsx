import Card from "../components/card";
import Button from "../components/button";
import ProgressBar from "../components/progressBar";
import Dropdown from "../components/dropdown";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Savings = () => {
  const sampleGoals = [
    { name: "Emergency Fund", amount: 10000, saved: 6500 },
    { name: "Vacation", amount: 3000, saved: 1500 },
    { name: "New Laptop", amount: 80000, saved: 20000 },
    { name: "Motorcycle Maintenance", amount: 20000, saved: 5000 },
    { name: "Home Renovation", amount: 50000, saved: 10000 },
  ];

  const sampleDataChart = [
    {
      date: "11/06/2003",
      amount: 400,
    },
    {
      date: "11/07/2003",
      amount: 500,
    },
    {
      date: "11/08/2003",
      amount: 1100,
    },
    {
      date: "11/09/2003",
      amount: 600,
    },
    {
      date: "11/10/2003",
      amount: 150,
    },
    {
      date: "11/11/2003",
      amount: 990,
    },
    {
      date: "11/12/2003",
      amount: 500,
    },
  ];

  const sampleDropdownOptions = ["2026", "2027"];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Savings"}>
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Overall Savings
            </p>
            <h1 className="text-5xl font-bold text-success-500">₱6,500</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md text-gray-500">Regular Monthly Savings</p>
            <h1 className="text-2xl font-bold text-success-500">₱5,000</h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Savings Goals"}
        button={
          <Button
            title={"View Goals"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        <div className="flex flex-col gap-10 py-4">
          {sampleGoals.slice(0, 3).map((goal, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <ProgressBar
                goal={goal.name}
                value={goal.saved}
                max={goal.amount}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="w-full col-span-2" title={"Savings History"}>
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleDataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis width={"auto"} fontSize={"12px"} fontWeight={800} />
              <XAxis
                width={"auto"}
                fontSize={"12px"}
                fontWeight={800}
                dataKey={"date"}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="darkgreen"
                strokeWidth={3}
                dot={false}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Savings;
