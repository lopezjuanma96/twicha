//following https://socket.io/docs/v4/typescript/#types-for-the-server

export interface ServerToClient {
    distribute: (msg: string, name: string) => void;
}

export interface ClientToServer {
    post: (msg: string, name: string) => void;
}

export interface InterServer {

}

export interface SocketData {
    
}