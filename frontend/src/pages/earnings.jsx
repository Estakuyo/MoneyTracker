import { useContext } from "react";

import { ModalContext } from "../context/modalContext";
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
  const sampleCategories = [
    { name: "Monthly Allowance", amount: 4000 },
    { name: "Freelance", amount: 10000 },
    { name: "OJT Allowance", amount: 7500 },
    { name: "Sideline", amount: 1500 },
    { name: "Selling", amount: 300 },
    { name: "Gambling", amount: 500 },
    { name: "Crypto", amount: 1000 },
    { name: "Nakaw", amount: 5000 },
  ];

  const sampleEarnings = [
    {
      name: "Allowance",
      amount: 6000,
      date: "05/05/2025",
      category: sampleCategories[0].name,
    },
    {
      name: "Salary",
      amount: 10000,
      date: "05/02/2025",
      category: sampleCategories[2].name,
    },
    {
      name: "Freelance",
      amount: 10000,
      date: "05/03/2025",
      category: sampleCategories[1].name,
    },
    {
      name: "Gambling",
      amount: 1500,
      date: "04/30/2025",
      category: sampleCategories[3].name,
    },
    {
      name: "Crypto",
      amount: 15000,
      date: "05/06/2025",
      category: sampleCategories[4].name,
    },
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

  const { openModal } = useContext(ModalContext);

  const showCategories = () => {
    console.log("Categories Button clicked");
    openModal({
      title: "Earning Categories",
      content: (
        <div>
          <div className="text-center mb-2">
            <h1 className="text-xl font-semibold text-primary-600">
              Total Categories
            </h1>
            <p className="text-sm text-gray-500">
              {sampleCategories.length} categories
            </p>
          </div>
          <div className="flex flex-col">
            {sampleCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-4 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-gray-500">
                    {category.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-500">
                    {category.amount}
                  </p>
                  <p className="text-gray-500 text-sm">Total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  };

  const showEarnings = () => {
    console.log("Earnings Button clicked");
    openModal({
      title: "Earnings",
      content: <p>This is your earnings.</p>,
    });
  };

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
        title={"Top Category"}
        button={
          <Button
            title={"View Category"}
            className="bg-success-500 hover:bg-success-700"
            onClick={showCategories}
          />
        }
      >
        <div className="flex flex-col">
          {sampleCategories.slice(0, 3).map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 py-4 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium text-lg text-gray-500">
                  {category.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success-500">{category.amount}</p>
                <p className="text-gray-500 text-sm">Total</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Earnings"}
        button={
          <Button
            title={"View Earnings"}
            className="bg-success-500 hover:bg-success-700"
            onClick={showEarnings}
          />
        }
      >
        <div className="flex flex-col">
          {sampleEarnings.slice(0, 3).map((earning, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium text-lg text-gray-500">
                  {earning.name}
                </p>
                <p className="mt-1 inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                  {earning.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success-500">{earning.amount}</p>
                <p className="text-gray-500 text-sm">{earning.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="w-full col-span-3" title={"Earnings History"}>
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
