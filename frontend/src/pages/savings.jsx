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

  const sampleSavingsHistoryPerMonth = [
    { month: "Jan", balance: 4100 },
    { month: "Feb", balance: 4600 },
    { month: "Mar", balance: 5200 },
    { month: "Apr", balance: 5500 },
    { month: "May", balance: 5700 },
    { month: "Jun", balance: 5800 },
    { month: "Jul", balance: 6100 },
    { month: "Aug", balance: 6300 },
    { month: "Sep", balance: 6400 },
    { month: "Oct", balance: 6450 },
    { month: "Nov", balance: 6475 },
    { month: "Dec", balance: 7000 },
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

      <Card
        className="w-full col-span-2"
        title={"Savings History"}
        button={<Dropdown name={"Year"} options={sampleDropdownOptions} />}
      >
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleSavingsHistoryPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                width={40}
                fontSize={"12px"}
                fontWeight={800}
                dataKey={"month"}
                tickFormatter={(d) => d.slice(0, 2)}
                angle={-30}
                textAnchor="end"
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="darkgreen"
                strokeWidth={3}
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
