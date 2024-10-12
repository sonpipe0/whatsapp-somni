import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';

const API_URL = `https://graph.facebook.com/v20.0/${process.env.CLIENT_ID}/messages`;

export const sendMessageAPI = async (to: number, message: string): Promise<AxiosResponse> => {
  console.log(`Sending message to ${to}: ${message}`);
  console.log(`API_URL: ${API_URL}`);
  console.log(`process.env.FACEBOOK_ACCESS_TOKEN: ${process.env.FACEBOOK_ACCESS_TOKEN}`);
  try {
    const response: AxiosResponse = await axios.post(
      API_URL,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Message sent successfully:', response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error('Failed to send message');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Failed to send message');
    }
  }
};
