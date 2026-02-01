import { prisma } from "../prisma";

export const processSOSAfterDelay = (sosId: string) => {
  setTimeout(async () => {
    const sos = await prisma.sOSEvent.findUnique({
      where: { id: sosId },
      include: {
        user: true,
      },
    });

    if (!sos) return;

    if (sos.status !== "ACTIVE") {
      console.log("SOS cancelled or resolved:", sosId);
      return;
    }

    
    await prisma.sOSEvent.update({
      where: { id: sosId },
      data: {
        status: "ESCALATED",
      },
    });

    const mapsLink = `https://maps.google.com/?q=${sos.lat},${sos.lng}`;

    console.log("🚨 SENDING ALERTS 🚨");
    console.log(`User: ${sos.user.name}`);
    console.log(`Location: ${mapsLink}`);

    
    // sendSMS()
    // makeCall()
  }, 30000);
};
