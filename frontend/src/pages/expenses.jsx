import Card from "../components/card";
import Button from "../components/button";

const Expenses = () => {
  const sampleCategories = [
    { name: "Food", amount: 500 },
    { name: "Gasoline", amount: 1000 },
    { name: "Motorcycle Maintenance", amount: 600 },
    { name: "Girlfriend Date", amount: 1500 },
    { name: "Beer", amount: 300 },
  ];

  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Expense"}>
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Overall Expense
            </p>
            <h1 className="text-5xl font-bold text-error-500">₱6,500</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md text-gray-500">Regular Monthly Expenses</p>
            <h1 className="text-2xl font-bold text-error-500">₱5,000</h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Top Category"}
        button={
          <Button
            className="bg-secondary-500 hover:bg-accent-700"
            title={"View Category"}
          />
        }
      >
        <div className="flex flex-col gap-5">
          {sampleCategories.map((category, index) => (
            <div
              key={index}
              className="flex justify-between font-medium text-lg text-gray-500"
            >
              <p>{category.name}</p>
              <p className="text-error-500">{category.amount}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Expenses"}
        button={
          <Button
            className="bg-secondary-500 hover:bg-accent-700"
            title={"View Expenses"}
          />
        }
      />

      <Card className="w-full col-span-3" title={"Expense Chart"} />
    </div>
  );
};

export default Expenses;
