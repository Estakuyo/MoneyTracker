const ProgressBar = ({ goal = "", value = 0, max = 100 }) => {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-gray-500 font-medium">{goal}</p>
        <p className="text-gray-500">
          {value}/{max}
        </p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-success-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </>
  );
};

export default ProgressBar;
