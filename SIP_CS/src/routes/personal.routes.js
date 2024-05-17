import { Router } from "express";
import { createPersonal, getPersonalList } from "../controllers/personal.controller.js";

const router = Router();

router.get("/", getPersonalList);
router.post("/", createPersonal);

export default router;
