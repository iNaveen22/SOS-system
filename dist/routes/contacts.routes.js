"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/contacts", auth_1.authMiddleware, async (req, res) => {
    const { name, phone } = req.body;
    //@ts-ignore
    const userId = req.user.id;
    const contact = await prisma_1.prisma.emergencyContact.create({
        data: {
            userId,
            name,
            phone,
        },
    });
    res.json(contact);
});
router.get("/", async (req, res) => {
    //@ts-ignore
    const userId = req.user.id;
    const contacts = await prisma_1.prisma.emergencyContact.findMany({
        where: { userId },
    });
    res.json(contacts);
});
exports.default = router;
//# sourceMappingURL=contacts.routes.js.map