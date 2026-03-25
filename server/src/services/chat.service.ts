import { getRAGResponse } from "./rag.service.js";

// Backend response: { success: true, data: { message: "answer text" } }
export const sendMessage = async (message: string) => {
  try {
    const answer = await getRAGResponse(message);
    return { success: true, data: { message: answer } };
  } catch (error) {
    console.error("Chat service error:", error);
    return { success: false, data: { message: "I'm having trouble right now. Please try again." } };
  }
};