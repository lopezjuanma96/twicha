//following https://socket.io/docs/v4/typescript/#types-for-the-server

import { Post } from "posts.types";

export interface ServerToClient {
    ip: (value: string) => void,
    distribute: (post: Post) => void,
    respond: (post: Post) => void
}

export interface ClientToServer {
    post: (user: string, msg: string) => void,
    request: () => void;
}

export interface InterServer {

}

export interface SocketData {
    
}