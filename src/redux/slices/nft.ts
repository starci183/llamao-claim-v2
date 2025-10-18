import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NFTState {
  ownedNFTs: Record<number, boolean>;
}

const initialState: NFTState = {
  ownedNFTs: {},
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
  },
});

export const { setOwnedNFTs, addOwnedNFT } = nftSlice.actions;
export const nftReducer = nftSlice.reducer;