"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const prisma_1 = require("../prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/active", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const active = await prisma_1.prisma.sOSEvent.findFirst({
            where: { userId, status: "ACTIVE" },
            orderBy: { id: "desc" },
        });
        res.json(active ?? null);
    }
    catch (error) {
        console.error("GET /active failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=activesos.route.js.map