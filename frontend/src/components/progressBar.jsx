import { Check } from "lucide-react";

const ProgressBar = ({ goal = "", value = 0, max = 100, status = false }) => {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-secondary-500 font-medium">{goal}</p>
        {status ? (
          <p className="flex items-center justify-center gap-2 text-success-500 font-medium">Achieved<Check /></p>
        ) : (
          <p className="text-secondary-500">
            {value}/{max}
          </p>
        )}
      </div>
      <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            status ? "bg-success-500 opacity-50" : "bg-success-500"
          }`}
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
