"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const JWT_SECRETs = process.env.JWT_SECRET;
const router = (0, express_1.Router)();
console.log("yha tak to aa bya");
router.post("/signup", async (req, res) => {
    console.log("backend signup is correcttt");
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: (await user).id }, JWT_SECRETs, { expiresIn: "7d" });
        res.json({
            success: true,
            token,
            user: {
                id: (await user).id,
                name: (await user).name,
                email: (await user).email
            },
        });
    }
    catch (error) {
        console.log("errrorror", error);
        res.status(500).json({ error: "signup failed" });
    }
});
exports.default = router;
//# sourceMappingURL=signup.js.map