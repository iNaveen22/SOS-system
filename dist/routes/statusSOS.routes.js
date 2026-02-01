"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/status/:sosId", async (req, res) => {
    try {
        const { sosId } = req.params;
        //@ts-ignore
        const userId = req.user.id;
        const sos = await prisma_1.prisma.sOSEvent.findFirst({
            where: { id: sosId, userId },
        });
        if (!sos) {
            return res.status(404).json({ error: "SOS not found" });
        }
        res.json({
            id: sos.id,
            status: sos.status,
            location: {
                lat: sos.lat,
                lng: sos.lng,
            },
            triggerType: sos.triggerType,
            createdAt: sos.createdAt,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get SOS status" });
    }
});
exports.default = router;
//# sourceMappingURL=statusSOS.routes.js.map