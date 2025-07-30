import axiosClient from "../axios-client";

export const userService = {
    // —— public ————————————————————————————————
    getUser: async (wallet: string) =>
        (await axiosClient.get(`/user/${wallet}`)).data,

    // —— private (needs Bearer) ————————————————
    updateFollowX: () => axiosClient.post("/update-follow-x"),
    updateJoinDiscord: () => axiosClient.post("/update-join-discord"),
    updateLikeXPost: () => axiosClient.post("/update-like-x-post"),
    updateCommentXPost: () => axiosClient.post("/update-comment-x-post"),
};

