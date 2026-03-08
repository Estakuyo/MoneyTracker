import Card from "../components/card";
import Button from "../components/button";

const Home = () => {
  return (
    <div className="main-wrapper px-10 py-20 flex flex-col md:grid gap-5 md:py-10">
      <Card className="w-full col-span-3" title={"Total Balance"} />
      <Card
        className="w-full"
        title={"Total Expenses"}
        button={
          <Button
            title={"Add Expense"}
            className="bg-error-500 hover:bg-error-700"
          />
        }
      />
      <Card
        className="w-full"
        title={"Total Earnings"}
        button={
          <Button
            title={"Add Earning"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />
      <Card
        className="w-full"
        title={"Total Savings"}
        button={
          <Button
            title={"Add Saving"}
            className="bg-success-500 hover:bg-success-700"
          />
        }
      />
    </div>
  );
};

export default Home;
