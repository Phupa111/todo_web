const FormInput = ({ register, title, name, type, placeholder, error }) => {
  return (
    <div className="mb-2">
      <label className="block text-gray-700 font-medium">{title}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 mt-1 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-400" : "focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
