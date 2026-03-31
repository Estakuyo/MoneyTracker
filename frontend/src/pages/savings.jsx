import Card from "../components/card";
import Button from "../components/button";

const Savings = () => {
  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Savings"}>
        <div className="flex flex-col justify-center items-center py-8 gap-7 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold text-gray-500">
              Overall Savings
            </p>
            <h1 className="text-5xl font-bold text-success-500">₱6,500</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md text-gray-500">Regular Monthly Savings</p>
            <h1 className="text-2xl font-bold text-success-500">₱5,000</h1>
          </div>
        </div>
      </Card>

      <Card
        className="w-full"
        title={"Savings Goals"}
        button={
          <Button
            title={"View Goals"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />

      <Card
        className="w-full"
        title={"Savings"}
        button={
          <Button
            title={"View Savings"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />

      <Card className="w-full col-span-3" title={"Savings History"}></Card>
    </div>
  );
};

export default Savings;
