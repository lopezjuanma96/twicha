//following https://socket.io/docs/v4/typescript/#types-for-the-server

export interface ServerToClient {
    ip: (value: string) => void;
    distribute: (msg: string, user: string) => void;
}

export interface ClientToServer {
    post: (msg: string, user: string) => void;
}

export interface InterServer {

}

export interface SocketData {
    
}