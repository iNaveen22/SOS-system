import { prisma } from "../prisma";
import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = Router();

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { id: req.userId },
    select: { id: true, name: true, email: true, phone: true },
  });

  res.json(user);
});

export default router;