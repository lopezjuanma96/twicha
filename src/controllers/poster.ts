import { Request, Response } from "express";

export function handleGetPoster(req: Request, res: Response): void {
    return res.redirect("/poster");
}