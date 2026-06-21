import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/authContext";

import Card from "../components/card";
import Button from "../components/button";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";
import Skeleton from "../components/skeleton";
import { formatCurrency, formatDate } from "../utils/formatters";

import {
  add_Expenses,
  getExpenses,
  updateExpense,
  deleteExpense,
  get_ExpenseCategories,
  get_ExpensesCategoryTotal,
  getExpensesTotal,
} from "../services/expenses";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const Expenses = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Outputs
  const [expenses, setExpenses] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const loadExpenses = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const expensesData = await getExpenses({ token });
      const expensesTotalData = await getExpensesTotal({ token });

      const categoriesData = await get_ExpenseCategories({ token });
      const categoryTotalsData = await get_ExpensesCategoryTotal({ token });

      setExpenses(expensesData?.transactions ?? []);
      setExpensesTotal(expensesTotalData?.transactionsTotal[0] ?? {});

      setCategories(categoriesData?.categories ?? []);
      setCategoryTotal(categoryTotalsData?.categoriesTotal ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
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
      if (!title || title === null || title === "") {
        return;
      }
      if (!price || price === null || price === "") {
        return;
      }
      if (!category || category === null || category === "") {
        return;
      }

      await add_Expenses({ title, price, category, token });
      closeModal();
      await loadExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card
        className="w-full animate-slide-up"
        title={"Total Expense"}
        button={
          <Button
            title={"- Add Expense"}
            className="bg-error-500 hover:bg-error-700"
            onClick={() => setActiveModal("add")}
          />
        }
      >
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : expensesTotal.total ? (
          <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold text-secondary-500">
                Total Expenses
              </p>
              <h1 className="text-5xl font-bold text-error-500">
                {formatCurrency(expensesTotal.total)}
              </h1>
            </div>
          </div>
        ) : (
          <Placeholder />
        )}
      </Card>

      <Card
        className="w-full animate-slide-up"
        title={"Top Category"}
        button={
          <Button
            className="bg-error-500 hover:bg-error-700"
            title={"View Category"}
            onClick={() => setActiveModal("categories")}
          />
        }
      >
        <div className="flex flex-col">
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : categoryTotal.length > 0 ? (
            categoryTotal.slice(0, 3).map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-4 border-b border-secondary-500 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-secondary-500">
                    {category.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-error-500">
                    {formatCurrency(category.total)}
                  </p>
                  <p className="text-secondary-500 text-sm">Total</p>
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title="No categories yet"
              description="Add your first expense category."
            />
          )}
        </div>
      </Card>

      <Card
        className="w-full animate-slide-up"
        title={"Top Expenses"}
        button={
          <Button
            className="bg-error-500 hover:bg-error-700"
            title={"View Expenses"}
            onClick={() => setActiveModal("expenses")}
          />
        }
      >
        <div className="flex flex-col">
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : expenses.length > 0 ? (
            expenses.slice(0, 3).map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-3 border-b border-secondary-500 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-secondary-500">
                    {expense.title}
                  </p>
                  <p className="mt-1 inline-block text-xs bg-primary-100 text-secondary-500 px-2 py-0.5 rounded">
                    {expense.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-error-500">
                    {formatCurrency(expense.price)}
                  </p>
                  <p className="text-secondary-500 text-sm">
                    {formatDate(expense.date)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title="No expenses yet"
              description="Add your first expense."
            />
          )}
        </div>
      </Card>

      <Card
        className="w-full col-span-3 animate-slide-up-delay-1"
        title={"Expense Chart"}
      >
        <div className="w-full" style={{ height: 300 }}>
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : expenses.length >= 10 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={expenses}
                style={{
                  border: "1px solid #fca5a5",
                  borderRadius: "8px",
                }}
              >
                <defs>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis hide dataKey="title" />
                <YAxis width="auto" fontSize={12} fontWeight={600} />
                <Tooltip
                  labelFormatter={(_, payload) => {
                    const item = payload?.[0]?.payload;
                    return item
                      ? `${item.title} • ${formatDate(item.date)}`
                      : "";
                  }}
                  formatter={(value) => [formatCurrency(value), "expense"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
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
              description="Add 10 expenses to activate chart"
            />
          )}
        </div>
      </Card>

      {/* Show Expense Categories Modal */}
      <Modal
        isOpen={activeModal === "categories"}
        onClose={closeModal}
        title={"Expense Categories"}
      >
        <div>
          {categoryTotal.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-md text-secondary-500">
                  {categoryTotal.length} categories
                </p>
              </div>
              <div className="flex flex-col">
                {categoryTotal.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-4 border-b border-secondary-500 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-lg text-secondary-500">
                        {category.category_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-error-500">
                        {formatCurrency(category.total)}
                      </p>
                      <p className="text-secondary-500 text-sm">Total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Placeholder
              title="No categories yet"
              description="Add your first expense category."
            />
          )}
        </div>
      </Modal>

      {/* Show Expenses Transactions Modal */}
      <Modal
        isOpen={activeModal === "expenses"}
        onClose={closeModal}
        title={"Expense Transactions"}
      >
        <div>
          {expenses.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-sm text-secondary-500">
                  {expenses.length} expenses
                </p>
              </div>
              <div className="flex flex-col">
                {expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-lg text-secondary-500">
                        {expense.title}
                      </p>
                      <p className="mt-1 inline-block text-xs bg-primary-100 text-secondary-500 px-2 py-0.5 rounded">
                        {expense.category_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-error-500">
                        {formatCurrency(expense.price)}
                      </p>
                      <p className="text-secondary-500 text-sm">
                        {formatDate(expense.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Placeholder
              title="No expenses yet"
              description="Add your first expense."
            />
          )}
        </div>
      </Modal>

      {/* Show Add Expense Modal */}
      <Modal
        isOpen={activeModal === "add"}
        onClose={closeModal}
        title={"Add Expense"}
      >
        <form
          onSubmit={handleAddExpense}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-secondary-600">
              Expense Name
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-error-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary-600">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-error-500"
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
                  list="expense-category-options"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Select or type category"
                  className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-error-500"
                />
                <datalist id="expense-category-options">
                  {categories.map((item) => (
                    <option key={item.id} value={item.name} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-error-500"
              />
            )}
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
            <Button
              title={"Save"}
              type="submit"
              className="bg-error-500 hover:bg-error-700 w-full"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Expenses;
