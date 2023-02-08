import { Request, Response } from "express";
import { Posts } from "../models/posts";
import { Socket, Server as IOServer } from "socket.io";

export function handleGetPoster(req: Request, res: Response): void {
    return res.redirect("/poster");
}

export function connectPosterSocket(client: Socket, io: IOServer): Socket {
    console.log("new user in poster");
    client.on("post", (user, msg) =>{
        Posts.getInstance().addTemporalPost(user, msg)
    })
    return client
}