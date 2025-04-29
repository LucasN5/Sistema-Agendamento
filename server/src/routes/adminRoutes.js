import express from "express";

import * as adminController from "../controller/adminController.js";

const router = express.Router();

router.get("/admin", adminController.getAdmin);

export default router;
