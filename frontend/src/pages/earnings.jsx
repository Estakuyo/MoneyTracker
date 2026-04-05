import Button from "../components/button";
import Card from "../components/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Earnings = () => {
  const sampleEarnings = [
    { name: "Allowance", amount: 6000 },
    { name: "Salary", amount: 10000 },
    { name: "Freelance", amount: 10000 },
    { name: "Gambling", amount: 1500 },
    { name: "Crypto", amount: 15000 },
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

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Earnings"}>
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
        title={"Earnings Source"}
        button={
          <Button
            title={"View Earnings"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        {sampleEarnings.slice(0, 3).map((earning, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 py-4 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium text-lg text-gray-500">
                {earning.name}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-success-500">{earning.amount}</p>
              <p className="text-gray-500 text-sm">Total</p>
            </div>
          </div>
        ))}
      </Card>

      <Card className="w-full col-span-2" title={"Earnings History"}>
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

export default Earnings;
