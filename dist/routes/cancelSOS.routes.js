"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/cancel", auth_1.authMiddleware, async (req, res) => {
    try {
        const { sosId, reason } = req.body;
        //@ts-ignore
        const userId = req.user.id;
        const sos = await prisma_1.prisma.sOSEvent.findFirst({
            where: { id: sosId, userId },
        });
        if (!sos) {
            return res.status(404).json({ error: "SOS not found" });
        }
        if (sos.status !== "ACTIVE") {
            return res.status(400).json({ error: "SOS already processed" });
        }
        await prisma_1.prisma.sOSEvent.update({
            where: { id: sosId },
            data: {
                status: "CANCELLED",
            },
        });
        res.json({
            success: true,
            message: "SOS cancelled",
            reason,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to cancel SOS" });
    }
});
//# sourceMappingURL=cancelSOS.routes.js.map