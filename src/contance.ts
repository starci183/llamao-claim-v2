export const MONAD_CONTRACT_ADDRESSES = [
    "0x813b9f077ac6470c264186bcb72a27eb547f5cc6",
    "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB",
] as const;

export type MonadContractAddress = typeof MONAD_CONTRACT_ADDRESSES[number];

// (optional convenience: “primary” address keeps old behavior where needed)
export const PRIMARY_MONAD_CONTRACT: MonadContractAddress = MONAD_CONTRACT_ADDRESSES[0];
export const HOME_FILTERS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
] as const;
export type HomeFilter = typeof HOME_FILTERS[number]["value"];
export const isValidHomeFilter = (v: string): v is HomeFilter =>
    HOME_FILTERS.some(f => f.value === v);
