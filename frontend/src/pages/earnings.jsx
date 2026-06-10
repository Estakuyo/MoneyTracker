import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

import Button from "../components/button";
import Card from "../components/card";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";
import { formatCurrency, formatDate } from "../utils/formatters";

import {
  add_Earning,
  getEarnings,
  updateEarning,
  deleteEarning,
  get_EarningCategories,
  get_EarningsCategoryTotal,
  getEarningsTotal,
} from "../services/earnings";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Earnings = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Outputs
  const [earnings, setEarnings] = useState([]);
  const [earningsTotal, setEarningsTotal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const loadEarnings = async () => {
    if (!token) return;
    try {
      const earningsData = await getEarnings({ token });
      const earningsTotalData = await getEarningsTotal({ token });

      const categoriesData = await get_EarningCategories({ token });
      const categoryTotalsData = await get_EarningsCategoryTotal({ token });

      setEarnings(earningsData?.transactions ?? []);
      setEarningsTotal(earningsTotalData?.transactionsTotal[0] ?? {});

      setCategories(categoriesData?.categories ?? []);
      setCategoryTotal(categoryTotalsData?.categoriesTotal ?? []);
    } catch (error) {
      console.log(error);
    }
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

  const handleAddEarning = async (e) => {
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

      await add_Earning({ title, price, category, token });
      closeModal();
      await loadEarnings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card
        className="w-full animate-slide-up"
        title={"Total Earnings"}
        button={
          <Button
            title={"+ Add Earning"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("add")}
          />
        }
      >
        {earningsTotal.total ? (
          <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-secondary-500">
                Total Earnings
              </p>
              <h1 className="text-5xl font-bold text-success-500">
                {formatCurrency(earningsTotal.total)}
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
            title={"View Category"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("categories")}
          />
        }
      >
        <div className="flex flex-col">
          {categoryTotal.length > 0 ? (
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
                  <p className="font-bold text-success-500">
                    {formatCurrency(category.total)}
                  </p>
                  <p className="text-secondary-500 text-sm">Total</p>
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title="No categories yet"
              description="Add your first earning category."
            />
          )}
        </div>
      </Card>

      <Card
        className="w-full animate-slide-up"
        title={"Top Earnings"}
        button={
          <Button
            title={"View Earnings"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("earnings")}
          />
        }
      >
        <div className="flex flex-col">
          {earnings.length > 0 ? (
            earnings.slice(0, 3).map((earning, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-3 border-b border-secondary-500 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-secondary-500">
                    {earning.title}
                  </p>
                  <p className="mt-1 inline-block text-xs bg-primary-100 text-secondary-500 px-2 py-0.5 rounded">
                    {earning.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-500">
                    {formatCurrency(earning.price)}
                  </p>
                  <p className="text-secondary-500 text-sm">
                    {formatDate(earning.date)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title="No earnings yet"
              description="Add your first earning."
            />
          )}
        </div>
      </Card>

      <Card
        className="w-full col-span-3 animate-slide-up-delay-1"
        title={"Earnings Chart"}
      >
        <div className="w-full" style={{ height: 300 }}>
          {earnings.length >= 10 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={earnings}
                style={{
                  border: "1px solid #6ee69b",
                  borderRadius: "8px",
                }}
              >
                <defs>
                  <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1faa59" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1faa59" stopOpacity={0} />
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
                  formatter={(value) => [formatCurrency(value), "earnings"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#1faa59"
                  strokeWidth={2}
                  fill="url(#colorEarning)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Placeholder
              title="Not Enough Data Yet"
              description="Add 10 earnings to activate chart"
            />
          )}
        </div>
      </Card>

      {/* Show Earning Categories Modal */}
      <Modal
        isOpen={activeModal === "categories"}
        onClose={closeModal}
        title={"Earning Categories"}
      >
        <div>
          {categoryTotal.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-base text-secondary-500">
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
                      <p className="font-bold text-success-500">
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
              description="Add your first earning category."
            />
          )}
        </div>
      </Modal>

      {/* Show Earning Transactions Modal */}
      <Modal
        isOpen={activeModal === "earnings"}
        onClose={closeModal}
        title={"Earning Transactions"}
      >
        <div>
          {earnings.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-base text-secondary-500">
                  {earnings.length} earnings
                </p>
              </div>
              <div className="flex flex-col">
                {earnings.map((earning, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-3 border-b border-secondary-500 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-lg text-secondary-500">
                        {earning.title}
                      </p>
                      <p className="mt-1 inline-block text-xs bg-primary-100 text-secondary-500 px-2 py-0.5 rounded">
                        {earning.category_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-500">
                        {formatCurrency(earning.price)}
                      </p>
                      <p className="text-secondary-500 text-sm">
                        {formatDate(earning.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Placeholder
              title="No earnings yet"
              description="Add your first earning."
            />
          )}
        </div>
      </Modal>

      {/* Show Add Earning Modal */}
      <Modal
        isOpen={activeModal === "add"}
        onClose={closeModal}
        title={"Add Earning"}
      >
        <form
          onSubmit={handleAddEarning}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-secondary-600">
              Earning Name
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary-600">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
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
                  list="earning-category-options"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Select or type category"
                  className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
                />
                <datalist id="earning-category-options">
                  {categories.map((item) => (
                    <option key={item.id} value={item.name} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
              />
            )}
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
            <Button
              title={"Save"}
              type="submit"
              className="bg-success-500 hover:bg-success-700 w-full"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Earnings;
