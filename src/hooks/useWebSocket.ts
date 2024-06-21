// websocketService.ts
import {useEffect, useRef, useState} from "react";

export type WebSocketMessage = {
    type: string;
    [key: string]: any;
};

const useWebSocket = (
    url: string,
): [WebSocket | null, (message: WebSocketMessage) => void, () => void] => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(url);
        wsRef.current = socket;

        socket.onopen = () => {
            setWs(socket);
        };

        socket.onclose = () => {
            setWs(null);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    const sendMessage = (message: WebSocketMessage) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    };

    const closeWebSocket = () => {
        if (wsRef.current) {
            wsRef.current.close();
        }
    };

    return [ws, sendMessage, closeWebSocket];
};

export default useWebSocket;
