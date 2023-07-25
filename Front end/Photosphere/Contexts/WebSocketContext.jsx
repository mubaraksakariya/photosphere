import React, { createContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const token = localStorage.getItem('token');
    const webSocketAddress = import.meta.env.VITE_SOCKET_ADDRESS;

    useEffect(() => {
        if (token) {
            const newSocket = new WebSocket(`${webSocketAddress}?token=${token}`);
            setSocket(newSocket);

            // Clean up the WebSocket connection when the component unmounts
            return () => {
                newSocket.close();
            };
        }
    }, [token]);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext, WebSocketProvider };
