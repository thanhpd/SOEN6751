import React, { useState, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPasswordToggle?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label className="font-bold text-sm text-[#98243C] leading-[18.2px] mb-2 block">
        {label}
      </label>
      <div className="flex items-center bg-[#F3F4F9] px-4 py-[15px] rounded-[28px] border-[1.5px] border-solid border-[#98243C]">
        <input
          type={inputType}
          className="text-sm text-[#262D33] w-full bg-transparent outline-none border-none"
          {...props}
        />
        {showPasswordToggle && (
          <div onClick={togglePasswordVisibility} className="cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="eye-icon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1615 12.0531C15.1615 13.7991 13.7455 15.2141 11.9995 15.2141C10.2535 15.2141 8.8385 13.7991 8.8385 12.0531C8.8385 10.3061 10.2535 8.89111 11.9995 8.89111C13.7455 8.89111 15.1615 10.3061 15.1615 12.0531Z"
                stroke="#262D33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.998 19.3549C15.806 19.3549 19.289 16.6169 21.25 12.0529C19.289 7.48892 15.806 4.75092 11.998 4.75092H12.002C8.194 4.75092 4.711 7.48892 2.75 12.0529C4.711 16.6169 8.194 19.3549 12.002 19.3549H11.998Z"
                stroke="#262D33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
