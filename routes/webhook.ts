import express, { Request, Response } from "express";
import generator from "generate-password";
import bcrypt from "bcrypt";

import { prisma } from "../database";

const router = express.Router();

/**
 * @route /
 * @method GET
 * @description Simple route to test the API
 */
router.post("/", async (req: Request, res: Response) => {
  // check for secret header
  if (!req.headers["x-webhook-secret"]) {
    return res.status(403).json({
      message: "❌ No secret header provided",
    });
  }
  if (req.headers["x-webhook-secret"] !== process.env.WEBHOOK_SECRET) {
    return res.status(403).json({
      message: "❌ Invalid secret header provided",
    });
  }

  const firstName = req.body.name.split(" ")[0] as string;
  const lastName = req.body.name.split(" ")[1] as string;
  const email = req.body.email as string;
  const phoneNum = req.body.phoneNum as string;
  const address = req.body.address.split("||")[0] as string;
  const city = req.body.address.split("||")[1].split(", ")[0] as string;
  const state = req.body.address.split("||")[1].split(", ")[1] as string;
  const zipCode = req.body.address.split("||")[2] as string;
  const birthday = new Date(req.body.birthday.unix * 1000) as Date;
  const householdSize = req.body.householdSize as string;
  const childrenCount = req.body.childrenCount as string;
  const householdIncome = req.body.householdIncome as string;
  const weightLbs = req.body.weightLbs as string;
  const heightFeet = req.body.heightFeet as string;
  const heightInches = req.body.heightInches as string;
  const password = generator.generate({
    length: 32,
    numbers: true,
  });

  const passwordSalt = await bcrypt.genSalt(12);
  const passwodHash = await bcrypt.hash(password, passwordSalt);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNum,
      address,
      city,
      state,
      zipCode,
      birthday,
      householdSize,
      childrenCount,
      householdIncome,
      weightLbs,
      heightFeet,
      heightInches,
      password: passwodHash,
    },
  });

  return res.status(200).json({
    message: "✅ User created",
    user,
  });
});

export default router;
