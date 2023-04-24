import { useState } from "react";
import { Icon } from "@iconify/react";

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-control w-full max-w-xs ">
      <label className="label">Password</label>
      <label
        htmlFor="password"
        className="relative block text-gray-500 focus-within:text-gray-600"
      >
        <div className="h-full absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center justify-center text-2xl cursor-pointer rounded-full">
          <Icon icon={"fluent:password-24-regular"} />
        </div>
        <div
          className="h-full absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center justify-center text-2xl cursor-pointer rounded-full"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Icon
            icon={
              showPassword ? "akar-icons:eye-slashed" : "akar-icons:eye-open"
            }
            className="hover:bg-primary hover:bg-opacity-20 rounded-full transition-colors"
          />
        </div>
        <input
          id={"password"}
          name={"password"}
          placeholder="Password"
          className="input w-full max-w-xs input-primary appearance-none block pr-12 pl-10"
          type={showPassword ? "text" : "password"}
        ></input>
      </label>
    </div>
  );
}

export default PasswordInput;
