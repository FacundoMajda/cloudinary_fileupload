// eslint-disable-next-line react/prop-types
const FileUploadButton = ({ icon, label, onChange }) => {
  return (
    <label className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-50 flex items-center justify-center cursor-pointer">
      <input type="file" className="hidden" onChange={onChange} />
      {icon}
      {label}
    </label>
  );
};

export default FileUploadButton;
