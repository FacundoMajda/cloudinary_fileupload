// eslint-disable-next-line react/prop-types
const ProgressBar = ({ progress }) => {
  const percent = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
      <div
        className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
