
import axiosClient from "../axios-client";

export const walletService = {
    verifyMessage: async (message: string, signature: string) => {
        const response = await axiosClient.post("/verify-message", {
            message,
            signature,
        });
        return response.data;
    },
    requestMessage: async () => {
        const response = await axiosClient.post("/request-message");
        return response.data;
    },
};