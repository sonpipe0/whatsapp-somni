import { Router } from 'express';
import { sendMessage, receiveMessage } from '../controllers/messageController';

const router = Router();

router.post('/send-message', sendMessage);
router.post('/webhook', receiveMessage);

export default router;