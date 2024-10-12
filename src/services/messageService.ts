import { sendMessageAPI } from '../utils/apiClient';

export const sendMessageService = async (to: number, message: string) => {
  try {
    const response = await sendMessageAPI(to, message);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send message');
  }
};

export const processIncomingMessage = async (from: string, message: string) => {
  // Lógica para procesar el mensaje entrante
  console.log(`Message from ${from}: ${message}`);
  // Aquí puedes agregar la lógica para responder automáticamente o procesar el mensaje
};
