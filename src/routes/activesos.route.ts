import { authMiddleware,AuthRequest } from "../middlewares/auth";
import { prisma } from "../prisma";
import { Router } from "express";

const router = Router();

router.get("/active", authMiddleware, async (req: AuthRequest, res) => {
  try {

    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const active = await prisma.sOSEvent.findFirst({
      where: { userId, status: "ACTIVE" },
      orderBy: { id: "desc" },
    });

    res.json(active ?? null);
  } catch (error) {
    console.error("GET /active failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;