import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).redirect('/shower.html')
})