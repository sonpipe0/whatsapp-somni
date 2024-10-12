import { Router } from 'express';
import { sendMessage, receiveMessage, receiveVerificationRequest } from '../controllers/messageController';

const router = Router();

router.post('/send-message', sendMessage);
router.post('/webhooks', receiveMessage);
router.get('/webhooks', receiveVerificationRequest);

export default router;
