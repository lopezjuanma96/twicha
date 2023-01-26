import { Router } from "express";
import { handleGetShower } from "../controllers/shower";

export const router: Router = Router();

router.get("/", handleGetShower);