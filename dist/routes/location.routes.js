"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/heartbeat", auth_1.authMiddleware, async (req, res) => {
    try {
        const { lat, lng, accuracy, source } = req.body;
        //@ts-ignore
        const userId = req.user.id;
        if (!lat || !lng) {
            return res.status(400).json({ error: "lat & lng required" });
        }
        const location = await prisma_1.prisma.userLocation.upsert({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update location" });
    }
});
exports.default = router;
//# sourceMappingURL=location.routes.js.map