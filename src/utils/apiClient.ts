import axios from 'axios';

const API_URL = 'https://api.whatsapp.com/send';

export const sendMessageAPI = (to: string, message: string) => {
  return axios.post(API_URL, {
    to,
    message
  });
};