import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = Router();

router.post("/contacts", authMiddleware, async (req: AuthRequest, res) => {
  const { name, phone, relation } = req.body;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const contact = await prisma.emergencyContact.create({
    data: {
      userId,
      name,
      phone,
      relation,
    },
  });

  res.json(contact);
});

router.get("/", async (req: AuthRequest, res) => {
  const userId = req.userId;

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId },
  });

  res.json(contacts);
});

router.put("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const  id  = req.params.id;
    const { name, phone, relation } = req.body;
    const userId = req.userId;
    
    if (!id) return res.status(400).json({ error: "Contact id required" });
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const contact = await prisma.emergencyContact.findFirst({
      //@ts-ignore
      where: { id, userId },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const updated = await prisma.emergencyContact.update({
      //@ts-ignore
      where: { id },
      data: {
        name,
        phone,
        relation,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update contact error:", err);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    
    if (!id) return res.status(400).json({ error: "Contact id required" });
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const contact = await prisma.emergencyContact.findFirst({
      //@ts-ignore
      where: { id, userId },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await prisma.emergencyContact.delete({
      //@ts-ignore
      where: { id },
    });

    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    console.error("Delete contact error:", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});


export default router;
