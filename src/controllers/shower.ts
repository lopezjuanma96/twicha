import { Request, Response } from "express";
import { Posts } from "../models/posts";
import { Post } from "posts.types";
import { Socket, Server as IOServer } from "socket.io";

let currentPost: Post;
const connectedShowers: Map<string, Socket> = new Map();

function setNewPostTimeout(): void{
    currentPost = Posts.getInstance().getPost();
    for (let id of connectedShowers.keys()) connectedShowers.get(id).emit("distribute", currentPost);
    setTimeout(setNewPostTimeout, 10000)
}

setNewPostTimeout()

export function handleGetShower(req: Request, res: Response): void {
    return res.redirect("/shower");
}

export function connectShowerSocket(client: Socket, io: IOServer): Socket {
    console.log("new user in shower");
    client.emit("ip", process.env.IP);
    client.on("request", () => {
        client.emit("respond", currentPost)
    })
    connectedShowers.set(client.id, client);
    connectedShowers.get(client.id).emit("distribute", currentPost);
    client.on("disconnect", (reason) => {
        console.log('disconnected shower')
        connectedShowers.delete(client.id);
    })
    return client
}