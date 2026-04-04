import Card from "../components/card";
import Button from "../components/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Expenses = () => {
  const sampleCategories = [
    { name: "Food", amount: 500 },
    { name: "Gasoline", amount: 1000 },
    { name: "Motorcycle Maintenance", amount: 600 },
    { name: "Girlfriend Date", amount: 1500 },
    { name: "Beer", amount: 300 },
  ];

  const sampleExpenses = [
    {
      name: "Lunch",
      amount: 90,
      date: "05/05/2025",
      category: sampleCategories[0].name,
    },
    {
      name: "Groceries",
      amount: 1200,
      date: "05/02/2025",
      category: sampleCategories[0].name,
    },
    {
      name: "Fuel",
      amount: 800,
      date: "05/03/2025",
      category: sampleCategories[1].name,
    },
    {
      name: "ThursDate",
      amount: 999,
      date: "04/30/2025",
      category: sampleCategories[3].name,
    },
    {
      name: "Smirnoff",
      amount: 350,
      date: "05/06/2025",
      category: sampleCategories[4].name,
    },
  ];

  const sampleDataChart = [
    { amount: 5 },
    { amount: 10 },
    { amount: 15 },
    { amount: 20 },
    { amount: 25 },
    { amount: 30 },
    { amount: 35 },
  ];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Expense"}>
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Overall Expense
            </p>
            <h1 className="text-5xl font-bold text-error-500">₱6,500</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md text-gray-500">Regular Monthly Expenses</p>
            <h1 className="text-2xl font-bold text-error-500">₱5,000</h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Top Category"}
        button={
          <Button
            className="bg-secondary-500 hover:bg-accent-700"
            title={"View Category"}
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
                <p className="font-bold text-error-500">{category.amount}</p>
                <p className="text-gray-500 text-sm">Total</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Expenses"}
        button={
          <Button
            className="bg-secondary-500 hover:bg-accent-700"
            title={"View Expenses"}
          />
        }
      >
        <div className="flex flex-col">
          {sampleExpenses.slice(0, 3).map((expense, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium text-lg text-gray-500">
                  {expense.name}
                </p>
                <p className="mt-1 inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                  {expense.category}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-error-500">{expense.amount}</p>
                <p className="text-gray-500 text-sm">{expense.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="w-full col-span-3" title={"Expense History"}>
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleDataChart}>
              <CartesianGrid strokeDasharray={"3 3"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
