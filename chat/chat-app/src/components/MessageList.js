import React, { useState, useRef, useContext, useCallback, useEffect } from 'react'
import MessageItem from "./MessageItem"
import { SocketContext, SOCKET_EVENT, makeMessage } from "../service/socket"

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);
  const socket = useContext(SocketContext);

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleReceiveMessage = useCallback(pongData => {
    const newMessage = makeMessage(pongData);
    setMessages(messages => [...messages, newMessage]);
    moveScrollToReceiveMessage();
  }, [moveScrollToReceiveMessage]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE, handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  return (
    <div className="rounded-lg border-2 p-3 h-full overflow-y-auto webkit pb-16" ref={chatWindow}>
    {messages.map((message, index) => {
      return (<MessageItem key={index} message={message} />)
    })}
  </div>
  )
}

export default MessageList