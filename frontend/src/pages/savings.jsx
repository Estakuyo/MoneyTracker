import { useState, useContext, useEffect } from "react";

import Card from "../components/card";
import Button from "../components/button";
import ProgressBar from "../components/progressBar";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";
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
      const savingsData = await getUserSavings({ token });
      const goalsData = await getUserGoals({ token });
      const allSavingsData = await getAllUserSavings({ token });

      setSavings(savingsData.savings);
      setGoals(goalsData.goals);
      setAllSavings(allSavingsData.savings);
    } catch (error) {
      console.log(error);
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
      <Card className="w-full" title={"Total Savings"}>
        {savings ? (
          <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold text-gray-500">
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
        className="w-full"
        title={"Savings Goals"}
        button={
          <Button
            title={"View Goals"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("goals")}
          />
        }
      >
        {goals.length > 0 ? (
          goals.slice(0, 3).map((goal, index) => (
            <div className="flex flex-col gap-10 py-4" key={index}>
              <div className="flex flex-col gap-2">
                <ProgressBar
                  goal={goal.title}
                  value={savings.total}
                  max={goal.amount}
                />
              </div>
            </div>
          ))
        ) : (
          <Placeholder
            title="No savings yet"
            description="Add your first goal."
          />
        )}
      </Card>

      <Card className="w-full col-span-2" title={"Savings History"}>
        <div className="w-full" style={{ height: 300 }}>
          {allSavings.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={allSavings}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis width={"auto"} fontSize={"12px"} fontWeight={800} />
                <XAxis hide width={"auto"} fontSize={"12px"} fontWeight={800} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="darkgreen"
                  strokeWidth={3}
                  dot={false}
                />
                <Tooltip
                  labelFormatter={(index) => {
                    const saving = allSavings[index];
                    return saving ? formatDate(saving.date) : "";
                  }}
                />
              </LineChart>
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
        <form onSubmit={handleAddGoal} className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-semibold text-gray-600">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-primary-500"
            />
          </div>
          <Button
            title={"Submit"}
            className="bg-success-500 hover:bg-success-700 w-full col-span-2"
            type="submit"
          />
        </form>
      </Modal>
    </div>
  );
};

export default Savings;
