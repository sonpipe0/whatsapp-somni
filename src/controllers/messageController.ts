import { Request, Response } from 'express';
import { sendMessageService, processIncomingMessage } from '../services/messageService';
import { Entry } from '../services/messageService';

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
  const {entry }: { object: string; entry: Entry[] } = req.body;
  const response = await processIncomingMessage(entry);
  try {
    res.status(200).send('Message received' + response);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

export const receiveVerificationRequest = async (req: Request, res: Response) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': verify_token } = req.query;
  if (mode && challenge && verify_token) {
    if (mode === 'subscribe' && verify_token === process.env.VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(400).json({ error: 'Bad Request: Missing hub parameters' });
  }
};
