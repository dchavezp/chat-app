import React, { useState } from "react";
import Button from "../Button";
import EmojiTextInput from "../EmojiTextInput";
import { api } from "~/utils/api";
import { AiOutlineSend } from "react-icons/ai";

interface ChatBarProps {
  channelID: string;
}
function ChatBar({ channelID }: ChatBarProps) {
  const [textValue, setTextValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const addMessage = api.message.createMessage.useMutation({});

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (textValue !== "" && !loading) {
      setLoading(true);
      setTextValue("Sending...");
      addMessage.mutate(
        { content: textValue, idChannel: channelID },
        {
          onSuccess: () => {
            setTextValue("");
            setLoading(false);
          },
          onError: (error) => {
            console.log(error);
            setLoading(false);
          },
        }
      );
    }
  };
  return (
    <div className="flex h-16 flex-row gap-2 bg-transparent px-4 py-2">
      <form className="flex w-full flex-row gap-2" onSubmit={handleSubmit}>
        <EmojiTextInput
          setValue={setTextValue}
          valueText={textValue}
          disabled={loading}
        />
        <Button type="submit">
          Send <AiOutlineSend />
        </Button>
      </form>
    </div>
  );
}

export default ChatBar;
