import { createContext } from "react";
import socketIo from "socket.io-client";
import dayjs from 'dayjs';

export const SOCKET_EVENT = {
    JOIN: "JOIN",
    UPDATE_NICKNAME: "UPDATE_NICKNAME",
    SEND: "SEND",
    RECEIVE: "RECEIVE",
};

export const socket = socketIo(String(process.env.REACT_APP_BACK_URL), { withCredentials: true });
export const SocketContext = createContext(socket);

socket.on("connect", () => {
    console.log("socket server connected.");
});

socket.on("disconnect", () => {
    console.log("socket sever disconnected.");
});

export const makeMessage = pongData => {
    const { prevNickname, nickname, content, type, time } = pongData;

    let nicknameLabel;
    let contentLabel = "";

    switch (type) {
        case SOCKET_EVENT.JOIN: {
            contentLabel = `'${nickname}'님이 채팅에 들어오셨습니다.`;
            break;
        }
        case SOCKET_EVENT.UPDATE_NICKNAME: {
            contentLabel = `'${prevNickname}'님의 이름이 '${nickname}'로 변경되었습니다.`;
            break;
        }
        case SOCKET_EVENT.SEND: {
            contentLabel = String(content);
            nicknameLabel = nickname;
            break;
        }
        default:
    }

    return {
        nickname: nicknameLabel,
        content: contentLabel,
        time: dayjs(time).format("HH:mm"),
    };
};