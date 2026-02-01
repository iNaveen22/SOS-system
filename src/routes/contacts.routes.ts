import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/contacts",authMiddleware, async (req, res) => {
  const { name, phone } = req.body;
  //@ts-ignore
  const userId = req.user!.id;

  const contact = await prisma.emergencyContact.create({
    data: {
      userId,
      name,
      phone,
    },
  });

  res.json(contact);
});

router.get("/", async (req, res) => {
    //@ts-ignore
  const userId = req.user!.id;

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId },
  });

  res.json(contacts);
});

export default router;
