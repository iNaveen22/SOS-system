"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/contacts", auth_1.authMiddleware, async (req, res) => {
    const { name, phone, relation } = req.body;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    const contact = await prisma_1.prisma.emergencyContact.create({
        data: {
            userId,
            name,
            phone,
            relation,
        },
    });
    res.json(contact);
});
router.get("/", async (req, res) => {
    const userId = req.userId;
    const contacts = await prisma_1.prisma.emergencyContact.findMany({
        where: { userId },
    });
    res.json(contacts);
});
router.put("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, phone, relation } = req.body;
        const userId = req.userId;
        if (!id)
            return res.status(400).json({ error: "Contact id required" });
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const contact = await prisma_1.prisma.emergencyContact.findFirst({
            //@ts-ignore
            where: { id, userId },
        });
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        const updated = await prisma_1.prisma.emergencyContact.update({
            //@ts-ignore
            where: { id },
            data: {
                name,
                phone,
                relation,
            },
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Update contact error:", err);
        res.status(500).json({ error: "Failed to update contact" });
    }
});
router.delete("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        if (!id)
            return res.status(400).json({ error: "Contact id required" });
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const contact = await prisma_1.prisma.emergencyContact.findFirst({
            //@ts-ignore
            where: { id, userId },
        });
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        await prisma_1.prisma.emergencyContact.delete({
            //@ts-ignore
            where: { id },
        });
        res.json({ success: true, message: "Contact deleted" });
    }
    catch (err) {
        console.error("Delete contact error:", err);
        res.status(500).json({ error: "Failed to delete contact" });
    }
});
exports.default = router;
//# sourceMappingURL=contacts.routes.js.map