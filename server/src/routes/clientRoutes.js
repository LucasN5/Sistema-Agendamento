import express from "express";

import * as clientController from "../controller/clientController.js";

const router = express.Router();

router.get("/account", clientController.getClients);
router.post("/account", clientController.createClient);

export default router;
