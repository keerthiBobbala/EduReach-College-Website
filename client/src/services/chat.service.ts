const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ChatMessage {
  question: string;
  answer: string;
  timestamp: Date;
}

export const sendMessage = async (question: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: question }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
