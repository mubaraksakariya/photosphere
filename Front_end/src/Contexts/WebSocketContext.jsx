import React, { createContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const token = localStorage.getItem('token');
    const webSocketAddress = import.meta.env.VITE_SOCKET_ADDRESS;

    useEffect(() => {
        let newSocket = null;
        const connectSocket = () => {
            newSocket = new WebSocket(`${webSocketAddress}?token=${token}`);

            newSocket.onopen = () => {
                console.log('WebSocket connected');
                setSocket(newSocket);
            };

            newSocket.onclose = (event) => {
                console.log('WebSocket disconnected');
                setTimeout(connectSocket, 2000);
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                newSocket.close();
            };
        };

        if (token) {
            connectSocket();
            return () => {
                if (newSocket) {
                    newSocket.close();
                }
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
