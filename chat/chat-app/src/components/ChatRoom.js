import React from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import UserCount from "./UserCount";

const ChatRoom = ({ nickname }) => {
  return (
    <div className="flex justify-center items-center h-2/3">
      <div className="flex-col w-1/2 h-full">
        <div className="m-2 flex justify-between">
          <div><span className="text-gray-500 font-bold">{nickname}</span>님 환영합니다 !</div>
          <UserCount />
        </div>
        <MessageList />
        <MessageForm nickname={nickname} />
      </div>
    </div>
  )
}

export default ChatRoom

