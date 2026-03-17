import Card from "../components/card";
import Button from "../components/button";

const Expenses = () => {
  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full" title={"Total Expense"} />

      <Card className="w-full" title={"Categories"} />

      <Card className="w-full" title={"Expenses"} />

      <Card className="w-full col-span-3" title={"Expense Chart"} />
    </div>
  );
};

export default Expenses;
