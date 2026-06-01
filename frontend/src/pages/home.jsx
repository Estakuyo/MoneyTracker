import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

// Chart
import {
  BarChart,
  Bar,
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
import Modal from "../components/modal";

import { getAllUserTransactions } from "../services/transactions";
import { add_Expenses, get_ExpenseCategories } from "../services/expenses";
import { add_Earning, get_EarningCategories } from "../services/earnings";
import { formatDate } from "../utils/formatters";

const Home = () => {
  const sampleDataChart = [];
  const sampleData = {};

  const [activeModal, setActiveModal] = useState(null);

  // Outputs
  const [transactions, setTransactions] = useState([]);
  const [earningsTotal, setEarningsTotal] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const loadTransactions = async () => {
    if (!token) return;
    try {
      const transactionsData = await getAllUserTransactions({ token });
      const raw = transactionsData?.transactions ?? [];

      const chartData = raw.map((item) => ({
        title: item.title,
        date: item.date,
        earnings: item.type === "Earnings" ? item.price : null,
        expense: item.type === "Expenses" ? item.price : null,
      }));

      const earningCategoriesData = await get_EarningCategories({ token });
      const expenseCategoriesData = await get_ExpenseCategories({ token });

      setTransactions(chartData);
      setEarningCategories(earningCategoriesData?.categories ?? []);
      setExpenseCategories(expenseCategoriesData?.categories ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [token]);

  const closeModal = () => {
    setActiveModal(null);
    setTitle("");
    setPrice(null);
    setCategory("");
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      if (!title || title === null || title === "") return;
      if (!price || price === null || price === "") return;
      if (!category || category === null || category === "") return;

      await add_Expenses({ title, price, category, token });
      closeModal();
      await loadTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEarning = async (e) => {
    e.preventDefault();
    try {
      if (!title || title === null || title === "") return;
      if (!price || price === null || price === "") return;
      if (!category || category === null || category === "") return;

      await add_Earning({ title, price, category, token });
      closeModal();
      await loadTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full col-span-3" title={"Overall Chart Report"}>
        <div className="h-96">
          {transactions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactions}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <YAxis hide width={"auto"} fontSize={"12px"} fontWeight={800} />
                <XAxis hide width={"auto"} fontSize={"12px"} fontWeight={800} />
                <Bar dataKey={"expense"} fill="red" />
                <Bar dataKey={"earnings"} fill="#1faa59" />
                <Legend
                  verticalAlign="top"
                  height={40}
                  wrapperStyle={{ fontSize: 14 }}
                  iconSize={12}
                />
                <Tooltip
                  labelFormatter={(index) => {
                    const transaction = transactions[index];
                    return transaction ? formatDate(transaction.date) : "";
                  }}
                />
              </BarChart>
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
            onClick={() => setActiveModal("expense")}
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
            onClick={() => setActiveModal("earning")}
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

      <Card className="w-full" title={"Savings"}>
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

      {/* Unified Add Earning / Add Expense Modal */}
      <Modal
        isOpen={activeModal === "earning" || activeModal === "expense"}
        onClose={closeModal}
        title={activeModal === "earning" ? "Add Earning" : "Add Expense"}
      >
        {(() => {
          const isEarning = activeModal === "earning";
          const categories = isEarning ? earningCategories : expenseCategories;
          const accentColor = isEarning ? "success" : "error";
          const datalistId = isEarning
            ? "earning-category-options"
            : "expense-category-options";

          return (
            <form
              onSubmit={isEarning ? handleAddEarning : handleAddExpense}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">
                  {isEarning ? "Earning Name" : "Expense Name"}
                </label>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-${accentColor}-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Amount
                </label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-${accentColor}-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Category
                </label>
                {categories.length > 0 ? (
                  <>
                    <input
                      type="text"
                      list={datalistId}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Select or type category"
                      className={`w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-${accentColor}-500`}
                    />
                    <datalist id={datalistId}>
                      {categories.map((item) => (
                        <option key={item.id} value={item.name} />
                      ))}
                    </datalist>
                  </>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-${accentColor}-500`}
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 md:col-span-2 border-t border-gray-200 pt-2.5 mt-2.5">
                <Button
                  title={"Save"}
                  type="submit"
                  className={`bg-${accentColor}-500 hover:bg-${accentColor}-700 w-full`}
                />
              </div>
            </form>
          );
        })()}
      </Modal>
    </div>
  );
};

export default Home;
