"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/me", auth_1.authMiddleware, async (req, res) => {
    const user = await prisma_1.prisma.user.findUnique({
        //@ts-ignore
        where: { id: req.userId },
        select: { id: true, name: true, email: true, phone: true },
    });
    res.json(user);
});
exports.default = router;
//# sourceMappingURL=me.js.map