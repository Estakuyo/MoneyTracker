import { useState, useContext, useEffect } from "react";

import Card from "../components/card";
import Button from "../components/button";
import ProgressBar from "../components/progressBar";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";
import Skeleton from "../components/skeleton";
import { formatCurrency, formatDate } from "../utils/formatters";

import {
  getUserSavings,
  addUserGoal,
  getUserGoals,
  getAllUserSavings,
} from "../services/savings";
import { UserContext } from "../context/authContext";

const Savings = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inputs
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();

  // Outputs
  const [savings, setSavings] = useState();
  const [goals, setGoals] = useState([]);
  const [allSavings, setAllSavings] = useState([]);

  const { token } = useContext(UserContext);

  const loadSavings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const savingsData = await getUserSavings({ token });
      const goalsData = await getUserGoals({ token });
      const allSavingsData = await getAllUserSavings({ token });

      setSavings(savingsData.savings);
      setGoals(goalsData.goals);
      setAllSavings(allSavingsData.savings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavings();
  }, [token]);

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      if (!title || title === null || title === "") {
        return;
      }
      if (!amount || amount === null || amount === "") {
        return;
      }

      await addUserGoal({ title, amount, token });
      closeModal();
      await loadSavings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full animate-slide-up" title={"Total Savings"}>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : savings ? (
          <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold text-secondary-500">
                Overall Savings
              </p>
              <h1 className="text-5xl font-bold text-success-500">
                {formatCurrency(savings.total)}
              </h1>
            </div>
          </div>
        ) : (
          <Placeholder title="No savings yet" />
        )}
      </Card>

      <Card
        className="w-full animate-slide-up"
        title={"Savings Goals"}
        button={
          <Button
            title={"View Goals"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("goals")}
          />
        }
      >
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : goals.length > 0 ? (
          goals.slice(0, 3).map((goal, index) => (
            <div className="flex flex-col gap-10 py-4" key={index}>
              <div className="flex flex-col gap-2">
                <ProgressBar
                  goal={goal.title}
                  value={savings.total}
                  max={goal.amount}
                  status={goal.status}
                />
              </div>
            </div>
          ))
        ) : (
          <Placeholder
            title="No goals yet"
            description="Add your first goal."
          />
        )}
      </Card>

      <Card
        className="w-full col-span-2 animate-slide-up-delay-1"
        title={"Savings Chart"}
      >
        <div className="w-full" style={{ height: 300 }}>
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : allSavings.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={allSavings}
                style={{
                  border: "1px solid #6ee69b",
                  borderRadius: "8px",
                }}
              >
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1faa59" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1faa59" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="1 1"
                  stroke="#94a3b8"
                  vertical={false}
                />
                <XAxis hide dataKey="date" />
                <YAxis width="auto" fontSize={12} fontWeight={600} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#1faa59"
                  strokeWidth={2}
                  fill="url(#colorSavings)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Placeholder />
          )}
        </div>
      </Card>

      <Modal
        isOpen={activeModal === "goals"}
        onClose={closeModal}
        title={"Goals"}
      >
        <div>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <div className="flex flex-col gap-10 py-4" key={index}>
                <div className="flex flex-col gap-2">
                  <ProgressBar
                    goal={goal.title}
                    value={savings.total}
                    max={goal.amount}
                    status={goal.status}
                  />
                </div>
              </div>
            ))
          ) : (
            <Placeholder
              title="No goals yet"
              description="Add your first goal"
            />
          )}
          <div className="flex justify-center pt-6">
            <Button
              title={"Add Goal"}
              className="bg-success-500 hover:bg-success-700 w-full"
              onClick={() => setActiveModal("add-goal")}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "add-goal"}
        onClose={() => setActiveModal("goals")}
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
              onChange={(e) => setAmount(e.target.value)}
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

export default Savings;
