const Sidebar = () => {
  return (
    <div className="fixed left-0 border h-screen w-60 md:w-70">
      <h1 className="my-30 text-center">MoneyTracker</h1>
      <ul>
        <li className="py-5 pl-10 border">
          <a href="/home">Home</a>
        </li>
        <li className="py-5 pl-10 border">
          <a href="/expenses">Expenses</a>
        </li>
        <li className="py-5 pl-10 border">
          <a href="/savings">Savings</a>
        </li>
        <li className="py-5 pl-10 border">
          <a href="/earnings">Earnings</a>
        </li>
      </ul>
      <button className="border absolute bottom-0 left-0 right-0 w-4/5 mx-auto mb-10">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
