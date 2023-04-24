import { useField } from "formik";
import React from "react";
export interface TextInputProps {
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
}
function TextInput({
  name,
  type,
  isDisabled = false,
  placeholder = "Write your message",
}: TextInputProps) {
  const [field, meta] = useField(name);
  return (
    <div className="form-control w-full">
      <label
        htmlFor="id"
        className="relative block text-gray-500 focus-within:text-gray-600"
      >
        <input
          type={type}
          placeholder={placeholder}
          className={`input block w-full appearance-none bg-base-200`}
          disabled={isDisabled}
          {...field}
        />
        {!!meta.error && meta.touched ? (
          <span className="block text-red-500">{meta.error}</span>
        ) : null}
      </label>
    </div>
  );
}

export default TextInput;
