import { useState } from "react";

import ChatBody from "./Components/ChatBody";
import ChatInput from "./Components/ChatInput";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";

export default function App() {
  const [chat, setChat] = useState([]);
  //mutation function

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };
  return (
    <div className="bg-[#1A232E]  h-screen py-6 relative sm:px:16 px-12 text-white overflow-hidden flex flex-col justify-between align-center  ">
      {/* gradient */}

      <div className="gradient-01 z-0  absolute "></div>
      <div className="gradient-02 z-0  absolute "></div>

      {/* header */}
      <div className="uppercase font-bold text-2xl text-center mb-3">
        ChatGpt2.0
      </div>
      {/* body */}

      <div className="h-90% overflow-auto w-full max-w-4xl min-w-[20rem] py-8 self-center px-4 scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md ">
        <ChatBody chat={chat} />
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}
