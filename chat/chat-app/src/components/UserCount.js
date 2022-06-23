import React, { useEffect, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from "../service/socket"

const UserCount = () => {
  const socket = useContext(SocketContext);
  const [userCount, setUserCount] = useState(0);

  const handleUserCount = (res) => {
    setUserCount(res.userCount);
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE, handleUserCount);

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE, handleUserCount);
    };
  }, [socket, handleUserCount]);

  return (
    <div>현재 {userCount}명</div>
  )
}

export default UserCount