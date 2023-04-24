import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { SlClose } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";
import FadeInComponent from "../FadeInComponent";
interface AlertProps {
  type: "success" | "error" | "info";
  message?: string;
}
const typeAlert = Object.freeze({
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
});
const iconByType = Object.freeze({
  success: <BsCheckCircle />,
  error: <SlClose />,
  info: <AiOutlineInfoCircle />,
});
function Alert({ type, message }: AlertProps) {
  return (
    <FadeInComponent>
      <div className={`alert ${typeAlert[type]} rounded-lg py-2`}>
        <div>
          {iconByType[type]}
          <span>{message}</span>
        </div>
      </div>
    </FadeInComponent>
  );
}

export default Alert;
