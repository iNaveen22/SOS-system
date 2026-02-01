import { prisma } from "../prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Router } from "express";

const router = Router();

router.post("/signup", async (req, res) => {
    const JWT_SECRET = "123321";
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields"});
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if(existingUser){
            return res.status(400).json({ error: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = prisma.user.create({
            data: {
                name,
                email,
                password : hashedPassword,
                phone
            },
        });

        const token = jwt.sign(
            { userId : (await user).id },
            JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.json({
            success: true,
            token,
            user: {
                id: (await user).id,
                name: (await user).name,
                email: (await user).email
            },
        });
    } catch (error) {
        console.log("errrorror", error);
        res.status(500).json({ error: "signup failed"});
    }
});

export default router;