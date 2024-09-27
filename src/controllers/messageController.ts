import { Request, Response } from 'express';
import { sendMessageService, processIncomingMessage } from '../services/messageService';

export const sendMessage = async (req: Request, res: Response) => {
  const { to, message } = req.body;
  try {
    const result = await sendMessageService(to, message);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

export const receiveMessage = async (req: Request, res: Response) => {
  const { from, message } = req.body;
  try {
    await processIncomingMessage(from, message);
    res.status(200).send('Message received');
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};