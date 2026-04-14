import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

import Card from "../components/card";
import Button from "../components/button";
import Placeholder from "../components/placeholder";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const Expenses = () => {
  const sampleCategories = [
    // { name: "Food", amount: 500 },
    // { name: "Gasoline", amount: 1000 },
    // { name: "Motorcycle Maintenance", amount: 600 },
    // { name: "Girlfriend Date", amount: 1500 },
    // { name: "Beer", amount: 300 },
  ];

  const sampleExpenses = [
    // {
    //   name: "Lunch",
    //   amount: 90,
    //   date: "05/05/2025",
    //   category: sampleCategories[0].name,
    // },
    // {
    //   name: "Groceries",
    //   amount: 1200,
    //   date: "05/02/2025",
    //   category: sampleCategories[0].name,
    // },
    // {
    //   name: "Fuel",
    //   amount: 800,
    //   date: "05/03/2025",
    //   category: sampleCategories[1].name,
    // },
    // {
    //   name: "ThursDate",
    //   amount: 999,
    //   date: "04/30/2025",
    //   category: sampleCategories[3].name,
    // },
    // {
    //   name: "Smirnoff",
    //   amount: 350,
    //   date: "05/06/2025",
    //   category: sampleCategories[4].name,
    // },
  ];

  const sampleDataChart = [
    // { month: "January", total: 400 },
    // { month: "February", total: 600 },
    // { month: "March", total: 800 },
    // { month: "April", total: 1000 },
    // { month: "May", total: 1200 },
    // { month: "June", total: 1400 },
    // { month: "July", total: 1600 },
    // { month: "August", total: 1800 },
    // { month: "September", total: 2000 },
    // { month: "October", total: 2200 },
    // { month: "November", total: 2400 },
    // { month: "December", total: 2600 },
  ];

  const { openModal } = useContext(ModalContext);

  const showCategories = () => {
    openModal({
      title: "Total Categories",
      content: (
        <div>
          {sampleCategories.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-md text-gray-500">
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
          ) : (
            <Placeholder
              title="No categories yet"
              description="Add your first expense category."
            />
          )}
        </div>
      ),
    });
  };

  const showExpenses = () => {
    openModal({
      title: "Expenses",
      content: (
        <div>
          {sampleExpenses.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-primary-600">
                  Expense Transactions
                </h1>
                <p className="text-sm text-gray-500">
                  {sampleExpenses.length} expenses
                </p>
              </div>
              <div className="flex flex-col">
                {sampleExpenses.map((expense, index) => (
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
                      <p className="font-bold text-success-500">
                        {expense.amount}
                      </p>
                      <p className="text-gray-500 text-sm">{expense.date}</p>
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
      ),
    });
  };

  const addExpense = () => {
    openModal({
      title: "Add Expense",
      content: (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Expense Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-error-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-error-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Category
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-error-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-gray-200 pt-2.5 mt-2.5">
            <Button
              title={"Save"}
              className="bg-error-500 hover:bg-error-700 w-full"
            />
          </div>
        </div>
      ),
    });
  };

  const totalExpenses = sampleExpenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  const totalExpensesDisplay = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(totalExpenses);

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card
        className="w-full"
        title={"Total Expense"}
        button={
          <Button
            title={"- Add Expense"}
            className="bg-error-500 hover:bg-error-700"
            onClick={addExpense}
          />
        }
      >
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Total Expenses
            </p>
            <h1 className="text-5xl font-bold text-error-500">
              {totalExpensesDisplay}
            </h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Top Category"}
        button={
          <Button
            className="bg-error-500 hover:bg-error-700"
            title={"View Category"}
            onClick={showCategories}
          />
        }
      >
        <div className="flex flex-col">
          {sampleCategories.length > 0 ? (
            sampleCategories.slice(0, 3).map((category, index) => (
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
        className="w-full"
        title={"Top Expenses"}
        button={
          <Button
            className="bg-error-500 hover:bg-error-700"
            title={"View Expenses"}
            onClick={showExpenses}
          />
        }
      >
        <div className="flex flex-col">
          {sampleExpenses.length > 0 ? (
            sampleExpenses.slice(0, 3).map((expense, index) => (
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
            ))
          ) : (
            <Placeholder
              title="No expenses yet"
              description="Add your first expense."
            />
          )}
        </div>
      </Card>

      <Card className="w-full col-span-3" title={"Monthly Expense History"}>
        <div className="w-full" style={{ height: 300 }}>
          {sampleDataChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleDataChart}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"month"} tick={false} />
                <YAxis
                  width="auto"
                  type="number"
                  fontSize={"12px"}
                  fontWeight={800}
                />
                <Bar dataKey={"total"} fill="#ef4444" radius={[10, 10, 0, 0]} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Placeholder />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
