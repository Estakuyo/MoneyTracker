import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

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
import Placeholder from "../components/placeholder";

const Home = () => {
  const sampleDataChart = [];
  const sampleData = {};

  const [activeModal, setActiveModal] = useState(null);

  // Outputs
  const [transactions, setTransactions] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const loadExpenses = async () => {
    if (!token) return;
  };

  useEffect(() => {
    loadEarnings();
  }, [token]);

  const closeModal = () => {
    setActiveModal(null);
    setTitle("");
    setPrice(null);
    setCategory("");
  };

  const dataChart = [earnings, expenses];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full col-span-3" title={"Overall Chart Report"}>
        <div className="h-96">
          {sampleDataChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataChart}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <YAxis width={"auto"} fontSize={"12px"} fontWeight={800} />
                <XAxis
                  width={"auto"}
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
          ) : (
            <Placeholder />
          )}
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Expenses"}
        button={
          <Button
            title={"- Add Expense"}
            className="bg-error-500 hover:bg-error-700"
          />
        }
      >
        {sampleData.expenses ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-gray-500">
              Total Overall Expenses
            </h1>
            <h1 className="text-5xl text-error-600 font-bold">
              {sampleData.expenses.total}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-gray-800">
                  {sampleData.expenses.thisMonth}
                </p>
                <p className="font-semibold text-gray-500">This Month</p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-gray-800">
                  {sampleData.expenses.addedCount}
                </p>
                <p className="font-semibold text-gray-500">Expenses Added</p>
              </div>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>

      <Card
        className="w-full"
        title={"Earnings"}
        button={
          <Button
            title={"+ Add Earning"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        {sampleData.earnings ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-gray-500">
              Total Overall Earnings
            </h1>
            <h1 className="text-5xl text-success-600 font-bold">
              {sampleData.earnings.total}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-gray-800">
                  {sampleData.earnings.thisMonth}
                </p>
                <p className="font-semibold text-gray-500">This Month</p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-gray-800">
                  {sampleData.earnings.addedCount}
                </p>
                <p className="font-semibold text-gray-500">Earnings Added</p>
              </div>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>

      <Card
        className="w-full"
        title={"Savings"}
        button={
          <Button
            title={"+ Add Saving"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      >
        {sampleData.savings ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-gray-500">
              Total Overall Savings
            </h1>
            <h1 className="text-5xl text-success-600 font-bold">
              {sampleData.savings.total}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-gray-800">
                  {sampleData.savings.thisMonth}
                </p>
                <p className="font-semibold text-gray-500">This Month</p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-gray-800">
                  {sampleData.savings.addedCount}
                </p>
                <p className="font-semibold text-gray-500">Savings Added</p>
              </div>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>
    </div>
  );
};

export default Home;
