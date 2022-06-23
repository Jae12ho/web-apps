import React, { useEffect, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from "../service/socket"

const UserCount = () => {
  const socket = useContext(SocketContext);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE, res => setUserCount(res.userCount));

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE, res => setUserCount(res.userCount));
    };
  }, [socket]);

  return (
    <div>현재 {userCount}명</div>
  )
}

export default UserCount