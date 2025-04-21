const FormInput = ({
  register,
  title,
  name,
  type,
  placeholder,
  error,
  isTextArea = false,
  value = "",
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-semibold text-gray-700">{title}</label>
      {isTextArea ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          defaultValue={value}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
