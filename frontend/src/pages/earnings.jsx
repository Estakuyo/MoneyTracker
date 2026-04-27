import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/authContext";

import Button from "../components/button";
import Card from "../components/card";
import Placeholder from "../components/placeholder";
import Modal from "../components/modal";

import {
  add_Earning,
  getEarnings,
  updateEarning,
  deleteEarning,
} from "../services/earnings";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Earnings = () => {
  const [activeModal, setActiveModal] = useState(null);

  const [earnings, setEarnings] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  const { token } = useContext(UserContext);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return date.toLocaleDateString("en-PH");
  };

  useEffect(() => {
    const loadEarnings = async () => {
      if (!token) return;
      try {
        const data = await getEarnings({ token });
        setEarnings(data.earnings);
      } catch (error) {
        console.log(error);
      }
    };
    loadEarnings();
  }, [token]);

  const handleAddEarning = async (e) => {
    e.preventDefault();
    try {
      await add_Earning({ title, price, category, token });
      setActiveModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card
        className="w-full"
        title={"Total Earnings"}
        button={
          <Button
            title={"+ Add Earning"}
            className="bg-success-500 hover:bg-success-700"
            onClick={() => setActiveModal("add")}
          />
        }
      >
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Total Earnings
            </p>
            <h1 className="text-5xl font-bold text-success-500">0</h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
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
          {earnings.length > 0 ? (
            earnings.slice(0, 3).map((earning, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-4 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-gray-500">
                    {earning.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-500">{earning.price}</p>
                  <p className="text-gray-500 text-sm">Total</p>
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
        className="w-full"
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
                className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-lg text-gray-500">
                    {earning.title}
                  </p>
                  <p className="mt-1 inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {earning.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-500">{earning.price}</p>
                  <p className="text-gray-500 text-sm">
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

      <Card className="w-full col-span-3" title={"Earnings History"}>
        <div className="w-full" style={{ height: 300 }}>
          {earnings.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis width={"auto"} fontSize={"12px"} fontWeight={800} />
                <XAxis hide width={"auto"} fontSize={"12px"} fontWeight={800} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="darkgreen"
                  strokeWidth={3}
                  dot={false}
                />
                <Tooltip
                  labelFormatter={(index) => {
                    const earning = earnings[index];
                    return earning ? formatDate(earning.date) : "";
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Placeholder />
          )}
        </div>
      </Card>

      {/* Show Earning Categories Modal */}
      <Modal
        isOpen={activeModal === "categories"}
        onClose={() => setActiveModal(null)}
        title={"Earning Categories"}
      >
        <div>
          {earnings.length > 0 > 0 ? (
            <div>
              <div className="text-center mb-2">
                <p className="text-md text-gray-500">
                  {earnings.length} categories
                </p>
              </div>
              <div className="flex flex-col">
                {earnings.map((earning, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-4 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-lg text-gray-500">
                        {earning.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-500">
                        {earning.price}
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
              description="Add your first earning category."
            />
          )}
        </div>
      </Modal>

      {/* Show Earning Transactions Modal */}
      <Modal
        isOpen={activeModal === "earnings"}
        onClose={() => setActiveModal(null)}
        title={"Earning Transactions"}
      >
        <div>
          {earnings.length > 0 ? (
            <div>
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-primary-600">
                  Earning Transactions
                </h1>
                <p className="text-sm text-gray-500">
                  {earnings.length} earnings
                </p>
              </div>
              <div className="flex flex-col">
                {earnings.map((earning, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-lg text-gray-500">
                        {earning.title}
                      </p>
                      <p className="mt-1 inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                        {earning.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-500">
                        {earning.price}
                      </p>
                      <p className="text-gray-500 text-sm">
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
        onClose={() => setActiveModal(null)}
        title={"Add Earning"}
      >
        <form
          onSubmit={handleAddEarning}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Earning Name
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Category
            </label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-800 outline-none focus:border-success-500"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2 border-t border-gray-200 pt-2.5 mt-2.5">
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
