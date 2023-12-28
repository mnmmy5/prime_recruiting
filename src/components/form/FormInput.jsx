import { useFormContext } from "react-hook-form";
import {
  getFormValidationError,
  getYupValidationError,
} from "../../helpers/getFormValidationError";
import "./style/module.style.css";

export default function FormInput({
  id,
  type,
  name,
  label,
  inputRef,
  placeholder,
  divClass,
  inputClass,
  mandatory,
  defaultValue,
  handleOnChange,
  validation,
  maxLen,
  minLen,
  customError,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  let error = !validation
    ? getYupValidationError(errors, name)
    : getFormValidationError({ errors, name, placeholder, maxLen, minLen });

  if (customError) error = customError[name];

  return (
    <div className={`mb-4 ${divClass}`}>
      <div className="flex flex-col items-start mb-[1px]">
        {label && (
          <label
            htmlFor={id}
            className="text-[13px] font-medium leading-5 ml-2 mb-2"
          >
            {label} {mandatory && <span className="text-red-700">*</span>}
          </label>
        )}
        {!handleOnChange ? (
          <input
            {...register(name, validation)}
            name={name}
            id={id}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={`w-full ${inputClass} ${error && "border-red-500"}`}
          />
        ) : (
          <input
            ref={inputRef}
            name={name}
            id={id}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={`w-full ${inputClass} ${error && "border-red-500"}`}
            onChange={(e) => handleOnChange(e.target.value, name)}
          />
        )}
      </div>
      {error && <span className="field_error">{error}</span>}
    </div>
  );
}
