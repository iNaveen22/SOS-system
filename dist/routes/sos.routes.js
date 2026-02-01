"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middlewares/auth");
const sos_service_1 = require("../services/sos.service");
const router = (0, express_1.Router)();
router.post("/start", auth_1.authMiddleware, async (req, res) => {
    try {
        const { triggerType } = req.body;
        //@ts-ignore
        const userId = req.user.id;
        const lastLocation = await prisma_1.prisma.userLocation.findUnique({
            where: { userId },
        });
        if (!lastLocation) {
            return res.status(400).json({
                error: "No last known location available",
            });
        }
        const sos = await prisma_1.prisma.sOSEvent.create({
            data: {
                userId,
                lat: lastLocation.lat,
                lng: lastLocation.lng,
                status: "ACTIVE",
                triggerType,
            },
        });
        (0, sos_service_1.processSOSAfterDelay)(sos.id);
        res.json({
            success: true,
            sosId: sos.id,
            location: {
                lat: sos.lat,
                lng: sos.lng,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start SOS" });
    }
});
exports.default = router;
//# sourceMappingURL=sos.routes.js.map