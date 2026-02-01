import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = Router();

router.post("/heartbeat", authMiddleware, async (req, res) => {
  try {
    const body = req.body ?? {};
    const { lat, lng, accuracy, source } = body;

    // @ts-ignore
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ error: "lat & lng must be numbers" });
    }

    const location = await prisma.userLocation.upsert({
      where: { userId },
      update: { lat, lng, accuracy },
      create: { userId, lat, lng, accuracy },
    });

    return res.json({ success: true, location });
  } catch (err) {
    console.error("heartbeat error:", err);
    return res.status(500).json({ error: "Failed to update location" });
  }
});

export default router;
