import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http"; //Im sure there's a way to extract it from http below, I can't find it
import * as http from "http";
import { Application } from "express";
import { ClientToServer, InterServer, ServerToClient, SocketData } from "socket.types"; //shouldn't need to use full path bc of includes in tsconfig
import { Posts } from "../models/posts";
import { connectShowerSocket } from "./shower";
import { connectPosterSocket } from "./poster";

export function createSocket(app: Application): HttpServer {

    const https: HttpServer = http.createServer(app);
    const io: IOServer< //for typing emits and receives, read types/socket.ts
        ClientToServer,
        ServerToClient,
        InterServer,
        SocketData
    > = new IOServer(https);

    io.on("connection", client => {
        const url: string = client.request.headers.referer;
        const host: string = client.request.headers.host;
        if (url.includes("shower")) connectShowerSocket(client, io)
        else if (url.includes("poster")) connectPosterSocket(client, io)
    })

    return https;
}