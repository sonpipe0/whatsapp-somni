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
  if (!entry || entry.length === 0) return;

  for (const val of entry) {
    if (!val.changes || !Array.isArray(val.changes)) return; 

    for (const change of val.changes) {
      if (change.field === 'messages') {
        if (!change.value.messages) return;
        const message = change.value.messages[0];
        const contact = change.value.contacts[0];
        let number = contact.wa_id;
        if (number.startsWith('54')) {
          number = `54${number.slice(3)}`;
        }

        console.log('Received message from:', number);
        console.log("Message: ", message.text.body);
        
        await sendMessageService(parseInt(number, 10), "Bienvenido a Somni");
      }
    }
  }
};

