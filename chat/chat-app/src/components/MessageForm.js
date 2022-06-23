import React, { useState, useCallback, useContext } from 'react'
import { SocketContext, SOCKET_EVENT } from '../service/socket'

const MessageForm = ({ nickname }) => {
  const [typingMessage, setTypingMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleChangeTypingMessage = useCallback(e => {
    setTypingMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    const noContent = typingMessage.trim() === "";

    if (noContent) {
      return;
    }

    socket.emit(SOCKET_EVENT.SEND, {
      nickname,
      content: typingMessage,
    });
    setTypingMessage("");
  }, [socket, nickname, typingMessage]);

  return (
    <form>
      <div className="h-8 flex justify-between items-center mt-3">
        <textarea className="w-11/12 border-2 h-full resize-none rounded-lg text-gray-600 pl-1" maxLength={400} autoFocus value={typingMessage} onChange={handleChangeTypingMessage}
        onKeyPress={event => {
          if (event.code === "Enter") {
             event.preventDefault();
             handleSendMessage();
           }
         }}/>
        <button className="bg-blue-500 text-white font-bold w-1/12 ml-3 h-full rounded-lg" type="button" onClick={handleSendMessage}>전송</button>
      </div>
    </form>
  )
}

export default MessageForm