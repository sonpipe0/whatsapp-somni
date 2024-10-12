import { sendMessageAPI } from '../utils/apiClient';



interface Contact {
  wa_id: string;
  profile: {
    name: string;
  };
}

interface Message {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: string;
}

interface Change {
  value: {
    messaging_product: string;
    contacts: Contact[];
    messages: Message[];
  };
  field: string;
}

export interface Entry {
  id: string;
  changes: Change[];
}


export const sendMessageService = async (to: number, message: string) => {
  try {
    const response = await sendMessageAPI(to, message);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send message');
  }
};

export const processIncomingMessage = async (entry: Entry[]) => {
  entry.forEach((val: Entry) => {
    val.changes.forEach((change: Change) => {
      if (change.field === 'messages') {
        const message = change.value.messages;
        const contact = change.value.contacts[0];

        console.log('Received message from:', contact.wa_id);
        for(const msg of message) {
          console.log('Message:', msg.text.body);
        }
      }
    });
  });

};
