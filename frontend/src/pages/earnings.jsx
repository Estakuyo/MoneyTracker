import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

import Button from "../components/button";
import Card from "../components/card";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";
import Skeleton from "../components/skeleton";
import CategorySelect from "../components/categorySelect";
import { formatCurrency, formatDate } from "../utils/formatters";
import Dropdown from "../components/dropdown";

import { Trash2, Pencil, Loader2 } from "lucide-react";
import AlertBox from "../components/alertBox";
import useAlert from "../hooks/useAlert";
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
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sort, setSort] = useState("highest");
  const [selectedEarning, setSelectedEarning] = useState(null);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);

  // Outputs
  const [earnings, setEarnings] = useState([]);
  const [earningsModal, setEarningsModal] = useState([]);
  const [earningsTotal, setEarningsTotal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState([]);

  // Inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);
  const { alert, showAlert, clearAlert } = useAlert();

  const loadEarnings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const earningsData = await getEarnings({ token, sort: "highest" });
      const earningsModalData = await getEarnings({ token, sort });
      const earningsTotalData = await getEarningsTotal({ token });

      const categoriesData = await get_EarningCategories({ token });
      const categoryTotalsData = await get_EarningsCategoryTotal({ token });

      setEarnings(earningsData?.transactions ?? []);
      setEarningsModal(earningsModalData?.transactions ?? []);
      setEarningsTotal(earningsTotalData?.transactionsTotal[0] ?? {});

      setCategories(categoriesData?.categories ?? []);
      setCategoryTotal(categoryTotalsData?.categoriesTotal ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadSortedEarnings = async () => {
    if (!token) return;
    try {
      const data = await getEarnings({ token, sort });
      setEarningsModal(data?.transactions ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEarnings();
  }, [token]);

  useEffect(() => {
    if (!loading) {
      loadSortedEarnings();
    }
  }, [sort]);

  const closeModal = () => {
    setActiveModal(null);
    setTitle("");
    setPrice(null);
    setCategory("");
    setSelectedEarning(null);
  };

  const handleDeleteEarning = async () => {
    if (!confirmDeleteItem) return;
    try {
      setIsDeleting(true);
      await deleteEarning({ transactionId: confirmDeleteItem.id, token });
      setConfirmDeleteItem(null);
      await loadEarnings();
      showAlert("Earning deleted successfully.", "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to delete earning.", "error");
    } finally {
      setIsDeleting(false);
      setActiveModal("earnings");
    }
  };

  const handleEditEarning = (earning) => {
    setSelectedEarning(earning);
    setTitle(earning.title);
    setPrice(earning.price);
    setCategory(earning.category_name ?? "");
    setActiveModal("edit");
  };

  const handleUpdateEarning = async (e) => {
    e.preventDefault();
    if (!title || !price || !category) return;
    try {
      setIsUpdating(true);
      await updateEarning({
        transactionId: selectedEarning.id,
        title,
        price,
        category,
        token,
      });
      closeModal();
      await loadEarnings();
      showAlert("Earning updated successfully.", "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to update earning.", "error");
    } finally {
      setIsUpdating(false);
    }
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

      setIsAdding(true);
      await add_Earning({ title, price, category, token });
      closeModal();
      await loadEarnings();
      showAlert("Earning added successfully.", "success");
    } catch (error) {
      console.log(error);
      showAlert("Failed to add earning.", "error");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={clearAlert}
        />
      )}
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
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : earningsTotal.total ? (
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
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : earnings.length > 0 ? (
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
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : earnings.length >= 10 ? (
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
          {earningsModal.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-base text-secondary-500">
                  {earningsModal.length} earnings
                </p>
              </div>
              <div className="flex justify-center mb-4">
                <Dropdown
                  label={`Sort : ${sort.toUpperCase().charAt(0) + sort.slice(1)}`}
                  items={[
                    {
                      label: "Highest",
                      onClick: () => setSort("highest"),
                    },
                    { label: "Lowest", onClick: () => setSort("lowest") },
                    { label: "Latest", onClick: () => setSort("latest") },
                    { label: "Oldest", onClick: () => setSort("oldest") },
                  ]}
                />
              </div>
              <div className="flex flex-col">
                {earningsModal.map((earning, index) => (
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
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-success-500">
                          {formatCurrency(earning.price)}
                        </p>
                        <p className="text-secondary-500 text-sm">
                          {formatDate(earning.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditEarning(earning)}
                          className="p-1.5 rounded-md bg-primary-500 text-white hover:bg-primary-700 transition-colors duration-150"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setActiveModal(null);
                            setConfirmDeleteItem(earning);
                          }}
                          className="p-1.5 rounded-md bg-error-500 text-white hover:bg-error-700 transition-colors duration-150"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
            <CategorySelect
              categories={categories}
              value={category}
              onChange={setCategory}
              accentColor={"success"}
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
            <Button
              title={
                isAdding ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Adding...
                  </span>
                ) : (
                  "Save"
                )
              }
              type="submit"
              disabled={isAdding}
              className={`w-full ${
                isAdding
                  ? "bg-success-500 opacity-70 cursor-not-allowed"
                  : "bg-success-500 hover:bg-success-700"
              }`}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Earning Modal */}
      <Modal
        isOpen={activeModal === "edit"}
        onClose={closeModal}
        title={"Edit Earning"}
      >
        <form
          onSubmit={handleUpdateEarning}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-secondary-600">
              Earning Name
            </label>
            <input
              type="text"
              defaultValue={selectedEarning?.title}
              key={selectedEarning?.id + "-title"}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-secondary-600">
              Amount
            </label>
            <input
              type="number"
              defaultValue={selectedEarning?.price}
              key={selectedEarning?.id + "-price"}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 text-secondary-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-secondary-600">
              Category
            </label>
            <CategorySelect
              key={selectedEarning?.id + "-category"}
              categories={categories}
              value={category}
              onChange={setCategory}
              accentColor={"success"}
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-secondary-200 pt-2.5 mt-2.5">
            <Button
              title={
                isUpdating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )
              }
              type="submit"
              disabled={isUpdating}
              className={`w-full ${
                isUpdating
                  ? "bg-success-500 opacity-70 cursor-not-allowed"
                  : "bg-success-500 hover:bg-success-700"
              }`}
            />
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={!!confirmDeleteItem}
        onClose={() => {
          setConfirmDeleteItem(null);
          setActiveModal("earnings");
        }}
        title="Delete Earning"
      >
        <div className="flex flex-col gap-5">
          {/* Transaction info */}
          <div className="rounded-lg bg-secondary-50 border border-secondary-200 px-4 py-3 flex gap-1.5">
            <div>
              <p className="font-semibold text-secondary-800 text-lg">
                {confirmDeleteItem?.title}
              </p>
              <span className="inline-block text-xs bg-primary-100 text-secondary-500 px-2 py-0.5 rounded w-fit">
                {confirmDeleteItem?.category_name}
              </span>
            </div>
            <div className="flex flex-1 flex-col text-right justify-center gap-1">
              <p className="font-bold text-success-600">
                {formatCurrency(confirmDeleteItem?.price)}
              </p>
              <p className="text-secondary-400 text-sm">
                {formatDate(confirmDeleteItem?.date)}
              </p>
            </div>
          </div>
          <p className="text-secondary-600 text-sm text-center">
            Are you sure you want to delete this earning? This action cannot be
            undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setConfirmDeleteItem(null);
                setActiveModal("earnings");
              }}
              className="flex-1 rounded-xl py-2.5 px-4 border border-secondary-300 text-secondary-600 font-semibold hover:bg-secondary-100 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteEarning}
              disabled={isDeleting}
              className="flex-1 rounded-xl py-2.5 px-4 bg-error-500 text-white font-semibold hover:bg-error-700 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Earnings;
