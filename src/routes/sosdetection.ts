import { Router } from 'express';

const router = Router();

router.get('/device/sos', (req, res) => {
  const deviceId = req.query.deviceId;
  console.log('🚨 SOS FROM DEVICE:', deviceId);
  res.send('SOS received');
});

export default router;