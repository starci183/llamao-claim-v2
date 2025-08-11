// service/user/user-service.ts
import axiosClient from "../axios-client";
import type { AxiosRequestConfig } from "axios";

/** Shape returned by your BE (adjust as needed) */
export interface User {
    followX: boolean;
    joinDiscord: boolean;
    likeXPost: boolean;
    commentXPost: boolean;
    userAddress: string;
    createdAt: string;
    updatedAt: string;
}

export const userService = {
    // —— public ————————————————————————————————
    getUser: async (wallet: string, config?: AxiosRequestConfig) => {
        const res = await axiosClient.get<User>(`/user/${wallet}`, config);
        return res.data;
    },

    // —— private (needs Bearer) ————————————————
    updateFollowX: (config?: AxiosRequestConfig) =>
        axiosClient.post<User>("/update-follow-x", undefined, config).then(r => r.data),

    updateJoinDiscord: (config?: AxiosRequestConfig) =>
        axiosClient.post<User>("/update-join-discord", undefined, config).then(r => r.data),

    updateLikeXPost: (config?: AxiosRequestConfig) =>
        axiosClient.post<User>("/update-like-x-post", undefined, config).then(r => r.data),

    updateCommentXPost: (config?: AxiosRequestConfig) =>
        axiosClient.post<User>("/update-comment-x-post", undefined, config).then(r => r.data),
};
