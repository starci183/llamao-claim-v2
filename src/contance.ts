export const MONAD_CONTRACT_ADDRESSES = [
    // "",
    "0xa8275fbf5fb47f632862db1cc4a6fbb5bd725856",
    "0x7238893dd7e2fa516566c56e860007d35ae0d186"
] as const;

export type MonadContractAddress = typeof MONAD_CONTRACT_ADDRESSES[number];

// (optional convenience: “primary” address keeps old behavior where needed)
export const PRIMARY_MONAD_CONTRACT: MonadContractAddress = MONAD_CONTRACT_ADDRESSES[1];
export const HOME_FILTERS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
] as const;
export type HomeFilter = typeof HOME_FILTERS[number]["value"];
export const isValidHomeFilter = (v: string): v is HomeFilter =>
    HOME_FILTERS.some(f => f.value === v);
