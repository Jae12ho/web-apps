import { useEffect, useState, useRef, useCallback } from "react";
import { socket, SocketContext, SOCKET_EVENT } from "./service/socket";
import NicknameForm from "./components/NicknameForm";
import ChatRoom from "./components/ChatRoom";

function App() {
  const prevNickname = useRef(null);
  const [nickname, setNickname] = useState("닉네임");
  
  const handleSubmitNickname = useCallback(newNickname => {
    prevNickname.current = nickname;
    setNickname(newNickname);
  }, [nickname]);

  useEffect(() => {
    //console.log(prevNickname.current)
    if (prevNickname.current) {
      socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVENT.JOIN, { nickname });
    }
  }, [nickname]);

  return (
    <SocketContext.Provider value={socket}>
      <div className="p-3 h-full">
        <NicknameForm handleSubmitNickname={handleSubmitNickname} />
        <ChatRoom nickname={nickname} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
