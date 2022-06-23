const SOCKET_EVENT = {
    JOIN: "JOIN",
    UPDATE_NICKNAME: "UPDATE_NICKNAME",
    SEND: "SEND",
    RECEIVE: "RECEIVE",
};

module.exports = function(socketIo) {
    let userCount = 0;

    socketIo.on("connection", function(socket) {
        userCount++;
        
        const roomName = "room1";

        console.log("socket connection succeeded.");

        socket.on("disconnect", reason => {
            console.log(`disconnect: ${reason}`);
            userCount--;
        });

        
        Object.keys(SOCKET_EVENT).forEach(typeKey => {
            const type = SOCKET_EVENT[typeKey];

            socket.on(type, requestData => {
                const firstVisit = type === SOCKET_EVENT.JOIN;
    
                if (firstVisit) {
                    socket.join(roomName);
                }

                const responseData = {
                    ...requestData,
                    type,
                    time: new Date(),
                    userCount: userCount,
                };
                socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE, responseData);
                console.log(`${type} is fired with data: ${JSON.stringify(responseData)}`);
            });
        });
    })
}