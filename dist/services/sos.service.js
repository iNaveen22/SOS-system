"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSOSAfterDelay = void 0;
const prisma_1 = require("../prisma");
const processSOSAfterDelay = (sosId) => {
    setTimeout(async () => {
        const sos = await prisma_1.prisma.sOSEvent.findUnique({
            where: { id: sosId },
            include: {
                user: true,
            },
        });
        if (!sos)
            return;
        if (sos.status !== "ACTIVE") {
            console.log("SOS cancelled or resolved:", sosId);
            return;
        }
        await prisma_1.prisma.sOSEvent.update({
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
exports.processSOSAfterDelay = processSOSAfterDelay;
//# sourceMappingURL=sos.service.js.map