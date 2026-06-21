import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

// Chart
import {
  AreaChart,
  Area,
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
import Skeleton from "../components/skeleton";

import { getAllUserTransactions } from "../services/transactions";
import {
  add_Expenses,
  get_ExpenseCategories,
  getExpensesTotal,
} from "../services/expenses";
import {
  add_Earning,
  get_EarningCategories,
  getEarningsTotal,
} from "../services/earnings";
import { getUserSavings, getUserGoals, addUserGoal } from "../services/savings";
import { formatDate, formatCurrency } from "../utils/formatters";

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Outputs
  const [transactions, setTransactions] = useState([]);
  const [earningsTotal, setEarningsTotal] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState([]);
  const [savingsTotal, setSavingsTotal] = useState([]);
  const [goalsTotal, setGoalsTotal] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [rawTransactions, setRawTransactions] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const loadTransactions = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const transactionsData = await getAllUserTransactions({ token });
      const raw = transactionsData?.transactions ?? [];

      // Group transactions by date
      const grouped = raw.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = { date, earnings: 0, expense: 0 };
        }
        if (item.type === "Earnings") acc[date].earnings += item.price;
        if (item.type === "Expenses") acc[date].expense += item.price;
        return acc;
      }, {});

      const chartData = Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );

      const earningsTotalData = await getEarningsTotal({ token });
      const expensesTotalData = await getExpensesTotal({ token });
      const savingsTotalData = await getUserSavings({ token });
      const goalsTotalData = await getUserGoals({ token });
      const earningCategoriesData = await get_EarningCategories({ token });
      const expenseCategoriesData = await get_ExpenseCategories({ token });

      setTransactions(chartData);
      setRawTransactions(raw);
      setEarningsTotal(earningsTotalData?.transactionsTotal[0] ?? []);
      setExpensesTotal(expensesTotalData?.transactionsTotal[0] ?? []);
      setSavingsTotal(savingsTotalData.savings);
      setGoalsTotal(goalsTotalData?.goals);
      setEarningCategories(earningCategoriesData?.categories ?? []);
      setExpenseCategories(expenseCategoriesData?.categories ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  // Helpers
  const latestEarning = rawTransactions
    .filter((t) => t.type === "Earnings")
    .sort((a, b) => b.id - a.id)[0];
  const latestExpense = rawTransactions
    .filter((t) => t.type === "Expenses")
    .sort((a, b) => b.id - a.id)[0];
  const latestGoal = goalsTotal.sort((a, b) => b.id - a.id)[0];

  const totalEarningsCount = rawTransactions.filter(
    (t) => t.type === "Earnings",
  ).length;
  const totalExpensesCount = rawTransactions.filter(
    (t) => t.type === "Expenses",
  ).length;

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

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      if (!title || title === null || title === "") {
        return;
      }
      if (!price || price === null || price === "") {
        return;
      }

      await addUserGoal({ title, amount: price, token });
      closeModal();
      await loadTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card
        className="w-full col-span-3 animate-slide-up"
        title={"Overall Chart Report"}
      >
        <div className="h-96">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : rawTransactions.length >= 20 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={transactions}
                style={{
                  border: "1px solid #6ee69b",
                  borderRadius: "8px",
                }}
              >
                <defs>
                  <linearGradient
                    id="colorEarnings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1faa59" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1faa59" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  hide
                  dataKey="date"
                  tickFormatter={(val) => formatDate(val)}
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                  tickLine={false}
                />
                <YAxis hide width="auto" />
                <Tooltip
                  labelFormatter={(val) => formatDate(val)}
                  formatter={(value, name) => [formatCurrency(value), name]}
                />
                <Legend
                  verticalAlign="top"
                  height={40}
                  wrapperStyle={{ fontSize: 14 }}
                  iconSize={12}
                />
                <Area
                  type={"monotone"}
                  dataKey="earnings"
                  stroke="#1faa59"
                  strokeWidth={2}
                  fill="url(#colorEarnings)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type={"monotone"}
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#colorExpense)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Placeholder
              title="Not Enough Data Yet"
              description="Add 20 transactions to activate chart"
            />
          )}
        </div>
      </Card>

      <Card
        className="w-full animate-slide-up-delay-1"
        title={"Expenses"}
        button={
          <Button
            title={"- Add Expense"}
            className="bg-error-500 hover:bg-error-700"
            onClick={() => setActiveModal("expense")}
          />
        }
      >
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : expensesTotal ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-secondary-500">
              Total Overall Expenses
            </h1>
            <h1 className="text-5xl text-error-600 font-bold">
              {formatCurrency(expensesTotal.total)}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-error-800">
                  {formatCurrency(latestExpense?.price) || 0}
                </p>
                <p className="font-semibold text-secondary-500">
                  Recent Expense
                </p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-error-800">{totalExpensesCount}</p>
                <p className="font-semibold text-secondary-500">
                  Expenses Added
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>

      <Card
        className="w-full animate-slide-up-delay-1"
        title={"Earnings"}
        button={
          <Button
            title={"+ Add Earning"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("earning")}
          />
        }
      >
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : earningsTotal ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-secondary-500">
              Total Overall Earnings
            </h1>
            <h1 className="text-5xl text-success-600 font-bold">
              {formatCurrency(earningsTotal.total)}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-success-800">
                  {formatCurrency(latestEarning?.price) || 0}
                </p>
                <p className="font-semibold text-secondary-500">
                  Recent Earning
                </p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-success-800">
                  {totalEarningsCount}
                </p>
                <p className="font-semibold text-secondary-500">
                  Earnings Added
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>

      <Card
        className="w-full animate-slide-up-delay-1"
        title={"Savings"}
        button={
          <Button
            title={"Add Goal"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("goal")}
          />
        }
      >
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : savingsTotal ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-md font-semibold text-secondary-500">
              Total Overall Savings
            </h1>
            <h1 className="text-5xl text-success-600 font-bold">
              {formatCurrency(savingsTotal.total)}
            </h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-success-800">
                  {latestGoal?.title || "None"}
                </p>
                <p className="font-semibold text-secondary-500">Recent Goal</p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="font-bold text-success-800">
                  {goalsTotal.length}
                </p>
                <p className="font-semibold text-secondary-500">Goals Added</p>
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
                <label className="text-sm font-semibold text-secondary-600">
                  {isEarning ? "Earning Name" : "Expense Name"}
                </label>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-${accentColor}-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-secondary-600">
                  Amount
                </label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-${accentColor}-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-secondary-600">
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
                      className={`w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-${accentColor}-500`}
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
                    className={`w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-${accentColor}-500`}
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
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

      {/* Add Goal Modal */}
      <Modal
        isOpen={activeModal === "goal"}
        onClose={closeModal}
        title={"Add Goal"}
      >
        <form
          onSubmit={handleAddGoal}
          className="sm:grid sm:grid-cols-2 gap-5 flex flex-col"
        >
          <div>
            <label className="text-sm font-semibold text-secondary-600">
              Title
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-secondary-600">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
            <Button
              title={"Submit"}
              className="bg-success-500 hover:bg-success-700 w-full col-span-2"
              type="submit"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
