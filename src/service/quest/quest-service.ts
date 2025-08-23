import axiosClient from "../axios-client";

export const questService = {
    getQuest: async (slug: string) => {
        const response = await axiosClient.get(`/quests/${slug}`);
        return response.data;
    },
};