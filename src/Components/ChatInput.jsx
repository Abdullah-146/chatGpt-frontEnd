import React from "react";

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    if (value == "") return;

    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg py-4 overflow-auto relative">
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" />
      ) : (
        <>
          {" "}
          <textarea
            onKeyDown={(e) =>
              e.keyCode === 13 && e.shiftKey === false && handleSubmit()
            }
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12 px-3 "
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <img
            src="./send.png"
            alt="send-button"
            width={20}
            className="absolute top-4 right-3  hover:cursor-pointer ease-in duration-100 hover:scale-125 "
            onClick={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
