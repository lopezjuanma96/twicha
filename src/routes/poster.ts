import { Router } from "express";
import { handleGetPoster } from "../controllers/poster";

export const router: Router = Router();

router.get("/", handleGetPoster);