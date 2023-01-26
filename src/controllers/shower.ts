import { Request, Response } from "express";

export function handleGetShower(req: Request, res: Response): void {
    return res.redirect("/shower");
}