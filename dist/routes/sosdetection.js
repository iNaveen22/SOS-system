"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/device/sos', (req, res) => {
    const deviceId = req.query.deviceId;
    console.log('🚨 SOS FROM DEVICE:', deviceId);
    res.send('SOS received');
});
exports.default = router;
//# sourceMappingURL=sosdetection.js.map