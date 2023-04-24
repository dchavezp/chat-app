import { BiHappyAlt } from "react-icons/bi";
import EmojiViewer from "../EmojiPicker";
import IconButton from "../IconButton";
import useShowHideDivComponent from "~/hooks/useShowHideDivComponent";

interface EmojiTextInputProps {
  valueText: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function EmojiTextInput({
  valueText,
  setValue,
  className = "",
  id,
  ...props
}: React.ComponentProps<"input"> & EmojiTextInputProps) {
  const { active, handleActive, ref } = useShowHideDivComponent();
  return (
    <>
      <div className="relative" ref={ref}>
        <IconButton className="btn-outline" action={handleActive}>
          <BiHappyAlt />
        </IconButton>
        <EmojiViewer active={active} setInput={setValue} />
      </div>

      <label
        htmlFor="id"
        className="relative block w-full text-gray-500 focus-within:text-gray-600"
      >
        <input
          className={`input block w-full appearance-none bg-base-200 ${className}`}
          value={valueText}
          id={id}
          placeholder="Write your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          {...props}
        />
      </label>
    </>
  );
}

export default EmojiTextInput;
