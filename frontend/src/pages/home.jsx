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
  const sampleDataChart = [
    {
      date: "11/06/2003",
      expense: 200,
      earnings: 600,
    },
    {
      date: "11/07/2003",
      expense: 100,
      earnings: 300,
    },
    {
      date: "11/08/2003",
      expense: 900,
      earnings: 1500,
    },
    {
      date: "11/09/2003",
      expense: 1150,
      earnings: 150,
    },
    {
      date: "11/10/2003",
      expense: 1550,
      earnings: 100,
    },
    {
      date: "11/11/2003",
      expense: 900,
      earnings: 880,
    },
    {
      date: "11/12/2003",
      expense: 100,
      earnings: 800,
    },
  ];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full col-span-3" title={"Overall Chart Report"}>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleDataChart}>
              <CartesianGrid strokeDasharray={"3 3"} />
              <YAxis width={40} fontSize={"12px"} fontWeight={800} />
              <XAxis
                width={40}
                fontSize={"12px"}
                fontWeight={800}
                dataKey={"date"}
              />
              <Line
                type="monotone"
                dataKey={"expense"}
                strokeWidth={3}
                stroke="red"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={"earnings"}
                strokeWidth={3}
                stroke="lightgreen"
                dot={false}
              />
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
        title={"Expenses"}
        button={
          <Button
            title={"Add Expense"}
            className="bg-error-500 hover:bg-error-700"
          />
        }
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-md font-semibold text-gray-500">
            Total Overall Expenses
          </h1>
          <h1 className="text-5xl text-error-600 font-bold">₱1,800</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-gray-800">+₱500</p>
              <p className="font-semibold text-gray-500">This Month</p>
            </div>
            <div className="flex gap-2 items-end">
              <p className="font-bold text-gray-800">5</p>
              <p className="font-semibold text-gray-500">Expenses Added</p>
            </div>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Earnings"}
        button={
          <Button
            title={"Add Earning"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-md font-semibold text-gray-500">
            Total Overall Earnings
          </h1>
          <h1 className="text-5xl text-success-600 font-bold">₱1,800</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-gray-800">+₱500</p>
              <p className="font-semibold text-gray-500">This Month</p>
            </div>
            <div className="flex gap-2 items-end">
              <p className="font-bold text-gray-800">5</p>
              <p className="font-semibold text-gray-500">Earnings Added</p>
            </div>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Savings"}
        button={
          <Button
            title={"Add Saving"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-md font-semibold text-gray-500">
            Total Overall Savings
          </h1>
          <h1 className="text-5xl text-success-600 font-bold">₱1,800</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-gray-800">+₱500</p>
              <p className="font-semibold text-gray-500">This Month</p>
            </div>
            <div className="flex gap-2 items-end">
              <p className="font-bold text-gray-800">5</p>
              <p className="font-semibold text-gray-500">Savings Added</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
