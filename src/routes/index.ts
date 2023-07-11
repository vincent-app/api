import express, { Request, Response } from "express";

const router = express.Router();

/**
 * @route /
 * @method GET
 * @description Simple route to test the API
 */
router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "✅ API is running",
  });
});

export default router;
