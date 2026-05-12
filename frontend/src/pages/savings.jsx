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
import { formatCurrency } from "../utils/formatters";

import { getUserSavings } from "../services/savings";
import { UserContext } from "../context/authContext";

const Savings = () => {
  const [activeModal, setActiveModal] = useState(null);

  const [savings, setSavings] = useState();

  const { token } = useContext(UserContext);

  const loadSavings = async () => {
    if (!token) return;
    try {
      const savingsData = await getUserSavings({ token });

      setSavings(savingsData.savings);
    } catch (error) {}
  };

  useEffect(() => {
    loadSavings();
  }, [token]);

  const sampleGoals = [];
  const sampleDataChart = [];

  const closeModal = () => {
    setActiveModal(null);
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
        {sampleGoals.length > 0 ? (
          sampleGoals.slice(0, 3).map((goal, index) => (
            <div className="flex flex-col gap-10 py-4">
              <div className="flex flex-col gap-2" key={index}>
                <ProgressBar
                  goal={goal.name}
                  value={goal.saved}
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
          {sampleDataChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleDataChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis width={"auto"} fontSize={"12px"} fontWeight={800} />
                <XAxis
                  width={"auto"}
                  fontSize={"12px"}
                  fontWeight={800}
                  dataKey={"date"}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="darkgreen"
                  strokeWidth={3}
                  dot={false}
                />
                <Tooltip />
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
          {sampleGoals.length > 0 ? (
            sampleGoals.map((goal, index) => (
              <div className="flex flex-col gap-10 py-4" key={index}>
                <div className="flex flex-col gap-2">
                  <ProgressBar
                    goal={goal.name}
                    value={goal.saved}
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
        </div>
      </Modal>
    </div>
  );
};

export default Savings;
