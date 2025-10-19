import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum RewardTab {
  FcfsWhitelist = "FcfsWhitelist",
  GtdWhitelist = "GtdWhitelist",
}

interface NFTState {
  ownedNFTs: Record<number, boolean>;
  rewardTab: RewardTab;
  openClaimRewardsDialog: boolean;
}

const initialState: NFTState = {
  ownedNFTs: {},
  rewardTab: RewardTab.FcfsWhitelist,
  openClaimRewardsDialog: false,
}

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setOwnedNFTs: (state, action: PayloadAction<Record<number, boolean>>) => {
      state.ownedNFTs = action.payload;
    },
    addOwnedNFT: (state, action: PayloadAction<number>) => {
      state.ownedNFTs[action.payload] = true;
    },
    setRewardTab: (state, action: PayloadAction<RewardTab>) => {
      state.rewardTab = action.payload;
    },
    setOpenClaimRewardsDialog: (state, action: PayloadAction<boolean>) => {
      state.openClaimRewardsDialog = action.payload;
    },
  },
});

export const { setOwnedNFTs, addOwnedNFT, setRewardTab, setOpenClaimRewardsDialog } = nftSlice.actions;
export const nftReducer = nftSlice.reducer;