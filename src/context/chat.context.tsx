import { createContext, useContext, useState } from "react";
import { type ComponentWithChildren, type Message } from "~/types/types";

interface ChatContextI {
  listOfMessages: Message[];
  addMessage?: (message: Message) => void;
}

const ChatContext = createContext<ChatContextI>({ listOfMessages: [] });

export function useChat() {
  return useContext(ChatContext);
}

function ChatProvider({ children }: ComponentWithChildren) {
  const [listMessage, setListMessages] = useState<Message[]>([]);
  const addMessage = (message: Message) => {
    console.log(message);
    setListMessages((value) => [message, ...value]);
  };
  return (
    <ChatContext.Provider
      value={{ listOfMessages: listMessage, addMessage: addMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
