import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";
import { processSOSAfterDelay } from "../services/sos.service";

const router = Router();

router.post("/start", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { triggerType } = req.body;
    const userId = req.userId;

    if(!userId){
      return res.status(401).json({ error: "Unauthorized" });
    }

    const lastLocation = await prisma.userLocation.findUnique({
      where: { userId },
    });

    if (!lastLocation) {
      return res.status(400).json({
        error: "No last known location available",
      });
    }

    const sos = await prisma.sOSEvent.create({
      data: {
        userId,
        lat: lastLocation.lat,
        lng: lastLocation.lng,
        status: "ACTIVE",
        triggerType,
      },
    });

    processSOSAfterDelay(sos.id);

    res.json({
      success: true,
      sosId: sos.id,
      location: {
        lat: sos.lat,
        lng: sos.lng,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start SOS" });
  }
});

export default router;

