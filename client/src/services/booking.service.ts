import API from "./api";

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface BookingPayload {
  courseName: string;
  name: string;
  phone: string;
  branch: string;
}

export const bookSeat = async (payload: BookingPayload): Promise<BookingResponse> => {
  try {
    const response = await API.post<BookingResponse>("/bookings", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
       throw new Error("UNAUTHORIZED");
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to connect to the server.");
  }
};
