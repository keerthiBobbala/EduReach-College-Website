import API from "./api";

interface CallPayload {
    phoneNumber: string;
    preferredCourse?: string;
}

interface VapiCallResponse {
    success: boolean;
    message: string;
    data: {
        callId: string;
        status: string;
    };
}

export const initiateOutboundCall = async (payload: CallPayload): Promise<VapiCallResponse["data"]> => {
    try {
        const response = await API.post<VapiCallResponse>("/vapi/call", payload);
        return response.data.data;
    } catch (error) {
        console.error("Error initiating outbound call:", error);
        throw error;
    }
};