"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/heartbeat", auth_1.authMiddleware, async (req, res) => {
    try {
        const body = req.body ?? {};
        const { lat, lng, accuracy, source } = body;
        // @ts-ignore
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        if (typeof lat !== "number" || typeof lng !== "number") {
            return res.status(400).json({ error: "lat & lng must be numbers" });
        }
        const location = await prisma_1.prisma.userLocation.upsert({
            where: { userId },
            update: { lat, lng, accuracy },
            create: { userId, lat, lng, accuracy },
        });
        return res.json({ success: true, location });
    }
    catch (err) {
        console.error("heartbeat error:", err);
        return res.status(500).json({ error: "Failed to update location" });
    }
});
exports.default = router;
//# sourceMappingURL=location.routes.js.map