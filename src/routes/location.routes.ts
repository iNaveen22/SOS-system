import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/heartbeat",authMiddleware, async (req, res) => {
  try {
    const { lat, lng, accuracy, source } = req.body;
    //@ts-ignore
    const userId = req.user!.id;

    if (!lat || !lng) {
      return res.status(400).json({ error: "lat & lng required" });
    }

    const location = await prisma.userLocation.upsert({
      where: { userId },
      update: {
        lat,
        lng,
        accuracy,
      },
      create: {
        userId,
        lat,
        lng,
        accuracy,
      },
    });

    res.json({
      success: true,
      location,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update location" });
  }
});

export default router;
